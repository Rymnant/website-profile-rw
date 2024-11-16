import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GalleryCardProps } from "@/lib/types";

const GalleryCard: React.FC<GalleryCardProps> = ({ title, description, imageUrl, tags }) => (
  <Card className="overflow-hidden">
    <CardHeader className="p-0">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
      <CardDescription className="text-sm text-gray-600 mb-4">{description}</CardDescription>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default GalleryCard;
