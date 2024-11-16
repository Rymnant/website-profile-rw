'use client'

import React from 'react';
import { fetchGalleryItems } from "@/lib/utils";
import GalleryCard from "@/components/common/GalleryCard";

const GalleryPage: React.FC = () => {
  const galleryItems = fetchGalleryItems();

  return (
    <main className="container mx-auto px-4 py-8 max-w-10xl">
      <div className="mb-12 mt-12 text-left">
        <h1 className="text-4xl font-bold mb-2">Galeri</h1>
        <p className="text-muted-foreground">Kumpulan foto-foto kegiatan di RW06 Rejowinangun</p>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <GalleryCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;