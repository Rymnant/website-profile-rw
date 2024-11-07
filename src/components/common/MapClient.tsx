'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapClientProps {
    center: [number, number]
    zoom: number
}

// Mungkin bisa diganti area RW 06 daripada 1 koordinat

export default function MapClient({ center, zoom }: MapClientProps) {
    useEffect(() => {
        const map = L.map('map').setView(center, zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        L.marker(center).addTo(map)

        return () => {
            map.remove()
        }
    }, [center, zoom])

    return <div id="map" className="h-[300px] w-full rounded-lg" />
}
