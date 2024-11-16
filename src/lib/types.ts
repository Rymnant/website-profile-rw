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

export type ContactFormValues = {
  name: string;
  subject: string;
  message: string;
  contactMethod: "email" | "whatsapp";
};