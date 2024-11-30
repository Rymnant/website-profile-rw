import { HeaderNavItem } from '@/lib/types';
import * as z from "zod";
import { NewsArticle } from '@/lib/types';
import { OrganizationMember } from '@/lib/types';
import { UMKMItem } from '@/lib/types';

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

// Data dummy untuk artikel berita
export const NEWS_ARTICLES: NewsArticle[] = [
    {
        id: "1",
        title: "Kegiatan Posyandu",
        description: "Kegiatan Posyandu di RW06 Rejowinangun",
        category: "Kesehatan",
        author: "Admin 1",
        date: "2021-10-01",
        readTime: "5 min",
        imageUrl: "/img/hero-background_1.png",
        link: "/news/1",
    },
    {
        id: "2",
        title: "Pembangunan Pos Kamling",
        description: "Pembangunan pos kamling di RW06 Rejowinangun",
        category: "Infrastruktur",
        author: "Admin 1",
        date: "2021-10-01",
        readTime: "5 min",
        imageUrl: "/img/hero-background_1.png",
        link: "/news/2",
    },
    {
        id: "3",
        title: "Pengumuman PPKM",
        description: "Pengumuman terkait PPKM di RW06 Rejowinangun",
        category: "Pengumuman",
        author: "Admin 1",
        date: "2021-10-02",
        readTime: "5 min",
        imageUrl: "/img/hero-background_1.png",
        link: "/news/3",
    },
    {
        id: "4",
        title: "Pembagian Sembako",
        description: "Pembagian sembako di RW06 Rejowinangun telah selesai dilakukan",
        category: "Sosial",
        author: "Admin 1",
        date: "2021-10-03",
        readTime: "5 min",
        imageUrl: "/img/hero-background_1.png",
        link: "/news/4",
    },
    {
        id: "5",
        title: "Pembangunan Jalan",
        description: "Pembangunan jalan di RW06 Rejowinangun telah selesai dilakukan",
        category: "Infrastruktur",
        author: "Admin 1",
        date: "2021-10-04",
        readTime: "5 min",
        imageUrl: "/img/hero-background_1.png",
        link: "/news/5",
    }
];

// Data anggota organisasi
export const ORGANIZATION_MEMBER: OrganizationMember[] = [
    { name: "Budi Santoso", position: "Ketua RW", imageUrl: "/icon/icon-transformed.png?height=100&width=100" },
    { name: "Siti Rahayu", position: "Wakil Ketua RW", imageUrl: "/icon/icon-transformed.png?height=100&width=100" },
    { name: "Ahmad Yani", position: "Sekretaris RW", imageUrl: "/icon/icon-transformed.png?height=100&width=100" },
    { name: "Dewi Lestari", position: "Bendahara RW", imageUrl: "/icon/icon-transformed.png?height=100&width=100" },
    { name: "Joko Widodo", position: "Ketua RT 01", imageUrl: "/icon/icon-transformed.png?height=100&width=100" },
    { name: "Mega Wati", position: "Ketua RT 02", imageUrl: "/icon/icon-transformed.png?height=100&width=100" },
    // Tambahkan anggota lainnya sesuai kebutuhan
];

// Data UMKM
export const UMKM_ITEMS: UMKMItem[] = [
    {
        id: 'rt-17', title: 'UMKM RT 17',
        items: [
            { id: '1', label: 'Pisang Keju Bu Petra', description: 'Pisang keju di RT 17', link: '/umkm/rt-17/1' },
            { id: '2', label: 'Sate Bu Sarikan', description: 'Sate di RT 17', link: '/umkm/rt-17/2' },
            { id: '3', label: 'Angkringan Bu Amir', description: 'Angkringan di RT 17', link: '/umkm/rt-17/3' },
            { id: '4', label: 'Roti Bu Sarman', description: 'Roti di RT 17', link: '/umkm/rt-17/4' },
            { id: '5', label: 'Gorengan Bu Sumiarsih', description: 'Gorengan di RT 17', link: '/umkm/rt-17/5' },
            { id: '6', label: 'Es Klamud Bu Yuni', description: 'Es klamud di RT 17', link: '/umkm/rt-17/6' },
            { id: '7', label: 'Es Teler Bu Wiwik', description: 'Es teler di RT 17', link: '/umkm/rt-17/7' },
            { id: '8', label: 'Pentol Bu Hasan', description: 'Pentol di RT 17', link: '/umkm/rt-17/8' },
            { id: '9', label: 'Dimsum Bu Edison', description: 'Dimsum di RT 17', link: '/umkm/rt-17/9' }
        ]
    },
    {
        id: 'rt-18', title: 'UMKM RT 18',
        items: [
            { id: '1', label: 'Makanan Bu Supartini', description: 'Makanan di RT 18', link: '/umkm/rt-18/1' },
            { id: '2', label: 'Makanan Bu Sukardi', description: 'Makanan di RT 18', link: '/umkm/rt-18/2' },
            { id: '3', label: 'Tailor Bu Wakirun', description: 'Tailor di RT 18', link: '/umkm/rt-18/3' },
            { id: '4', label: 'Tanaman Hias Bp. Cipto Nugroho', description: 'Tanaman hias di RT 18', link: '/umkm/rt-18/4' },
            { id: '5', label: 'Petshop Bp. Defri', description: 'Petshop di RT 18', link: '/umkm/rt-18/5' },
            { id: '6', label: 'Pot Tanaman Ibu Nanang', description: 'Pot tanaman di RT 18', link: '/umkm/rt-18/6' },
            { id: '7', label: 'Pot Tanaman Mbah Warsomo', description: 'Pot tanaman di RT 18', link: '/umkm/rt-18/7' },
            { id: '8', label: 'Pot Media Tanam Bp. Bagiyo', description: 'Pot media tanam di RT 18', link: '/umkm/rt-18/8' },
            { id: '9', label: 'Kios Sembako Bp. Parwoto', description: 'Kios sembako di RT 18', link: '/umkm/rt-18/9' },
            { id: '10', label: 'Kios Frozen Food Bp. Dika', description: 'Kios frozen food di RT 18', link: '/umkm/rt-18/10' },
            { id: '11', label: 'Kios Sapatu Samba Dani', description: 'Kios sapatu samba di RT 18', link: '/umkm/rt-18/11' },
            { id: '12', label: 'Tanaman Hias Bp. Suhardi', description: 'Tanaman hias di RT 18', link: '/umkm/rt-18/12' },
            { id: '13', label: 'Tanaman Hias Sdr. Hari', description: 'Tanaman hias di RT 18', link: '/umkm/rt-18/13' },
            { id: '14', label: 'Warung Kelontong Ibu Wit', description: 'Warung kelontong di RT 18', link: '/umkm/rt-18/14' },
            { id: '15', label: 'Kuliner Jenang Ibu Dewi', description: 'Kuliner jenang di RT 18', link: '/umkm/rt-18/15' },
            { id: '16', label: 'Tanaman Hias Bp. Sugeng', description: 'Tanaman hias di RT 18', link: '/umkm/rt-18/16' },
            { id: '17', label: 'Katering Ibu Elly', description: 'Katering di RT 18', link: '/umkm/rt-18/17' },
            { id: '18', label: 'Warung dan Katering Ibu Ning', description: 'Warung dan katering di RT 18', link: '/umkm/rt-18/18' },
            { id: '19', label: 'Angkringan Bp. Supri', description: 'Angkringan di RT 18', link: '/umkm/rt-18/19' },
            { id: '20', label: 'Kuliner Bakso Penthol Ibu Jito', description: 'Kuliner bakso penthol di RT 18', link: '/umkm/rt-18/20' },
            { id: '21', label: 'Topi Bp. Jito', description: 'Topi di RT 18', link: '/umkm/rt-18/21' },
            { id: '22', label: 'Es Degan Ibu Sular', description: 'Es degan di RT 18', link: '/umkm/rt-18/22' },
            { id: '23', label: 'Warung Makanan Ibu Atik', description: 'Warung makanan di RT 18', link: '/umkm/rt-18/23' },
            { id: '24', label: 'Kios Camilan Ibu Sutanto', description: 'Kios camilan di RT 18', link: '/umkm/rt-18/24' },
            { id: '25', label: 'Lele Kunsumsi Ibu Panji', description: 'Lele kunsumsi di RT 18', link: '/umkm/rt-18/25' },
            { id: '26', label: 'Klinik Akupungtur Ibu Fitri', description: 'Klinik akupungtur di RT 18', link: '/umkm/rt-18/26' },
            { id: '27', label: 'Kedai Kopi Bp. Bintang', description: 'Kedai kopi di RT 18', link: '/umkm/rt-18/27' }
        ]
    },
    {
        id: 'rt-19', title: 'UMKM RT 19',
        items: [
            { id: '1', label: 'Abon Annisa Pak Istari', description: 'Abon di RT 19', link: '/umkm/rt-19/1' },
            { id: '2', label: 'Warung Makan Pagi Bu Missing#1', description: 'Warung makan pagi di RT 19', link: '/umkm/rt-19/2' },
            { id: '3', label: 'Angkringan Mba Yayuk Bu Yayuk', description: 'Angkringan di RT 19', link: '/umkm/rt-19/3' },
            { id: '4', label: 'Angkringan Nur Rokhim Bu Missing#2', description: 'Angkringan di RT 19', link: '/umkm/rt-19/4' },
            { id: '5', label: 'Ayam Sayur Mba Waginem', description: 'Ayam sayur di RT 19', link: '/umkm/rt-19/5' },
            { id: '6', label: 'Burjo Kacang Ijo Bu Missing#3', description: 'Burjo kacang ijo di RT 19', link: '/umkm/rt-19/6' },
            { id: '7', label: 'Percetakan Bu Missing#4', description: 'Percetakan di RT 19', link: '/umkm/rt-19/7' },
            { id: '8', label: 'Warung Makan Pagi Mba Menik', description: 'Warung makan pagi di RT 19', link: '/umkm/rt-19/8' },
            { id: '9', label: 'Snack Mba Surti', description: 'Snack di RT 19', link: '/umkm/rt-19/9' },
            { id: '10', label: 'Jajanan Pasar Pagi Mba Aan', description: 'Jajanan pasar pagi di RT 19', link: '/umkm/rt-19/10' },
            { id: '11', label: 'Konveksi Bu Kasmini Sanusi', description: 'Konveksi di RT 19', link: '/umkm/rt-19/11' }
        ]
    },
    {
        id: 'rt-20', title: 'UMKM RT 20',
        items: [
            { id: '1', label: 'Bakpao Megajaya Ibu Veni', description: 'Bakpao di RT 20', link: '/umkm/rt-20/1' },
            { id: '2', label: 'Fiber Ibu Srijadi', description: 'Fiber di RT 20', link: '/umkm/rt-20/2' },
            { id: '3', label: 'Fiber Ibu Mintarso', description: 'Fiber di RT 20', link: '/umkm/rt-20/3' },
            { id: '4', label: 'Snack Jajan Pasar Ibu Alex', description: 'Snack jajan pasar di RT 20', link: '/umkm/rt-20/4' },
            { id: '5', label: 'Donat Ibu Retno', description: 'Donat di RT 20', link: '/umkm/rt-20/5' }
        ]
    }
];

// Define the number of items per page for pagination
export const ITEMS_PER_PAGE = 10;

// Define the footer props
export const FOOTER_PROPS = [
    {
        title: "TENTANG KAMI",
        links: [
            { label: "Profil", href: "/about" },
            { label: "Struktur Organisasi", href: "/organization" },
        ]
    },
    {
        title: "INFORMASI",
        links: [
            { label: "Galeri", href: "/gallery" },
            { label: "UMKM", href: "/umkm" },
            { label: "Berita", href: "/news" },
        ]
    },
    {
        title: "LAINNYA",
        links: [
            { label: "Hubungi Kami", href: "/contact" },
        ]
    }
];

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nama harus minimal 2 karakter.",
    }),
    subject: z.string().min(2, {
        message: "Perihal harus minimal 2 karakter.",
    }),
    message: z.string().min(10, {
        message: "Pesan harus minimal 10 karakter.",
    }),
    contactMethod: z.enum(["email", "whatsapp"], {
        required_error: "Silakan pilih metode kontak.",
    }),
});
