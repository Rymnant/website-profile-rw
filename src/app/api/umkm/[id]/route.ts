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
    const label = formData.get("label") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const umkm = await prisma.uMKM.findUnique({ where: { id } });

    if (!umkm) {
      return NextResponse.json({ error: "UMKM item not found" }, { status: 404 });
    }

    let fileUrl = umkm.image;

    if (image && image instanceof File) {
      if (umkm.image) {
        const publicId = umkm.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`umkm/${publicId}`).catch((err) => {
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
              public_id: `umkm/${filename}`, 
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

    const updatedUMKM = await prisma.uMKM.update({
      where: { id },
      data: {
        label,
        category,
        description,
        link,
        image: fileUrl,
      },
    });

    return NextResponse.json({ umkm: updatedUMKM });
  } catch (e: unknown) {
    console.error("Error while trying to edit UMKM item\n", e);
    return NextResponse.json({ error: "Failed to update UMKM item." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const umkm = await prisma.uMKM.findUnique({ where: { id } });

    if (!umkm) {
      return NextResponse.json({ error: "UMKM item not found" }, { status: 404 });
    }

    if (umkm.image) {
      const publicId = umkm.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          const result = await cloudinary.uploader.destroy(`umkm/${publicId}`);
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

    await prisma.uMKM.delete({ where: { id } });
    return NextResponse.json({ umkm });
  } catch (e: unknown) {
    console.error("Error while trying to delete a UMKM item\n", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
