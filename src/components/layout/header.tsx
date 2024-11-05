'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '@/lib/constants'

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed w-full z-10 transition-colors duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-2 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                    <span className={`ml-2 font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>RW06 Rejowinganun</span>
                </div>
                <ul className="flex space-x-6">
                    {NAV_ITEMS.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link} className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-300`}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}