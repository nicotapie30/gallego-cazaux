import type { SanityImageSource } from '@sanity/image-url';

export interface SanityImage {
  _key?: string;
  asset: SanityImageSource;
  alt?: string;
}

export interface SanityVideo {
  _key: string;
  url: string;
}

export interface Property {
  _id: string;
  title: string;
  slug: { current: string };
  operation: 'venta' | 'alquiler';
  propertyType: 'casa' | 'departamento' | 'local' | 'terreno' | 'ph' | 'otro';
  price: number | null;
  currency: string;
  address: string;
  city: string;
  province: string;
  description: string;
  features: {
    bedrooms?: number;
    bathrooms?: number;
    coveredArea?: number;
    totalArea?: number;
    garage?: boolean;
    pool?: boolean;
    garden?: boolean;
    amenities?: string[];
  };
  images: SanityImage[];
  videos?: SanityVideo[];
  isFeatured: boolean;
  priceOnRequest?: boolean;
  priceNotes?: string;
  status: 'disponible' | 'reservado' | 'vendido';
  publishedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content: string;
  publishedAt: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: 'compra' | 'alquiler' | 'general';
}

export interface PropertyFilters {
  operation?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
  search?: string;
}
