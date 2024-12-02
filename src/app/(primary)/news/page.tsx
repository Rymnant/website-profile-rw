'use client'

import { useState } from "react"
import { NEWS_ARTICLES } from "@/lib/constants"
import NewsCard from "@/components/common/NewsCard"
import { Pagination } from "@/components/common/Pagination"
import { fadeInUp, staggerChildren } from "@/lib/utils"
import { motion } from 'framer-motion'

export default function NewsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6
  const totalPages = Math.ceil(NEWS_ARTICLES.length / articlesPerPage)

  const currentArticles = NEWS_ARTICLES.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="container mx-auto px-4 py-8 max-w-10xl">
      <motion.div {...fadeInUp} className="mb-2 mt-2 text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Berita Terkini</h1>
        <p className="text-sm md:text-base text-muted-foreground">Berita terkini dari RW6 Rejowinangun</p>
      </motion.div>

      <section className="py-6 md:py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {currentArticles.map((article) => (
            <motion.div
              key={article.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <NewsCard key={article.id} article={article} />
            </motion.div>
          ))}
        </motion.div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-8"
        />
      </section>
    </motion.main>
  )
}