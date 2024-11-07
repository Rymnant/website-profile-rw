import { Article } from './types'
import { getRandomInt, getRandomItem } from '@/lib/utils'

const GALLERY_PER_PAGE = 6;
const ORGANIZATION_MEMBER_PER_PAGE = 8;
const ARTICLES_PER_PAGE = 500; 


// Generate random navigation items
export const NAV_ITEMS = [
    { label: 'Beranda', link: '/' },
    { label: 'Tentang Kami', link: '/about' },
    { label: 'Informasi', link: '/information' },
    { label: 'Berita', link: '/news' },
    { label: 'Galeri', link: '/gallery' },
    { label: 'Hubungi Kami', link: '/contact' }
];

// Generate random population stats
export const POPULATION_STATS = () => [
    { label: 'Penduduk', value: getRandomInt(1000, 2000) },
    { label: 'Kepala Keluarga', value: getRandomInt(200, 500) },
    { label: 'Laki-Laki', value: getRandomInt(500, 1000) },
    { label: 'Perempuan', value: getRandomInt(500, 1000) }
];

// Generate random gallery images
export const GALLERY_IMAGES = () => {
    const images = [];
    for (let i = 1; i <= GALLERY_PER_PAGE; i++) {
        images.push({ src: `/img/hero-background_1.png`, alt: `Kegiatan-${i}` });
    }
    return images;
};

// Generate random organization members
export const ORGANIZATION_MEMBERS = () => {
    const roles = ['Role_1', 'Role_2', 'Role_3', 'Role_4'];
    const members = [];
    for (let i = 1; i <= ORGANIZATION_MEMBER_PER_PAGE; i++) {
        members.push({ name: `Name_${i}`, role: getRandomItem(roles), image: '/icon/member.png' });
    }
    return members;
};

// Generate random articles
export const ARTICLES = (): Article[] => {
    const articles = [];
    for (let i = 1; i <= ARTICLES_PER_PAGE; i++) {
        articles.push({
            id: `${i}`,
            title: `Article ${i}`,
            excerpt: `This is article number ${i}.`,
            imageUrl: `/img/hero-background_1.png`,
            viewCount: getRandomInt(100, 1000),
            administrator: `Admin ${i}`,
            date: `2023-0${i}-01`,
            slug: `article-${i}`
        });
    }
    return articles;
};