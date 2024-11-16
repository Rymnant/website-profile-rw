import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Tipe data untuk artikel berita
type NewsArticle = {
  id: string
  title: string
  description: string
  category: string
  author: string
  date: string
  readTime: string
  imageUrl: string
  link: string
}

// Komponen NewsCard yang dapat digunakan kembali
const NewsCard = ({ article }: { article: NewsArticle }) => (
  <Card className="flex flex-col h-full">
    <CardHeader className="p-0">
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover rounded-t-lg"
      />
    </CardHeader>
    <CardContent className="flex-grow p-4">
      <Badge className="mb-2">{article.category}</Badge>
      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
      <CardDescription className="text-sm line-clamp-3">{article.description}</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between items-center p-4 border-t">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <CalendarIcon className="w-4 h-4" />
        <span>{article.date}</span>
        <ClockIcon className="w-4 h-4 ml-2" />
        <span>{article.readTime}</span>
      </div>
      <Button asChild>
        <Link href={article.link}>Baca Selengkapnya</Link>
      </Button>
    </CardFooter>
  </Card>
)

// Data dummy untuk artikel berita
const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Perkembangan Teknologi AI Terbaru",
    description: "Artificial Intelligence terus berkembang pesat. Simak perkembangan terbaru yang menggemparkan dunia teknologi.",
    category: "Teknologi",
    author: "John Doe",
    date: "2023-06-15",
    readTime: "5 menit",
    imageUrl: "/placeholder.svg?height=200&width=400",
    link: "/berita/ai-terbaru"
  },
  {
    id: "2",
    title: "Tips Hidup Sehat di Era Digital",
    description: "Bagaimana cara menjaga kesehatan di tengah gempuran teknologi? Temukan tips-tips praktis dalam artikel ini.",
    category: "Kesehatan",
    author: "Jane Smith",
    date: "2023-06-14",
    readTime: "4 menit",
    imageUrl: "/placeholder.svg?height=200&width=400",
    link: "/berita/hidup-sehat-digital"
  },
  {
    id: "3",
    title: "Inovasi Energi Terbarukan",
    description: "Perkembangan terbaru dalam teknologi energi terbarukan yang menjanjikan masa depan lebih hijau.",
    category: "Lingkungan",
    author: "Alex Green",
    date: "2023-06-13",
    readTime: "6 menit",
    imageUrl: "/placeholder.svg?height=200&width=400",
    link: "/berita/energi-terbarukan"
  },
]

// Komponen utama NewsSection
export default function NewsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Berita Terkini</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}