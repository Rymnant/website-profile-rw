import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { NewsArticle } from "@/lib/types"
import { motion } from 'framer-motion'

const NewsCard = ({ article }: { article: NewsArticle }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="cursor-pointer"
  >
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[50%]">
          <Image 
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Badge className="mb-2">{article.category}</Badge>
        <CardTitle className="text-lg md:text-xl mb-2 line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3">{article.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-t space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
          <CalendarIcon className="w-3 h-3 md:w-4 md:h-4" />
          <span>{article.date.toLocaleDateString()}</span>
          <ClockIcon className="w-3 h-3 md:w-4 md:h-4 ml-2" />
          <span>{article.readTime}</span>
        </div>
        <Button size="sm" asChild>
          <Link href={article.link}>Baca Selengkapnya</Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
)

export default NewsCard