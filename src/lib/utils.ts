import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import maplibregl from 'maplibre-gl'
import type { MapMarker } from '@/lib/types'

// Tailwind CSS classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Create map markers
export function createMapMarkers(map: maplibregl.Map, markers: MapMarker[]): void {
  markers.forEach((marker) => {
    const el = document.createElement('div')
    el.className = 'marker'
    el.style.width = '24px'
    el.style.height = '24px'
    el.style.backgroundImage = 'url(/marker-icon.png)'
    el.style.backgroundSize = 'cover'
    el.style.cursor = 'pointer'

    new maplibregl.Marker(el)
      .setLngLat([marker.longitude, marker.latitude])
      .setPopup(
        new maplibregl.Popup({ offset: 25 })
          .setHTML(`<h3>${marker.title}</h3>`)
      )
      .addTo(map)
  })
}

export function flyToLocation(
  map: maplibregl.Map, 
  coordinates: [number, number], 
  zoom: number = 15
): void {
  map.flyTo({
    center: coordinates,
    zoom,
    essential: true
  })
}