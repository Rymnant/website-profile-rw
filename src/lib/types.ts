// Definition of types used in the website-profile-rw project

// Define the navigation items
export type NavItem = {
  label: string;
  link: string;
  description?: string;
};

export type HeaderNavItem = {
  label: string;
  link?: string;
  dropdown?: NavItem[];
};

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

// Define the news article props
export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  author: string;
  date: Date;
  imageUrl: string;
};

// Define the footer props
export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

// Define the contact form values
export type ContactFormValues = {
  name: string;
  subject: string;
  message: string;
  contactMethod: "email" | "whatsapp";
};

// Define the gallery item
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Define the organization member
export type OrganizationMember = {
  name: string;
  position: string;
  imageUrl?: string;
};

// Define the UMKM item
export type UMKM = {
  id: string;
  label: string;
  category: string;
  description: string;
  link?: string;
};

export type UMKMItem = {
  id: string;
  title: string;
  items?: UMKM[];
};

// Define the pagination props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

// Define the form values
export interface FormValues {
  [key: string]: string | number | boolean;
}