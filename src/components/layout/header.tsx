'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown, Clock, Users, GitBranch } from 'lucide-react'
import { HEADER_NAV_ITEMS } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'
import ModeToggle from '@/components/ui/theme-button'

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
        <motion.header
            className="sticky top-0 z-50 bg-white dark:bg-black shadow-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex-shrink-0">
                    <Image src="/icon/icon-transformed.png" alt="RW 012 Logo" width={150} height={50} className="h-12 w-auto dark:bg-white dark:rounded-full" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 ml-auto items-center">
                    {HEADER_NAV_ITEMS.map((item, index) => (
                        item.dropdown ? (
                            <motion.div
                                key={item.label}
                                className="relative group"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button className="light:text-gray-700 dark:text-white hover:text-gray-900 flex items-center" aria-haspopup="true">
                                    {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                <motion.div
                                    className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-100"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="py-2 bg-white dark:bg-black" role="menu" aria-orientation="vertical">
                                        {item.dropdown.map((subItem) => (
                                            <Link key={subItem.label} href={subItem.link!} className="block hover:bg-transparent dark:hover:bg-gray-900 transition-colors duration-150" role="menuitem" onClick={handleLinkClick}>
                                                <div className="flex p-4 items-start">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 dark:bg-white flex items-center justify-center">
                                                        {subItem.label === 'Profil' && <Clock className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                        {subItem.label === 'Struktur Organisasi' && <GitBranch className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                        {subItem.label === 'UMKM RT 17' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                        {subItem.label === 'UMKM RT 18' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                        {subItem.label === 'UMKM RT 19' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                        {subItem.label === 'UMKM RT 20' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{subItem.label}</p>
                                                        {subItem.description && <p className="text-sm text-gray-500 dark:text-white">{subItem.description}</p>}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ) : (
                            item.link &&
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={item.link} className="text-gray-700 dark:text-white hover:text-gray-900" onClick={handleLinkClick}>{item.label}</Link>
                            </motion.div>
                        )
                    ))}
                    <ModeToggle />
                </nav>

                <div className="flex items-center space-x-4">
                    <motion.button
                        className="md:hidden text-gray-700 hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.95 }}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >

                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {HEADER_NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    {item.link &&
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Link href={item.link} className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-white hover:bg-transparent dark:hover:bg-gray-900" onClick={handleLinkClick}>{item.label}</Link>
                                        </motion.div>
                                    }
                                    {item.dropdown && (
                                        <>
                                            <motion.button
                                                onClick={() => toggleMobileDropdown(item.label)}
                                                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-white hover:bg-transparent dark:hover:bg-gray-900"
                                                aria-expanded={activeDropdown === item.label}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {item.label}
                                            </motion.button>
                                            <AnimatePresence>
                                                {activeDropdown === item.label && (
                                                    <motion.div
                                                        className="pl-6 space-y-1"
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {item.dropdown.map((subItem) => (
                                                            <motion.div
                                                                key={subItem.label}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <Link href={subItem.link!} className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-white" onClick={handleLinkClick}>
                                                                    <div className="flex items-center">
                                                                        <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 dark:bg-white flex items-center justify-center">
                                                                            {subItem.label === 'Profil' && <Clock className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                                            {subItem.label === 'Struktur Organisasi' && <GitBranch className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                                            {subItem.label === 'UMKM RT 17' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                                            {subItem.label === 'UMKM RT 18' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                                            {subItem.label === 'UMKM RT 19' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                                            {subItem.label === 'UMKM RT 20' && <Users className="h-5 w-5 text-gray-600 dark:text-black" />}
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{subItem.label}</p>
                                                                            {subItem.description && <p className="text-sm text-gray-500 dark:text-white">{subItem.description}</p>}
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='mb-3 mx-3'>
                            <ModeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

