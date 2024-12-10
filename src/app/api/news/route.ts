import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { join } from "path"
import mime from "mime";
import { stat, mkdir, writeFile } from "fs/promises";

const prisma = new PrismaClient()
export const revalidate = 60

export async function GET(): Promise<NextResponse> {
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
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\//g, "-")}/news/`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    const result = await prisma.newsArticle.create({
      data: {
        title,
        description,
        date,
        image: "",
      },
    });

    try {
      await stat(uploadDir);
    } catch (e: unknown) {
      if (e instanceof Error && (e as NodeJS.ErrnoException).code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

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

