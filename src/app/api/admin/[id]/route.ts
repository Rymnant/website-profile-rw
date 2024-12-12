import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const data = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { id } });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data,
    });

    return NextResponse.json({ admin: updatedAdmin });
  } catch (error) {
    console.error("Failed to update admin:", error);
    return NextResponse.json({ error: "Failed to update admin." }, { status: 500 });
  }
}
