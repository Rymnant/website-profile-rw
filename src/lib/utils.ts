import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import maplibregl from 'maplibre-gl'
import type { MapMarker } from '@/lib/types'

// Tailwind CSS classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}