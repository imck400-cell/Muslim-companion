
export type ItemType = 'link' | 'pdf';

export interface ContentItem {
  id: string;
  title: string;
  type: ItemType;
  url: string; // For PDF, this might be a base64 string or a local blob URL
  color: string;
  categoryId: string;
  createdAt: number;
  isFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null; // null for main categories
  color: string;
}

export interface CarouselItem {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface AppSettings {
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  carouselItems: CarouselItem[];
}
