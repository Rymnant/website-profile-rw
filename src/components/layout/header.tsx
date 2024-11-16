'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown, Clock, Users, GitBranch } from 'lucide-react'
import { HEADER_NAV_ITEMS } from '@/lib/constants'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const toggleMobileDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    }

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex-shrink-0">
                    <Image src="/icon/icon-transformed.png" alt="RW 012 Logo" width={150} height={50} className="h-12 w-auto" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 ml-auto">
                    {HEADER_NAV_ITEMS.map((item) => (
                        item.dropdown ? (
                            <div key={item.label} className="relative group">
                                <button className="text-gray-700 hover:text-gray-900 flex items-center" aria-haspopup="true">
                                    {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                <div className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="py-2" role="menu" aria-orientation="vertical">
                                        {item.dropdown.map((subItem) => (
                                            <Link key={subItem.label} href={subItem.link!} className="block hover:bg-gray-50 transition-colors duration-150" role="menuitem" onClick={handleLinkClick}>
                                                <div className="flex p-4 items-start">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                                        {subItem.label === 'Profil' && <Clock className="h-5 w-5 text-gray-600" />}
                                                        {subItem.label === 'Struktur Organisasi' && <GitBranch className="h-5 w-5 text-gray-600" />}
                                                        {subItem.label === 'UMKM RT 17' && <Users className="h-5 w-5 text-gray-600" />}
                                                        {subItem.label === 'UMKM RT 18' && <Users className="h-5 w-5 text-gray-600" />}
                                                        {subItem.label === 'UMKM RT 19' && <Users className="h-5 w-5 text-gray-600" />}
                                                        {subItem.label === 'UMKM RT 20' && <Users className="h-5 w-5 text-gray-600" />}
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-sm font-medium text-gray-900">{subItem.label}</p>
                                                        {subItem.description && <p className="text-sm text-gray-500">{subItem.description}</p>}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            item.link && <Link key={item.label} href={item.link} className="text-gray-700 hover:text-gray-900" onClick={handleLinkClick}>{item.label}</Link>
                        )
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <button
                        className="md:hidden text-gray-700 hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {HEADER_NAV_ITEMS.map((item) => (
                            <div key={item.label}>
                                {item.link && <Link href={item.link} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleLinkClick}>{item.label}</Link>}
                                {item.dropdown && (
                                    <>
                                        <button
                                            onClick={() => toggleMobileDropdown(item.label)}
                                            className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            aria-expanded={activeDropdown === item.label}
                                        >
                                            {item.label}
                                        </button>
                                        {activeDropdown === item.label && (
                                            <div className="pl-6 space-y-1">
                                                {item.dropdown.map((subItem) => (
                                                    <Link key={subItem.label} href={subItem.link!} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={handleLinkClick}>
                                                        <div className="flex items-center">
                                                            {subItem.label === 'Profil' && <Clock className="h-5 w-5 mr-5 text-gray-600" />}
                                                            {subItem.label === 'Struktur Organisasi' && <GitBranch className="h-5 w-5 mr-5 text-gray-600" />}
                                                            {subItem.label === 'UMKM RT 17' && <Users className="h-5 w-5 mr-5 text-gray-600" />}
                                                            {subItem.label === 'UMKM RT 18' && <Users className="h-5 w-5 mr-5 text-gray-600" />}
                                                            {subItem.label === 'UMKM RT 19' && <Users className="h-5 w-5 mr-5 text-gray-600" />}
                                                            {subItem.label === 'UMKM RT 20' && <Users className="h-5 w-5 mr-5 text-gray-600" />}
                                                            <div>
                                                                <div className="font-medium">{subItem.label}</div>
                                                                {subItem.description && <div className="text-sm text-gray-500">{subItem.description}</div>}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}