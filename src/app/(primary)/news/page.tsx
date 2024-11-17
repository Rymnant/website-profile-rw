'use client'

import { useState } from "react"
import { NEWS_ARTICLES } from "@/lib/constants"
import NewsCard from "@/components/common/NewsCard"
import { Pagination } from "@/components/common/Pagination"

export default function NewsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6
  const totalPages = Math.ceil(NEWS_ARTICLES.length / articlesPerPage)

  const currentArticles = NEWS_ARTICLES.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 md:mb-12 mt-8 md:mt-12 text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Berita Terkini</h1>
        <p className="text-sm md:text-base text-muted-foreground">Berita terkini dari RW6 Rejowinangun</p>
      </div>

      <section className="py-6 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {currentArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-8"
        />
      </section>
    </main>
  )
}