import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Article } from "@/lib/types"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="flex-1">
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          <h2 className="text-xl font-semibold line-clamp-2">{article.title}</h2>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{article.administrator}</span>
        </div>
        <div className="mt-1">Dilihat {article.viewCount} kali</div>
      </CardContent>
      <CardFooter className="text-sm font-medium">{article.date}</CardFooter>
    </Card>
  )
}