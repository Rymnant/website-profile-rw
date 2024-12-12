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

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const { id } = await request.json()
  try {
    const umkm = await prisma.uMKM.findUnique({ where: { id } })

    if (!umkm) {
      return NextResponse.json({ error: "UMKM item not found" }, { status: 404 })
    }

    if (umkm.image) {
      const publicId = umkm.image.split('/').pop()?.split('.')[0]
      if (publicId) {
        try {
          const result = await cloudinary.uploader.destroy(`umkm/${publicId}`)
          if (result.result !== 'ok') {
            throw new Error('Failed to delete image from Cloudinary')
          }
        } catch (err) {
          console.error("Failed to delete image from Cloudinary:", err)
          return NextResponse.json(
            { error: "Failed to delete image from Cloudinary" },
            { status: 500 }
          )
        }
      }
    }

    await prisma.uMKM.delete({ where: { id } })
    return NextResponse.json({ umkm })
  } catch (e: unknown) {
    console.error("Error while trying to delete a UMKM item\n", e)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData()

  const id = formData.get("id") as string
  const label = formData.get("label") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  const link = formData.get("link") as string
  const image = formData.get("image") as File | null

  try {
    const umkm = await prisma.uMKM.findUnique({ where: { id } })

    if (!umkm) {
      return NextResponse.json({ error: "UMKM item not found" }, { status: 404 })
    }

    let fileUrl = umkm.image

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`

      if (umkm.image) {
        const publicId = umkm.image.split('/').pop()?.split('.')[0]
        if (publicId) {
          await cloudinary.uploader.destroy(`umkm/${publicId}`).catch((err) => {
            console.error("Failed to delete old image from Cloudinary:", err)
          })
        }
      }

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

      fileUrl = uploadResult.secure_url
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
    })

    return NextResponse.json({ umkm: updatedUMKM })
  } catch (e: unknown) {
    console.error("Error while trying to edit UMKM item\n", e)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}

