
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
  { id: 'cat-useful-sites', name: 'مواقع وبرامج تحتاجها كثيرا', parentId: null, color: '#f43f5e' },
  { id: 'cat-programming', name: 'روابط برمجية', parentId: 'cat-useful-sites', color: '#3b82f6' },
  { id: 'cat-tafsir', name: 'تفسير القرآن الكريم', parentId: 'cat-useful-sites', color: '#8b5cf6' },
  { id: 'cat-hadith', name: 'الحديث النبوي', parentId: 'cat-useful-sites', color: '#f59e0b' },
  { id: 'cat-fiqh', name: 'الفقه المعتمد في الفتوى', parentId: 'cat-useful-sites', color: '#ef4444' },
  { id: 'cat-admin', name: 'المواقع الإدارية (الهيئات الرسمية)', parentId: 'cat-useful-sites', color: '#ec4899' },
  { id: 'cat-edu', name: 'التعليم الشرعي المجاني', parentId: 'cat-useful-sites', color: '#14b8a6' },
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
  {
    id: 'item-8',
    title: 'رفيقك اليومي',
    type: 'link',
    url: 'https://ai.studio/apps/9a4e818a-16ee-43ed-836c-96d4565d6a47',
    color: '#10b981',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
    openInNewTab: true,
  },
  {
    id: 'item-9',
    title: 'رفيق الداعية',
    type: 'link',
    url: 'https://ai.studio/apps/fc5a3ee1-f9f2-4fbc-b642-ba1456ef6608',
    color: '#f59e0b',
    categoryId: 'cat-default',
    createdAt: Date.now(),
    isFavorite: false,
    openInNewTab: true,
  },
  // Programming Links
  { id: 'item-10', title: 'جيمني', type: 'link', url: 'https://gemini.google.com', color: '#f43f5e', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-11', title: 'ديب سيك', type: 'link', url: 'https://deepseek.com', color: '#8b5cf6', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-12', title: 'بربلكستي', type: 'link', url: 'https://www.perplexity.ai', color: '#0ea5e9', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-13', title: 'شات جي بي تي', type: 'link', url: 'https://chat.openai.com', color: '#10b981', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-14', title: 'نوت بوك (NotebookLM)', type: 'link', url: 'https://notebooklm.google.com', color: '#f59e0b', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-15', title: 'قوقل إيه آي استوديو', type: 'link', url: 'https://aistudio.google.com', color: '#ec4899', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-16', title: 'كاب كات', type: 'link', url: 'https://www.capcut.com', color: '#ef4444', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-17', title: 'برنامج يب', type: 'link', url: 'https://yupp.ai', color: '#3b82f6', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-18', title: 'بي دي إف 24', type: 'link', url: 'https://www.pdf24.org', color: '#6366f1', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-19', title: 'تحسين الأوامر (GeneratePrompt)', type: 'link', url: 'https://generateprompt.ai', color: '#14b8a6', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-20', title: 'برنامج فيرسل', type: 'link', url: 'https://vercel.com', color: '#f97316', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-21', title: 'ترجمة قوقل', type: 'link', url: 'https://translate.google.com', color: '#84cc16', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-22', title: 'مكتبة نور', type: 'link', url: 'https://www.noor-book.com', color: '#f43f5e', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-23', title: 'يوتيوب', type: 'link', url: 'https://www.youtube.com', color: '#ef4444', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-24', title: 'فيس بوك', type: 'link', url: 'https://www.facebook.com', color: '#3b82f6', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-25', title: 'واتساب', type: 'link', url: 'https://www.whatsapp.com', color: '#10b981', categoryId: 'cat-programming', createdAt: Date.now(), isFavorite: false, openInNewTab: true },

  // Tafsir
  { id: 'item-26', title: 'التفسير (Tafsir)', type: 'link', url: 'https://www.altafsir.com', color: '#8b5cf6', categoryId: 'cat-tafsir', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-27', title: 'الباحث القرآني', type: 'link', url: 'https://tafsir.app', color: '#0ea5e9', categoryId: 'cat-tafsir', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-28', title: 'مشروع المصحف الإلكتروني', type: 'link', url: 'https://quran.ksu.edu.sa', color: '#10b981', categoryId: 'cat-tafsir', createdAt: Date.now(), isFavorite: false, openInNewTab: true },

  // Hadith
  { id: 'item-29', title: 'الدرر السنية', type: 'link', url: 'https://dorar.net', color: '#f59e0b', categoryId: 'cat-hadith', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-30', title: 'إسلام ويب – الموسوعة الحديثية', type: 'link', url: 'https://library.islamweb.net/hadith', color: '#ec4899', categoryId: 'cat-hadith', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-31', title: 'موسوعة الحديث (إسلام أون لاين)', type: 'link', url: 'https://hadith.islamonline.net', color: '#ef4444', categoryId: 'cat-hadith', createdAt: Date.now(), isFavorite: false, openInNewTab: true },

  // Fiqh
  { id: 'item-32', title: 'إسلام ويب – مركز الفتوى', type: 'link', url: 'https://www.islamweb.net/ar/fatwa/', color: '#3b82f6', categoryId: 'cat-fiqh', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-33', title: 'الإسلام سؤال وجواب', type: 'link', url: 'https://islamqa.info/ar', color: '#6366f1', categoryId: 'cat-fiqh', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-34', title: 'دار الإفتاء المصرية', type: 'link', url: 'https://www.dar-alifta.org', color: '#14b8a6', categoryId: 'cat-fiqh', createdAt: Date.now(), isFavorite: false, openInNewTab: true },

  // Admin
  { id: 'item-35', title: 'وزارة الشؤون الإسلامية والدعوة والإرشاد', type: 'link', url: 'https://www.moriah.gov.sa', color: '#f97316', categoryId: 'cat-admin', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-36', title: 'الرئاسة العامة للبحوث العلمية والإفتاء', type: 'link', url: 'https://www.alifta.gov.sa', color: '#84cc16', categoryId: 'cat-admin', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-37', title: 'مجمع الفقه الإسلامي الدولي', type: 'link', url: 'https://www.iifa-aifi.org', color: '#f43f5e', categoryId: 'cat-admin', createdAt: Date.now(), isFavorite: false, openInNewTab: true },

  // Edu
  { id: 'item-38', title: 'أكاديمية SeekersGuidance', type: 'link', url: 'https://seekersguidance.org/ar', color: '#8b5cf6', categoryId: 'cat-edu', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-39', title: 'أكاديمية زاد (Zad Academy)', type: 'link', url: 'https://zadgroup.net', color: '#0ea5e9', categoryId: 'cat-edu', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
  { id: 'item-40', title: 'إسلام ويب – المكتبة العلمية والتعليمية', type: 'link', url: 'https://library.islamweb.net', color: '#10b981', categoryId: 'cat-edu', createdAt: Date.now(), isFavorite: false, openInNewTab: true },
];
