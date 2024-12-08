import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const revalidate = 1

export async function GET() {
  try {
    const organizationMembers = await prisma.organizationMember.findMany()
    return NextResponse.json(organizationMembers)
  } catch {
    return NextResponse.json({ error: "Failed to fetch organization members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const organizationMember = await prisma.organizationMember.create({ data })
    return NextResponse.json(organizationMember)
  } catch {
    return NextResponse.json({ error: "Failed to create organization member" }, { status: 500 })
  }
}

