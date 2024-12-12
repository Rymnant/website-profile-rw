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
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await request.json()

    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Failed to delete admin:", error);
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...rest } = data
    const admin = await prisma.admin.update({ where: { id }, data: rest })
    return NextResponse.json(admin)
  } catch {
    return NextResponse.json({ error: "Failed to update Admin" }, { status: 500 })
  }
}