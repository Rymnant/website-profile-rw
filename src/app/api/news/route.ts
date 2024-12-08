import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const revalidate = 1

export async function GET() {
  try {
    const newsArticles = await prisma.newsArticle.findMany()
    return NextResponse.json(newsArticles)
  } catch {
    return NextResponse.json({ error: "Failed to fetch news articles" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newsArticle = await prisma.newsArticle.create({ data })
    return NextResponse.json(newsArticle)
  } catch {
    return NextResponse.json({ error: "Failed to create news article" }, { status: 500 })
  }
}

