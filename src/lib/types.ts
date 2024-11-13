// Definition of types used in the website-profile-rw project

// Define the navigation items
export interface NavItem {
  label: string
  link: string
}

// Define the hero section props
export interface HeroSectionProps {
  title?: string
  subtitle?: string
  tagline?: string
  buttonText?: string
  buttonHref?: string
  imageUrl?: string
}

// Define the information section props
export interface InformationSectionProps {
  title: string
  description: string
  href: string
}

// Define the map props
export interface MapMarker {
  id: number
  longitude: number
  latitude: number
  title: string
}

export interface MapConfig {
  style: string
  center: [number, number]
  zoom: number
}

// Define the news item props
export interface NewsItem {
  id: string
  date: string
  title: string
  excerpt: string
  imageUrl: string
  href: string
}

// Define the footer props
export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}