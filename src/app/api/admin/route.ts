import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const revalidate = 60

export async function GET() {
  try {
    const admins = await prisma.admin.findMany()
    return NextResponse.json(admins)
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json()
    const admin = await prisma.admin.create({ data })
    return NextResponse.json(admin)
  } catch (error) {
    console.error("Failed to create admin:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 })
  }
}