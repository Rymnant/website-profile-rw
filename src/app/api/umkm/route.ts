import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

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

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const umkm = await prisma.uMKM.create({ data })
    return NextResponse.json(umkm)
  } catch {
    return NextResponse.json({ error: "Failed to create UMKM" }, { status: 500 })
  }
}

