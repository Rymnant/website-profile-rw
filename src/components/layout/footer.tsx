'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Instagram, MessageCircle, Cloud, ArrowUp } from 'lucide-react'
import { FOOTER_PROPS } from '@/lib/constants'
import { useState, useEffect } from 'react'

// Address component
function Address() {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-sm">RW 06 KELURAHAN REJOWINANGUN</h3>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li>Jl. Nyi Adi Sari No.754, Rejowinangun</li>
        <li>Kec. Kotagede, Kota Yogyakarta</li>
        <li>Daerah Istimewa Yogyakarta 55171</li>
      </ul>
    </div>
  )
}

// SocialLinks component
function SocialLinks() {
  return (
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
  )
}

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
        <footer className="w-full bg-white dark:bg-gray-900 pt-8 pb-4">
            <div className="container mx-auto px-4">
                {/* Mobile View */}
                <div className="md:hidden flex flex-col items-center text-center">
                    <Address />
                    <div className="mt-4 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-center items-center">
                        <SocialLinks />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        © 2024 KKN UAD TEMATIK MBKM 93 I.A.2
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <div className="flex justify-center items-center">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20">
                            <Address />
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
                    </div>

                    <div className="mt-12 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-center items-center">
                        <SocialLinks />
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        © 2024 KKN UAD TEMATIK MBKM 93 I.A.2
                    </div>
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