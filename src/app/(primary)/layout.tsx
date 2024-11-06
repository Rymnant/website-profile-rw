import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="text-black">
            <Header />
                {children}
            <Footer />
        </div>
    )
}