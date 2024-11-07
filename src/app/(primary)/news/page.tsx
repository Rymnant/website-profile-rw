'use client';

import ArticleCard from "@/components/common/ArticleCard";
import { ARTICLES } from "@/lib/constants";
import { Pagination } from "@/components/common/Pagination";
import { useState, useEffect } from "react";
import { Article } from "@/lib/types";

export default function News() {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [displayedArticles, setDisplayedArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const articlesPerPage = 6
    const allArticles = ARTICLES();

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            const startIndex = (currentPage - 1) * articlesPerPage
            const endIndex = startIndex + articlesPerPage
            setDisplayedArticles(allArticles.slice(startIndex, endIndex))
            setTotalPages(Math.ceil(allArticles.length / articlesPerPage))
            setIsLoading(false)
        }, 500)
    }, [currentPage])

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 text-center">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-10xl">
            <div className="mb-12 mt-12 text-left">
                <h1 className="text-4xl font-bold mb-2">Berita</h1>
                <p className="text-muted-foreground">Baca informasi dan berita terbaru seputar RW6 Rejowinangun</p>
            </div>

            <div className="container mx-auto py-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {displayedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </main>
    )
}