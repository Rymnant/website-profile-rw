'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown, Clock, Users, GitBranch } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const toggleMobileDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    }

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex-shrink-0">
                    <Image src="/icon/icon-transformed.png" alt="RW 012 Logo" width={150} height={50} className="h-12 w-auto" />
                </Link>

                <nav className="hidden md:flex space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-gray-900">Beranda</Link>

                    <div className="relative group">
                        <button
                            className="text-gray-700 hover:text-gray-900 flex items-center"
                            aria-haspopup="true"
                        >
                            Tentang Kami <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        <div className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="py-2" role="menu" aria-orientation="vertical">
                                <Link
                                    href="/profil"
                                    className="block hover:bg-gray-50 transition-colors duration-150"
                                    role="menuitem"
                                >
                                    <div className="flex p-4 items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded bg-cyan-100 flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-cyan-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">Profil</p>
                                            <p className="text-sm text-gray-500">Visi misi serta informasi sekilas mengenai kami</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    href="/struktur-rw"
                                    className="block hover:bg-gray-50 transition-colors duration-150"
                                    role="menuitem"
                                >
                                    <div className="flex p-4 items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center" aria-label="Structure icon">
                                            <GitBranch className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">Struktur RW</p>
                                            <p className="text-sm text-gray-500">Struktur organisasi RW 012</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    href="/pengurus-rt"
                                    className="block hover:bg-gray-50 transition-colors duration-150"
                                    role="menuitem"
                                >
                                    <div className="flex p-4 items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">Pengurus RT</p>
                                            <p className="text-sm text-gray-500">Kenali pengurus RT Anda</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button
                            className="text-gray-700 hover:text-gray-900 flex items-center"
                            aria-haspopup="true"
                        >
                            Layanan <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <Link href="/administrasi-kependudukan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Administrasi Kependudukan</Link>
                                <Link href="/keamanan-wilayah" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Keamanan Wilayah</Link>
                                <Link href="/kebersihan-lingkungan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Kebersihan Lingkungan</Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/berita" className="text-gray-700 hover:text-gray-900">Berita</Link>
                    <Link href="/hubungi-kami" className="text-gray-700 hover:text-gray-900">Hubungi Kami</Link>
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

            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Beranda</Link>
                        <button
                            onClick={() => toggleMobileDropdown('mobileAbout')}
                            className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            aria-expanded={activeDropdown === 'mobileAbout'}
                        >
                            Tentang Kami
                        </button>
                        {activeDropdown === 'mobileAbout' && (
                            <div className="pl-6 space-y-1">
                                <Link href="/profil" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 mr-3 text-cyan-600" />
                                        <div>
                                            <div className="font-medium">Profil</div>
                                            <div className="text-sm text-gray-500">Visi misi serta informasi sekilas mengenai kami</div>
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/struktur-rw" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <GitBranch className="h-5 w-5 mr-3 text-gray-600" />
                                        <div>
                                            <div className="font-medium">Struktur RW</div>
                                            <div className="text-sm text-gray-500">Struktur organisasi RW 012</div>
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/pengurus-rt" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 mr-3 text-gray-600" />
                                        <div>
                                            <div className="font-medium">Pengurus RT</div>
                                            <div className="text-sm text-gray-500">Kenali pengurus RT Anda</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                        <button
                            onClick={() => toggleMobileDropdown('mobileServices')}
                            className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            aria-expanded={activeDropdown === 'mobileServices'}
                        >
                            Layanan
                        </button>
                        {activeDropdown === 'mobileServices' && (
                            <div className="pl-6 space-y-1">
                                <Link href="/administrasi-kependudukan" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Administrasi Kependudukan</Link>
                                <Link href="/keamanan-wilayah" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Keamanan Wilayah</Link>
                                <Link href="/kebersihan-lingkungan" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Kebersihan Lingkungan</Link>
                            </div>
                        )}
                        <Link href="/berita" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Berita</Link>
                        <Link href="/hubungi-kami" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Hubungi Kami</Link>
                    </div>
                </div>
            )}
        </header>
    )
}