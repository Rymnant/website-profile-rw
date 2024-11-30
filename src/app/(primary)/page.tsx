'use client'

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HERO_PROPS, INFORMATION_PROPS, NEWS_PROPS } from "@/lib/constants"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/utils"

export default function HomePage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            const newScrollLeft =
                scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            })
        }
    }

    return (
        <div className="flex flex-col min-h-screen mt-4">
            {/* Hero Section */}
            <motion.section
                {...fadeInUp}
                className="relative w-full bg-background"
            >
                <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-12 sm:py-24">
                    {HERO_PROPS.map((item, index) => (
                        <div key={index} className="space-y-3 sm:space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                            >
                                {item.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="max-w-3xl text-lg sm:text-xl text-foreground/90 sm:text-2xl"
                            >
                                {item.subtitle}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="max-w-2xl text-base sm:text-lg text-muted-foreground"
                            >
                                {item.tagline}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="pt-4"
                            >
                                <Link href={item.buttonHref}>
                                    <Button
                                        className="group h-10 sm:h-12 rounded-md px-4 sm:px-6 text-sm sm:text-base"
                                        variant="default"
                                    >
                                        {item.buttonText}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Information Section */}
            <motion.section
                {...fadeInUp}
                className="w-full bg-background"
            >
                <div className="flex py-2 sm:py-24 justify-center">
                    <div className="max-w-6xl w-full px-4 sm:px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-2 text-xl sm:text-2xl font-bold"
                        >
                            Informasi
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-gray-500 dark:text-gray-400 mb-10"
                        >
                            Informasi terkait RW06 Rejowinangun
                        </motion.p>
                        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-2">
                            {INFORMATION_PROPS.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                                    className="group relative pl-6 sm:pl-8"
                                >
                                    <Link
                                        href={item.href}

                                    >
                                        <div className="absolute left-0 top-0 h-full w-1 bg-gray-200 transition-colors duration-200 group-hover:bg-blue-500" />
                                        <div className="space-y-2">
                                            <h3 className="text-lg sm:text-xl font-semibold tracking-tight transition-colors group-hover:text-blue-500">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* News Section */}
            <motion.section
                {...fadeInUp}
                className="w-full flex justify-center items-center bg-background"
            >
                <div className="container px-4 py-12 sm:py-24 max-w-6xl w-full sm:px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-2 text-xl sm:text-2xl font-bold"
                    >
                        Berita
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-gray-500 dark:text-gray-400 mb-10"
                    >
                        Berita terbaru seputar RW06 Rejowinangun
                    </motion.p>
                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
                        >
                            {NEWS_PROPS.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                                >
                                    <Card className="min-w-[250px] sm:min-w-[300px] max-w-[250px] sm:max-w-[300px] border-none shadow-none">
                                        <CardContent className="p-0">
                                            <div className="space-y-3 sm:space-y-4">
                                                <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="space-y-1 sm:space-y-2">
                                                    <time className="text-xs sm:text-sm text-muted-foreground">
                                                        {item.date}
                                                    </time>
                                                    <h3 className="text-sm sm:text-base font-semibold leading-tight">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                                        {item.excerpt}
                                                    </p>
                                                    <Link
                                                        href={item.href}
                                                        className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 inline-flex items-center"
                                                    >
                                                        Selengkapnya →
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        <div className="absolute -left-2 sm:-left-4 top-1/3 z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-background shadow-md"
                                onClick={() => scroll("left")}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Scroll left</span>
                            </Button>
                        </div>
                        <div className="absolute -right-2 sm:-right-4 top-1/3 z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-background shadow-md"
                                onClick={() => scroll("right")}
                            >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Scroll right</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}

