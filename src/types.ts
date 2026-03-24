
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
  uid?: string;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null; // null for main categories
  color: string;
  uid?: string;
}

export interface CarouselItem {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  cardGradient: string;
  accent: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: number;
  uid?: string;
}

export type TaskStatus = 'none' | 'in-progress' | 'completed' | 'not-completed';

export interface Task {
  id: string;
  title: string;
  date: string;
  status: TaskStatus;
  showInCarousel: boolean;
  createdAt: number;
  uid?: string;
}

export interface AppSettings {
  language: 'ar' | 'en';
  themeId: string;
  carouselItems: CarouselItem[];
  carouselSpeed: number; // Duration in seconds for one full cycle
  uid?: string;
}
