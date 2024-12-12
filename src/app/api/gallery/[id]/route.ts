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
    const title = formData.get("title") as string;
    const image = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const galleryItem = await prisma.gallery.findUnique({ where: { id } });

    if (!galleryItem) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    let fileUrl = galleryItem.image;

    if (image && image instanceof File) {
      const publicId = galleryItem.image.split('/').pop()?.split('.')[0];

      const buffer = Buffer.from(await image.arrayBuffer());

      try {
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              public_id: `gallery/${publicId}`, 
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

    const updatedItem = await prisma.gallery.update({
      where: { id },
      data: {
        title,
        image: fileUrl,
      },
    });

    return NextResponse.json({ item: updatedItem });
  } catch (e: unknown) {
    console.error("Error while trying to edit gallery item\n", e);
    return NextResponse.json({ error: "Failed to update gallery item." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const galleryItem = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!galleryItem) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    const imageUrl = galleryItem.image;

    if (galleryItem.image) {
      const publicId = galleryItem.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          console.log(`Attempting to delete image with publicId: gallery/${publicId}`);
          const result = await cloudinary.uploader.destroy(`gallery/${publicId}`);
          console.log(`Cloudinary deletion result: ${JSON.stringify(result)}`);
          if (result.result !== 'ok' && result.result !== 'not found') {
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

    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Item deleted successfully", imageUrl });
  } catch (error) {
    console.error("Failed to delete item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}