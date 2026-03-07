
import { Category, ContentItem } from './types';

export const LOGIN_PHRASE = "اللهم اغفر لمن شارك في هذا العمل وارض عنه ووالديه وعن أهله وولده وجميع المسلمين.";
export const WELCOME_MESSAGE = "نسعد كثيرا بخدمتكم وتقريب الخير بين أيديكم، ونرجو منكم دعوة خالصة لي ولأبي وأمي وزوجي وأولادي وجميع المسلمين.";
export const FOOTER_INFO = "إعداد طالب رضا الرحمن إبراهيم دُخَّان. للتواصل عبر الرقم 967780804012";
export const CONTACT_PHONE = "967780804012";
export const WHATSAPP_LINK = "https://wa.me/967780804012";

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-default', name: 'الروابط الافتراضية', parentId: null, color: '#10b981' },
];

export const DEFAULT_ITEMS: ContentItem[] = [
  {
    id: 'item-1',
    title: 'رفيقك مع كتاب الله',
    type: 'link',
    url: 'https://ai.studio/apps/62dd01fb-eb02-4760-b885-5d8306d22b95',
    color: '#059669',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
  },
  {
    id: 'item-2',
    title: 'رفيقك في البحث عن الأحاديث النبوية',
    type: 'link',
    url: 'https://hadeeth-1-2-d1mc.vercel.app/',
    color: '#0891b2',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
  },
  {
    id: 'item-3',
    title: 'رفيقك في الأسئلة والاستفسارات الفقهية',
    type: 'link',
    url: 'https://ai.studio/apps/7a09b0cd-74af-42df-8dc1-65ae1579f542',
    color: '#7c3aed',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
  },
  {
    id: 'item-4',
    title: 'رفيق المعلم الذكي',
    type: 'link',
    url: 'https://smart-teacher-companion1-5-xdpu.vercel.app/',
    color: '#db2777',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
  },
  {
    id: 'item-5',
    title: 'رفيقك في إنشاء الأوامر',
    type: 'link',
    url: 'https://prompt-generation1-3.vercel.app',
    color: '#ea580c',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
  },
  {
    id: 'item-6',
    title: 'رفيقك في أدوات الذكاء الاصطناعي',
    type: 'link',
    url: 'https://artificial-intelligence-tools.vercel.app',
    color: '#2563eb',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
  },
];
