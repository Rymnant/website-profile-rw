import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const image = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const organizationMember = await prisma.organizationMember.findUnique({ where: { id } });

    if (!organizationMember) {
      return NextResponse.json({ error: "Organization member not found" }, { status: 404 });
    }

    let fileUrl = organizationMember.image;

    if (image && image instanceof File) {
      if (organizationMember.image) {
        const publicId = organizationMember.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`organization/${publicId}`).catch((err) => {
            console.error("Failed to delete old image from Cloudinary:", err);
          });
        }
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`;

      try {
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              public_id: `organization/${filename}`, 
              resource_type: 'image',
              overwrite: true
            },
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
      } catch (e: unknown) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
          { error: "Failed to upload image." },
          { status: 500 }
        );
      }
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
    return NextResponse.json({ error: "Failed to update organization member." }, { status: 500 });
  }
}
