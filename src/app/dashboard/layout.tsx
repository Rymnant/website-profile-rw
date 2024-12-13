"use client"

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "dev-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex justify-between items-center">
                        <Link href="/dashboard" className="text-xl sm:text-2xl font-bold text-primary">
                            Dashboard
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl">
                {children}
            </main>
            <footer className="bg-white border-t">
                <div className="container mx-auto px-4 py-4 text-center text-gray-600 text-sm sm:text-base">
                    © {new Date().getFullYear()} KKN UAD TEMATIK MBKM 93 I.A.2
                </div>
            </footer>
        </div>
    )
}