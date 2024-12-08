import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow my-6">
                {children}
            </main>
        </div>
    )
}