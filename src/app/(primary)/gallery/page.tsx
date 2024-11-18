'use client'

import React, { useState } from 'react';
import { fetchGalleryItems } from "@/lib/utils";
import GalleryCard from "@/components/common/GalleryCard";
import { Pagination } from "@/components/common/Pagination";

const GalleryPage: React.FC = () => {
  const galleryItems = fetchGalleryItems();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  const currentItems = galleryItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="container mx-auto px-4 py-8 max-w-10xl">
      <div className="mb-12 mt-12 text-left">
        <h1 className="text-4xl font-bold mb-2">Galeri</h1>
        <p className="text-muted-foreground">Kumpulan foto-foto kegiatan di RW06 Rejowinangun</p>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentItems.map((item) => (
              <GalleryCard key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;