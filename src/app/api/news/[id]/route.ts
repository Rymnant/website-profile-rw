import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

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
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const image = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const newsArticle = await prisma.newsArticle.findUnique({ where: { id } });

    if (!newsArticle) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }

    let fileUrl = newsArticle.image;

    if (image && image instanceof File) {
      if (newsArticle.image) {
        const publicId = newsArticle.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`news/${publicId}`).catch((err) => {
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
            { public_id: `news/${filename}`, resource_type: 'image' },
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

    const updatedArticle = await prisma.newsArticle.update({
      where: { id },
      data: {
        title,
        description,
        date,
        image: fileUrl,
      },
    });

    return NextResponse.json({ article: updatedArticle });
  } catch (e: unknown) {
    console.error("Error while trying to edit news article\n", e);
    return NextResponse.json({ error: "Failed to update news article." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const newsArticle = await prisma.newsArticle.findUnique({
      where: { id },
    });

    if (!newsArticle) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    if (newsArticle.image) {
      const publicId = newsArticle.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        try {
          const result = await cloudinary.uploader.destroy(`news/${publicId}`);
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

    await prisma.newsArticle.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
