import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "@/hooks/use-toast"
import type { GalleryItem, FormValues } from "@/lib/types"

// Tailwind CSS classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fetch gallery items
export const fetchGalleryItems = (): GalleryItem[] => [
  {
    id: '1',
    title: 'Kunjungan Daerah',
    description: 'Kunjungan dari daerah ke daerah lain untuk mempererat hubungan',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Kunjungan', 'Daerah', 'Hubungan']
  },
  {
    id: '2',
    title: 'Panen Lorong Sayur',
    description: 'Panen berbagai jenis sayuran di lorong sayur',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Panen', 'Sayur', 'Lorong']
  },
  {
    id: '3',
    title: 'Pembangunan Jalan',
    description: 'Pembangunan jalan baru di daerah tertentu',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Pembangunan', 'Jalan', 'Baru']
  },
  {
    id: '4',
    title: 'Kunjungan Daerah',
    description: 'Kunjungan dari daerah ke daerah lain untuk mempererat hubungan',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Kunjungan', 'Daerah', 'Hubungan']
  },
  {
    id: '5',
    title: 'Panen Lorong Sayur',
    description: 'Panen berbagai jenis sayuran di lorong sayur',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Panen', 'Sayur', 'Lorong']
  },
  {
    id: '6',
    title: 'Pembangunan Jalan',
    description: 'Pembangunan jalan baru di daerah tertentu',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Pembangunan', 'Jalan', 'Baru']
  },
  {
    id: '7',
    title: 'Kunjungan Daerah',
    description: 'Kunjungan dari daerah ke daerah lain untuk mempererat hubungan',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Kunjungan', 'Daerah', 'Hubungan']
  },
  {
    id: '8',
    title: 'Panen Lorong Sayur',
    description: 'Panen berbagai jenis sayuran di lorong sayur',
    imageUrl: '/img/hero-background_1.png?height=300&width=400',
    tags: ['Panen', 'Sayur', 'Lorong']
  }
];

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay: 0.2 }
};

export const staggerChildren = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Handle form submission
export const handleFormSubmit = (values: FormValues) => {
  toast({
    title: "Form berhasil dikirim",
    description: "Terima kasih telah menghubungi kami.",
  });
  console.log(values);
};