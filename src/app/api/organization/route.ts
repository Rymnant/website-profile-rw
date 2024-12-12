import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v2 as cloudinary } from 'cloudinary'

const prisma = new PrismaClient()
export const revalidate = 60

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function GET() {
  try {
    const organizationMembers = await prisma.organizationMember.findMany()
    return NextResponse.json(organizationMembers)
  } catch (error) {
    console.error("Failed to fetch organization members:", error);
    return NextResponse.json({ error: "Failed to fetch organization members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const position = formData.get("position") as string
    const image = formData.get("image") as File

    if (!name || !position || !image) {
      return NextResponse.json(
        { error: "Name, position, and image are required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer())
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`

    try {
      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { public_id: `organization/${filename}`, resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as { secure_url: string });
            }
          }
        );
        stream.end(buffer);
      });

      const fileUrl = uploadResult.secure_url;

      const result = await prisma.organizationMember.create({
        data: {
          name,
          position,
          image: fileUrl,
        },
      });

      return NextResponse.json({ user: result });
    } catch (e: unknown) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Failed to create organization member." },
        { status: 500 }
      );
    }
  } catch (e: unknown) {
    console.error("Error in POST handler\n", e);
    return NextResponse.json(
      { error: "Failed to create organization member." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const image = formData.get("image") as File | null;

  try {
    const organizationMember = await prisma.organizationMember.findUnique({
      where: { id },
    });

    if (!organizationMember) {
      return NextResponse.json(
        { error: "Organization member not found" },
        { status: 404 }
      );
    }

    let fileUrl = organizationMember.image;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`;

      if (organizationMember.image) {
        const publicId = organizationMember.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`organization/${publicId}`).catch((err) => {
            console.error("Failed to delete old image from Cloudinary:", err);
          });
        }
      }

      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { public_id: `organization/${filename}`, resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as { secure_url: string });
            }
          }
        );
        stream.end(buffer);
      });

      fileUrl = uploadResult.secure_url;
    }

    const updatedMember = await prisma.organizationMember.update({
      where: { id },
      data: {
        name,
        position,
        image: fileUrl,
      },
    });

    return NextResponse.json({ user: updatedMember });
  } catch (e: unknown) {
    console.error("Error while trying to edit organization member\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await request.json();

    const organizationMember = await prisma.organizationMember.findUnique({
      where: { id },
    });

    if (!organizationMember) {
      return NextResponse.json(
        { error: "Organization member not found" },
        { status: 404 }
      );
    }

    if (organizationMember.image) {
      const publicId = organizationMember.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          const result = await cloudinary.uploader.destroy(`organization/${publicId}`);
          if (result.result !== 'ok') {
            throw new Error('Failed to delete image from Cloudinary');
          }
        } catch (err) {
          console.error("Failed to delete image from Cloudinary:", err);
          return NextResponse.json(
            { error: "Failed to delete image from Cloudinary" },
            { status: 500 }
          );
        }
      }
    }

    await prisma.organizationMember.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Organization member deleted successfully" });
  } catch (error) {
    console.error("Failed to delete organization member:", error);
    return NextResponse.json(
      { error: "Failed to delete organization member" },
      { status: 500 }
    );
  }
}