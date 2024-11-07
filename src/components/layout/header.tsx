'use client'

import Image from 'next/image'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'

export default function Header() {
    return (
        <header className={`fixed w-full z-10 transition-colors duration-300 bg-white`}>
            <nav className="container mx-auto px-2 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="/" alt="Logo" width={40} height={40} />
                </div>
                <ul className="flex space-x-6">
                    {NAV_ITEMS.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link} className={`text-gray-800 hover:text-gray-300`}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}