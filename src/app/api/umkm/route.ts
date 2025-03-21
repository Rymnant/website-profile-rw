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
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`

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
    })

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: `umkm/${filename}`, resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result as { secure_url: string })
          }
        }
      )
      stream.end(buffer)
    })

    const fileUrl = uploadResult.secure_url

    await prisma.uMKM.update({
      where: { id: result.id },
      data: { image: fileUrl },
    })

    return NextResponse.json({ umkm: result })
  } catch (e: unknown) {
    console.error("Error while trying to upload a file\n", e)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

