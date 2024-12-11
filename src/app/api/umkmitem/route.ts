import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const revalidate = 60

export async function GET() {
  try {
    const umkmItems = await prisma.uMKMItem.findMany()
    return NextResponse.json(umkmItems)
  } catch {
    return NextResponse.json({ error: "Failed to fetch UMKM Items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const umkmItem = await prisma.uMKMItem.create({ data })
    return NextResponse.json(umkmItem)
  } catch {
    return NextResponse.json({ error: "Failed to create UMKM Item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await prisma.uMKMItem.delete({ where: { id } });
    return NextResponse.json({ message: "UMKM Item deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete UMKM Item" }, { status: 500 });
  }
}

