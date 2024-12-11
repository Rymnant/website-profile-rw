import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GalleryItem } from "@/lib/types";

interface GalleryCardProps extends GalleryItem {
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ title, description, imageUrl, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="cursor-pointer"
  >
    <Card className="overflow-hidden h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-4">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

export default GalleryCard;