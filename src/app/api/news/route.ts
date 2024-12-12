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

export async function GET(){
  try {
    const newsArticles = await prisma.newsArticle.findMany()
    return NextResponse.json(newsArticles)
  } catch {
    return NextResponse.json({ error: "Failed to fetch news articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const date = formData.get("date") as string
  const image = formData.get("image") as File

  const buffer = Buffer.from(await image.arrayBuffer())
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`;

  try {
    const result = await prisma.newsArticle.create({
      data: {
        title,
        description,
        date,
        image: "",
      },
    });

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

    const fileUrl = uploadResult.secure_url;

    await prisma.newsArticle.update({
      where: { id: result.id },
      data: { image: fileUrl },
    });

    return NextResponse.json({ article: result });
  } catch (e: unknown) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await request.json();

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

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const image = formData.get("image") as File | null;

  try {
    const newsArticle = await prisma.newsArticle.findUnique({ where: { id } });

    if (!newsArticle) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 });
    }

    let fileUrl = newsArticle.image;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`;

      if (newsArticle.image) {
        const publicId = newsArticle.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`news/${publicId}`).catch((err) => {
            console.error("Failed to delete old image from Cloudinary:", err);
          });
        }
      }

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
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

