
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const revalidate = 60

export async function GET() {
  try {
    const admins = await prisma.admin.findMany()
    return NextResponse.json(admins)
  } catch {
    return NextResponse.json({ error: "Failed to fetch Admins" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const admin = await prisma.admin.create({ data })
    return NextResponse.json(admin)
  } catch {
    return NextResponse.json({ error: "Failed to create Admin" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.admin.delete({ where: { id } })
    return NextResponse.json({ message: "Admin deleted successfully" })
  } catch {
    return NextResponse.json({ error: "Failed to delete Admin" }, { status: 500 })
  }
}