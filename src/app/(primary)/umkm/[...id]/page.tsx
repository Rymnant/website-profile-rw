'use client'

import { UMKM_ITEMS, ITEMS_PER_PAGE } from '@/lib/constants'
import Link from 'next/link'
import { Pagination } from '@/components/common/Pagination'
import { useState, useEffect } from 'react'
import { UMKMItem, UMKM } from '@/lib/types'

export default function UMKMDetailPage({
    params
}: {
    params: Promise<{ id: string[] }>
}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [umkm, setUmkm] = useState<UMKMItem | null>(null)
    const [item, setItem] = useState<UMKM | null>(null)
    const [rtId, setRtId] = useState<string | null>(null)
    const [itemId, setItemId] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            const { id } = await params
            const [rtId, itemId] = id
            setRtId(rtId)
            setItemId(itemId)
            const umkm = UMKM_ITEMS.find(item => item.id === rtId) || null
            setUmkm(umkm)
            if (itemId && umkm) {
                const item = umkm.items?.find(i => i.id === itemId) || null
                setItem(item)
            }
        }
        fetchData()
    }, [params])

    if (!umkm) {
        return <div className="container mx-auto px-4 py-8">UMKM tidak ditemukan</div>
    }

    if (itemId && item) {
        return (
            <ItemDetail item={item} umkmTitle={umkm.title} rtId={rtId} />
        )
    }

    return (
        <UMKMList
            umkm={umkm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rtId={rtId}
        />
    )
}

function ItemDetail({ item, umkmTitle, rtId }: { item: UMKM, umkmTitle: string, rtId: string | null }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{item.label}</h1>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <Link href={`/umkm/${rtId}`} className="text-blue-500 hover:underline">
                Kembali ke daftar {umkmTitle}
            </Link>
        </div>
    )
}

function UMKMList({ umkm, currentPage, setCurrentPage, rtId }: { umkm: UMKMItem, currentPage: number, setCurrentPage: (page: number) => void, rtId: string | null }) {
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