import Link from "next/link"
import { UMKM_ITEMS } from "@/lib/constants"

export default function Umkm() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-10xl">
            <div className="mb-12 mt-12 text-left">
                <h1 className="text-4xl font-bold mb-2">Daftar UMKM</h1>
                <p className="text-muted-foreground">Daftar UMKM yang ada di RW6 Rejowinangun</p>
            </div>

            <section className="relative flex items-center justify-center">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {UMKM_ITEMS.map((umkm) => (
                            <Link
                                key={umkm.id}
                                href={`/umkm/${umkm.id}`}
                                className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                            >
                                <h2 className="text-xl font-semibold mb-2">{umkm.title}</h2>
                                <p className="text-gray-600">{umkm.items?.length ?? 0} Data UMKM ditemukan</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}