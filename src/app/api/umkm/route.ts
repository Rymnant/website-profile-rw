import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { join } from "path"
import mime from "mime"
import { stat, mkdir, writeFile, unlink } from "fs/promises"

const prisma = new PrismaClient()
export const revalidate = 60

export async function GET() {
  try {
    const umkms = await prisma.uMKM.findMany()
    return NextResponse.json(umkms)
  } catch {
    return NextResponse.json({ error: "Failed to fetch UMKMs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData()

  const label = formData.get("label") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  const link = formData.get("link") as string
  const image = formData.get("image") as File
  const umkmItemId = formData.get("umkmItemId") as string

  const buffer = Buffer.from(await image.arrayBuffer())
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\//g, "-")}/umkm`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    const result = await prisma.uMKM.create({
      data: {
        label,
        category,
        description,
        link,
        image: "",
        umkmItemId,
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

    await prisma.uMKM.update({
      where: { id: result.id },
      data: { image: fileUrl },
    });

    return NextResponse.json({ umkm: result });
  } catch (e: unknown) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const { id } = await request.json();
  try {
    const umkm = await prisma.uMKM.findUnique({ where: { id } });

    if (!umkm) {
      return NextResponse.json({ error: "UMKM item not found" }, { status: 404 });
    }

    if (umkm.image) {
      const filePath = join(process.cwd(), "public", umkm.image);
      await unlink(filePath).catch((err) => {
        console.error("Failed to delete file:", err);
      });
    }

    await prisma.uMKM.delete({ where: { id } });
    return NextResponse.json({ umkm });
  } catch (e: unknown) {
    console.error("Error while trying to delete a UMKM item\n", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

