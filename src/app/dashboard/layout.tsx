import { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link href="/dashboard" className="text-2xl font-bold text-primary">
                            Dashboard
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl">
                {children}
            </main>
            <footer className="bg-white border-t">
                <div className="container mx-auto px-4 py-4 text-center text-gray-600">
                    © 2024 KKN UAD TEMATIK MBKM 93 I.A.2
                </div>
            </footer>
        </div>
    )
}