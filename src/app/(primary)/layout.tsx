import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header /> 
                <main className="flex-grow my-6">
                    {children}
                </main>
            <Footer />
        </div>
    )
}