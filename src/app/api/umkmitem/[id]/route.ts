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

    const umkmItem = await prisma.uMKMItem.findUnique({ where: { id } });

    if (!umkmItem) {
      return NextResponse.json({ error: "UMKM Item not found" }, { status: 404 });
    }

    const updatedItem = await prisma.uMKMItem.update({
      where: { id },
      data,
    });

    return NextResponse.json({ item: updatedItem });
  } catch (e: unknown) {
    console.error("Error while trying to edit UMKM item\n", e);
    return NextResponse.json({ error: "Failed to update UMKM item." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const umkmItem = await prisma.uMKMItem.findUnique({ where: { id } });

    if (!umkmItem) {
      return NextResponse.json({ error: "UMKM Item not found" }, { status: 404 });
    }

    await prisma.uMKMItem.delete({ where: { id } });
    return NextResponse.json({ message: "UMKM Item deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete UMKM Item" }, { status: 500 });
  }
}
