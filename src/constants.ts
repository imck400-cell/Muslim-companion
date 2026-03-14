
import { Category, ContentItem, Theme } from './types';

export const THEMES: Theme[] = [
  { id: 'modern-emerald', name: 'زمردي عصري', primary: '#10b981', secondary: '#059669', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', cardGradient: 'linear-gradient(to bottom right, #10b981, #059669)', accent: '#34d399' },
  { id: 'royal-blue', name: 'أزرق ملكي', primary: '#2563eb', secondary: '#1e40af', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', cardGradient: 'linear-gradient(to bottom right, #2563eb, #1e40af)', accent: '#60a5fa' },
  { id: 'deep-purple', name: 'بنفسجي عميق', primary: '#7c3aed', secondary: '#5b21b6', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', cardGradient: 'linear-gradient(to bottom right, #7c3aed, #5b21b6)', accent: '#a78bfa' },
  { id: 'sunset-orange', name: 'برتقالي الغروب', primary: '#f97316', secondary: '#c2410c', background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', cardGradient: 'linear-gradient(to bottom right, #f97316, #c2410c)', accent: '#fb923c' },
  { id: 'rose-pink', name: 'وردي ناعم', primary: '#db2777', secondary: '#9d174d', background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)', cardGradient: 'linear-gradient(to bottom right, #db2777, #9d174d)', accent: '#f472b6' },
  { id: 'ocean-teal', name: 'تيل المحيط', primary: '#0d9488', secondary: '#0f766e', background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', cardGradient: 'linear-gradient(to bottom right, #0d9488, #0f766e)', accent: '#2dd4bf' },
  { id: 'slate-gray', name: 'رمادي صخري', primary: '#475569', secondary: '#1e293b', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', cardGradient: 'linear-gradient(to bottom right, #475569, #1e293b)', accent: '#94a3b8' },
  { id: 'golden-sand', name: 'رمل ذهبي', primary: '#d97706', secondary: '#92400e', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', cardGradient: 'linear-gradient(to bottom right, #d97706, #92400e)', accent: '#fbbf24' },
  { id: 'midnight-dark', name: 'ليل داكن', primary: '#1e293b', secondary: '#0f172a', background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', cardGradient: 'linear-gradient(to bottom right, #334155, #1e293b)', accent: '#38bdf8' },
  { id: 'lavender-mist', name: 'ضباب اللافندر', primary: '#8b5cf6', secondary: '#6d28d9', background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', cardGradient: 'linear-gradient(to bottom right, #8b5cf6, #6d28d9)', accent: '#c084fc' },
  { id: 'forest-green', name: 'أخضر الغابة', primary: '#166534', secondary: '#14532d', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', cardGradient: 'linear-gradient(to bottom right, #166534, #14532d)', accent: '#4ade80' },
  { id: 'crimson-red', name: 'أحمر قرمزي', primary: '#dc2626', secondary: '#991b1b', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', cardGradient: 'linear-gradient(to bottom right, #dc2626, #991b1b)', accent: '#f87171' },
  { id: 'sky-blue', name: 'أزرق السماوي', primary: '#0ea5e9', secondary: '#0369a1', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', cardGradient: 'linear-gradient(to bottom right, #0ea5e9, #0369a1)', accent: '#7dd3fc' },
  { id: 'amber-glow', name: 'وهج العنبر', primary: '#f59e0b', secondary: '#b45309', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', cardGradient: 'linear-gradient(to bottom right, #f59e0b, #b45309)', accent: '#fbbf24' },
  { id: 'indigo-night', name: 'ليل نيلي', primary: '#4f46e5', secondary: '#3730a3', background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', cardGradient: 'linear-gradient(to bottom right, #4f46e5, #3730a3)', accent: '#818cf8' },
  { id: 'mint-fresh', name: 'نعناع منعش', primary: '#10b981', secondary: '#047857', background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', cardGradient: 'linear-gradient(to bottom right, #10b981, #047857)', accent: '#6ee7b7' },
  { id: 'violet-dream', name: 'حلم البنفسج', primary: '#a855f7', secondary: '#7e22ce', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', cardGradient: 'linear-gradient(to bottom right, #a855f7, #7e22ce)', accent: '#d8b4fe' },
  { id: 'cherry-blossom', name: 'زهر الكرز', primary: '#f43f5e', secondary: '#be123c', background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)', cardGradient: 'linear-gradient(to bottom right, #f43f5e, #be123c)', accent: '#fb7185' },
  { id: 'sandstone', name: 'حجر رملي', primary: '#a16207', secondary: '#713f12', background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)', cardGradient: 'linear-gradient(to bottom right, #a16207, #713f12)', accent: '#eab308' },
  { id: 'platinum-silver', name: 'بلاتيني فضي', primary: '#64748b', secondary: '#334155', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', cardGradient: 'linear-gradient(to bottom right, #94a3b8, #64748b)', accent: '#cbd5e1' },
];

export const LOGIN_PHRASE = "اللهم اغفر لمن شارك في هذا العمل وارض عنه ووالديه وعن أهله وولده وجميع المسلمين.";
export const WELCOME_MESSAGE = "نسعد كثيرا بخدمتكم وتقريب الخير بين أيديكم، ونرجو منكم دعوة خالصة لي ولأبي وأمي وزوجي وأولادي وجميع المسلمين.";
export const FOOTER_INFO = "إعداد طالب رضا الرحمن إبراهيم دُخَّان. للتواصل عبر الرقم 967780804012";
export const CONTACT_PHONE = "967780804012";
export const WHATSAPP_LINK = "https://wa.me/967780804012";

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-default', name: 'برامج نافعة لك', parentId: null, color: '#10b981' },
];

export const VIBRANT_COLORS = [
  '#f43f5e', // Rose
  '#8b5cf6', // Violet
  '#0ea5e9', // Sky
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#84cc16', // Lime
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
  {
    id: 'item-7',
    title: 'رفيقك مع المستندات',
    type: 'link',
    url: 'https://ai.studio/apps/7dcf1197-e94d-4a44-bdc9-e1c38dbdcb1f',
    color: '#8b5cf6',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
  },
];
