'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Instagram, MessageCircle, Cloud, ArrowUp } from 'lucide-react'
import { FOOTER_PROPS } from '@/lib/constants'
import { useState, useEffect } from 'react'

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="w-full bg-white dark:bg-gray-900 pt-12 pb-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Navigation Sections */}
                    {FOOTER_PROPS.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h3 className="font-bold text-sm">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Environmental Metrics & Dark Mode Toggle */}
                <div className="mt-12 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
                    <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <Mail className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <MessageCircle className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <Cloud className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    © 2024 Sekretariat RW 12 Pegangsaan Dua
                </div>
            </div>

            {/* Back to Top Button */}
            <Button
                variant="outline"
                size="icon"
                className={`fixed bottom-6 right-6 rounded-full transition-opacity ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={scrollToTop}
            >
                <ArrowUp className="w-4 h-4" />
            </Button>
        </footer>
    )
}