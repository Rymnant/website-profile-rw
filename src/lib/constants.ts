import { HeaderNavItem } from '@/lib/types';

// Description: The file contains the constants that are used in the website.

// Define the navigation items
export const HEADER_NAV_ITEMS: HeaderNavItem[] = [
    { label: 'Beranda', link: '/' },
    {
        label: 'Tentang Kami',
        dropdown: [
            { label: 'Profil', link: '/about', description: 'Visi misi serta informasi sekilas RW 06' },
            { label: 'Struktur Organisasi', link: '/organization', description: 'Struktur organisasi RW 06' },
        ]
    },
    {
        label: 'Belanja',
        dropdown: [
            { label: 'UMKM RT 17', link: '/umkm/rt-17', description: 'Daftar UMKM di RT 17' },
            { label: 'UMKM RT 18', link: '/umkm/rt-18', description: 'Daftar UMKM di RT 18' },
            { label: 'UMKM RT 19', link: '/umkm/rt-19', description: 'Daftar UMKM di RT 19' },
            { label: 'UMKM RT 20', link: '/umkm/rt-20', description: 'Daftar UMKM di RT 20' }
        ]
    },
    { label: 'Berita', link: '/news' },
    { label: 'Galeri', link: '/gallery' },
    { label: 'Hubungi Kami', link: '/contact' },
];

// Define the hero section props
export const HERO_PROPS = [{
    title: 'Selamat Datang',
    subtitle: 'Di website resmi RW06 Rejowinangun',
    tagline: 'Website ini berisi informasi seputar RW06 Rejowinangun',
    buttonText: 'Tentang Kami',
    buttonHref: '/about',
}
];

// Define the information section props
export const INFORMATION_PROPS = [
    { title: 'Informasi', description: 'Informasi seputar RW06 Rejowinangun', href: '/information' },
    { title: 'UMKM', description: 'Daftar UMKM di RW06 Rejowinangun', href: '/umkm' },
    { title: 'Galeri', description: 'Galeri foto RW06 Rejowinangun', href: '/gallery' },
    { title: 'Hubungi Kami', description: 'Hubungi kami untuk informasi lebih lanjut', href: '/contact' },
];

// Define the news item props
export const NEWS_PROPS = [
    {
        id: '1',
        date: '2021-10-01',
        title: 'Pembangunan Pos Kamling',
        excerpt: 'Pembangunan pos kamling di RW06 Rejowinangun telah selesai dilakukan',
        imageUrl: '/img/hero-background_1.png',
        href: '/news/1'
    },
    {
        id: '2',
        date: '2021-10-02',
        title: 'Pengumuman PPKM',
        excerpt: 'Pengumuman terkait PPKM di RW06 Rejowinangun',
        imageUrl: '/img/hero-background_1.png',
        href: '/news/2'
    },
    {
        id: '3',
        date: '2021-10-03',
        title: 'Pembagian Sembako',
        excerpt: 'Pembagian sembako di RW06 Rejowinangun telah selesai dilakukan',
        imageUrl: '/img/hero-background_1.png',
        href: '/news/3'
    },
    {
        id: '4',
        date: '2021-10-04',
        title: 'Pembangunan Jalan',
        excerpt: 'Pembangunan jalan di RW06 Rejowinangun telah selesai dilakukan',
        imageUrl: '/img/hero-background_1.png',
        href: '/news/4'
    },
    {
        id: '5',
        date: '2021-10-05',
        title: 'Pengumuman Banjir',
        excerpt: 'Pengumuman terkait siaga banjir di RW06 Rejowinangun',
        imageUrl: '/img/hero-background_1.png',
        href: '/news/5'
    },
    {
        id: '6',
        date: '2021-10-06',
        title: 'Pembangunan Taman',
        excerpt: 'Pembangunan taman di RW06 Rejowinangun telah selesai dilakukan',
        imageUrl: '/img/hero-background_1.png',
        href: '/news/6'
    }
];

// Define the footer props
export const FOOTER_PROPS = [
    {
        title: "TENTANG KAMI",
        links: [
            { label: "Profil", href: "#" },
            { label: "Struktur Organisasi", href: "#" },
            { label: "Berita", href: "#" },
        ]
    },
    {
        title: "INFORMASI",
        links: [
            { label: "Galeri", href: "#" },
            { label: "Statistik", href: "#" },
            { label: "UMKM", href: "#" },
        ]
    },
    {
        title: "LAINNYA",
        links: [
            { label: "Hubungi Kami", href: "#" },
        ]
    }
];