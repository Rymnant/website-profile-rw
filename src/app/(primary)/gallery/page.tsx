'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryCard from "@/components/common/GalleryCard";
import { Pagination } from "@/components/common/Pagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp, staggerChildren } from "@/lib/utils";
import Image from 'next/image';
import { GALLERY_ITEMS } from "@/lib/constants";

export default function GalleryPage(){
  const galleryItems = GALLERY_ITEMS;
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  const currentItems = galleryItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="container mx-auto px-4 py-8 max-w-10xl">
      <motion.div {...fadeInUp} className="mb-2 mt-2 text-left">
        <h1 className="text-4xl font-bold mb-2">Galeri</h1>
        <p className="text-muted-foreground">Kumpulan foto-foto kegiatan di RW06 Rejowinangun</p>
      </motion.div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
          >
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <GalleryCard {...item} onClick={() => setSelectedItem(item)} />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg overflow-hidden w-full max-w-2xl md:max-w-3xl lg:max-w-4xl lg:w-3/4"
            >
              <Card className="w-full">
                <CardHeader className="p-0">
                  <div className="relative h-80 lg:h-96 w-full">
                    <Image
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-semibold mb-4">{selectedItem.title}</CardTitle>
                  <CardDescription className="text-base text-gray-600 mb-6">{selectedItem.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};