import { UMKMItem } from "@/lib/types"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import { Pagination } from "./Pagination"
import  Link  from "next/link"

export function UMKMList({ umkm, currentPage, setCurrentPage, rtId }: { umkm: UMKMItem, currentPage: number, setCurrentPage: (page: number) => void, rtId: string | null }) {
    const totalPages = Math.ceil((umkm.items?.length || 0) / ITEMS_PER_PAGE)
    const paginatedItems = umkm.items?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{umkm.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedItems?.map((item) => (
                    <Link
                        key={item.id}
                        href={`/umkm/${rtId}/${item.id}`}
                        className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">{item.label}</h2>
                        <p className="text-gray-600">{item.description}</p>
                    </Link>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-8"
            />
            <Link href="/umkm" className="text-blue-500 hover:underline">
                Kembali ke halaman utama
            </Link>
        </div>
    )
}