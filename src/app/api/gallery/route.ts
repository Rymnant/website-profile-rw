import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient()
export const revalidate = 60

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function GET() {
  try {
    const galleryItems = await prisma.gallery.findMany()
    return NextResponse.json(galleryItems)
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title and image are required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`;

    try {
      const result = await prisma.gallery.create({
        data: {
          title,
          image: "",
        },
      });

      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { public_id: `gallery/${filename}`, resource_type: 'image' },
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

      await prisma.gallery.update({
        where: { id: result.id },
        data: { image: fileUrl },
      });

      return NextResponse.json({ item: result });
    } catch (e: unknown) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  } catch (e: unknown) {
    console.error("Error in POST handler\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await request.json();

    const galleryItem = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!galleryItem) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    if (galleryItem.image) {
      const publicId = galleryItem.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`gallery/${publicId}`).catch((err) => {
          console.error("Failed to delete image from Cloudinary:", err);
        });
      }
    }

    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
