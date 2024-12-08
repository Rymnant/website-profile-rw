import { UMKMItem } from "@/lib/types"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import { Pagination } from "./Pagination"
import Link from "next/link"
import Image from "next/image"
import { Store } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { motion } from 'framer-motion'

export function UMKMList({
  umkm,
  currentPage,
  setCurrentPage,
  rtId
}: {
  umkm: UMKMItem,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  rtId: string | null
}) {
  const totalPages = Math.ceil((umkm.items?.length || 0) / ITEMS_PER_PAGE)
  const paginatedItems = umkm.items?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedItems?.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Link
              href={`/umkm/${rtId}/${item.id}`}
              className="transform transition-all hover:scale-105"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden h-full">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">

                      {/* Ntar diubah bang */}
                      
                      <Image
                        src="/icon/icon-transformed.png"
                        layout="fill"
                        objectFit="cover"
                        alt="UMKM Item Image"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="text-primary bg-black text-white dark:bg-white dark:text-black">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <h2 className="text-xl font-semibold line-clamp-1">{item.label}</h2>
                    <p className="text-gray-600 dark:text-white text-sm line-clamp-2">{item.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center gap-1 text-primary">
                        <Store className="h-4 w-4" />
                        <span className="text-sm font-medium">Hubungi Toko</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Link
          href="/umkm"
          className="text-primary hover:text-primary/80 font-medium"
        >
          Kembali ke halaman utama
        </Link>
      </div>
    </motion.div>
  )
}