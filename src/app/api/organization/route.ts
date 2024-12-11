import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { join } from "path"
import mime from "mime"
import { stat, mkdir, writeFile, unlink } from "fs/promises"

const prisma = new PrismaClient()
export const revalidate = 60

export async function GET(){
  try {
    const organizationMembers = await prisma.organizationMember.findMany()
    return NextResponse.json(organizationMembers)
  } catch {
    return NextResponse.json({ error: "Failed to fetch organization members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData()

  const name = formData.get("name") as string
  const position = formData.get("position") as string
  const image = formData.get("image") as File

  const buffer = Buffer.from(await image.arrayBuffer())
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\//g, "-")}/organization/`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    const result = await prisma.organizationMember.create({
      data: {
        name,
        position,
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

    await prisma.organizationMember.update({
      where: { id: result.id },
      data: { image: fileUrl },
    });

    return NextResponse.json({ user: result });
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
      const filePath = join(process.cwd(), "public", organizationMember.image);
      await unlink(filePath).catch((err) => {
        console.error("Failed to delete file:", err);
      });
    }

    await prisma.organizationMember.delete({ where: { id } });
    return NextResponse.json({ message: "Organization member deleted successfully" });
  } catch (e: unknown) {
    console.error("Error while trying to delete organization member\n", e);
    return NextResponse.json({ error: "Failed to delete organization member" }, { status: 500 });
  }
}