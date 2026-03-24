/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  History, 
  Heart, 
  Settings as SettingsIcon, 
  Plus, 
  Copy, 
  Check, 
  Phone, 
  MessageCircle, 
  ChevronLeft, 
  ChevronDown,
  ChevronUp,
  ExternalLink, 
  FileText,
  Trash2,
  Edit2,
  Menu,
  X,
  Languages,
  ArrowRight,
  Book,
  CheckSquare,
  Calendar,
  Save,
  Share2
} from 'lucide-react';
import { LOGIN_PHRASE, WELCOME_MESSAGE, FOOTER_INFO, CONTACT_PHONE, WHATSAPP_LINK, DEFAULT_CATEGORIES, DEFAULT_ITEMS, THEMES, VIBRANT_COLORS } from './constants';
import { Category, ContentItem, AppSettings, CarouselItem, Theme, Note, Task, TaskStatus } from './types';

// --- Components ---

const Login = ({ onLogin, theme }: { onLogin: () => void, theme: Theme }) => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(LOGIN_PHRASE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === LOGIN_PHRASE) {
      onLogin();
    } else {
      alert('العبارة غير صحيحة، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-slate-800" style={{ background: theme.background }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4" style={{ backgroundColor: theme.primary }}>
            <Home className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-2" style={{ color: theme.secondary }}>رفيق المسلم</h1>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {WELCOME_MESSAGE}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">عبارة الدخول</label>
          <div className="relative group">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed pr-12">
              {LOGIN_PHRASE}
            </div>
            <button 
              onClick={handleCopy}
              className="absolute top-2 left-2 p-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="الصق عبارة الدخول هنا..."
            className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-center"
          />
          <button 
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
          >
            دخول
          </button>
        </form>
      </motion.div>

      <footer className="mt-12 text-center max-w-md">
        <p className="text-xs text-slate-500 mb-4">{FOOTER_INFO}</p>
        <div className="flex gap-4 justify-center">
          <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <Phone className="w-3 h-3 text-emerald-600" />
            اتصال
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <MessageCircle className="w-3 h-3 text-emerald-600" />
            واتساب
          </a>
        </div>
      </footer>
    </div>
  );
};

const Carousel = ({ items, speed }: { items: CarouselItem[], speed: number }) => {
  if (!items || items.length === 0) return null;

  const colors = ['#f43f5e', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'];
  const duration = 130 - speed;

  // الحل النهائي: تكرار العناصر لضمان عرض أكبر من الشاشة
  let baseList = [...items];
  while (baseList.length < 15) {
    baseList = [...baseList, ...items];
  }

  return (
    <div className="w-full overflow-hidden bg-white/30 backdrop-blur-md py-0.5 border-t border-white/20 select-none" dir="rtl">
      <style>
        {`
          @keyframes marquee-rtl {
            0% { transform: translateX(0); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
      <div className="flex w-full">
        <div 
          className="flex shrink-0 gap-4 px-2"
          style={{ animation: `marquee-rtl ${duration}s linear infinite` }}
        >
          {baseList.map((item, idx) => (
            <div key={`a-${item.id}-${idx}`} className="flex items-center">
              <div 
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-xl shadow-md border-b overflow-hidden glow-border shrink-0"
                style={{ 
                  background: `linear-gradient(135deg, ${colors[idx % colors.length]} 0%, ${colors[idx % colors.length]}dd 100%)`,
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div 
                    className="absolute top-0 right-0 w-8 h-8 bg-white/10" 
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />
                </div>
                {item.imageUrl && <img src={item.imageUrl} alt="" className="w-5 h-5 rounded-lg object-cover relative z-10" />}
                <span className="text-[10px] font-bold relative z-10 drop-shadow-sm whitespace-nowrap">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div 
          className="flex shrink-0 gap-4 px-2"
          style={{ animation: `marquee-rtl ${duration}s linear infinite` }}
          aria-hidden="true"
        >
          {baseList.map((item, idx) => (
            <div key={`b-${item.id}-${idx}`} className="flex items-center">
              <div 
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-xl shadow-md border-b overflow-hidden glow-border shrink-0"
                style={{ 
                  background: `linear-gradient(135deg, ${colors[idx % colors.length]} 0%, ${colors[idx % colors.length]}dd 100%)`,
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div 
                    className="absolute top-0 right-0 w-8 h-8 bg-white/10" 
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />
                </div>
                {item.imageUrl && <img src={item.imageUrl} alt="" className="w-5 h-5 rounded-lg object-cover relative z-10" />}
                <span className="text-[10px] font-bold relative z-10 drop-shadow-sm whitespace-nowrap">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function ContentCard({ item, onClick, onToggleFavorite }: { item: ContentItem, onClick: () => void, onToggleFavorite: (id: string) => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative w-full p-3 rounded-xl text-right flex flex-col justify-center h-16 shadow-lg border-b-2 transition-all overflow-hidden group cursor-pointer mb-2 glow-border"
      style={{ 
        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`, 
        borderColor: 'rgba(255,255,255,0.2)',
        color: '#fff'
      }}
    >
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Triangle Shape */}
        <div 
          className="absolute top-0 right-0 w-16 h-16 bg-white/10" 
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
        {/* Circle Shape */}
        <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-center w-full relative z-10 gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md border border-white/20 shadow-inner shrink-0">
            {item.type === 'link' ? <ExternalLink className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </div>
          <h3 className="text-sm font-bold leading-tight drop-shadow-md font-display truncate">{item.title}</h3>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          className="p-1.5 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md border border-white/10 shrink-0"
        >
          <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [activeTab, setActiveTab] = useState<'home' | 'recent' | 'favorites' | 'settings'>('home');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [newItemType, setNewItemType] = useState<'link' | 'pdf'>('link');
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });
  const [items, setItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem('items');
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
  });
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentIds');
    return saved ? JSON.parse(saved) : [];
  });
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      language: 'ar',
      themeId: 'modern-emerald',
      carouselItems: [
        { id: '1', text: 'اللهم صل وسلم على نبينا محمد' },
        { id: '2', text: 'سبحان الله وبحمده سبحان الله العظيم' },
        { id: '3', text: 'أستغفر الله العظيم وأتوب إليه' },
        { id: '4', text: 'لا إله إلا الله وحده لا شريك له' },
        { id: '5', text: 'الحمد لله حمداً كثيراً طيباً مباركاً فيه' },
        { id: '6', text: 'لا حول ولا قوة إلا بالله العلي العظيم' },
        { id: '7', text: 'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم' },
        { id: '8', text: 'اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور' },
        { id: '9', text: 'رضيت بالله رباً وبالإسلام ديناً وبمحمد صلى الله عليه وسلم نبياً' },
        { id: '10', text: 'يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين' },
        { id: '11', text: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة' },
        { id: '12', text: 'سبحان الله والحمد لله ولا إله إلا الله والله أكبر' }
      ],
      carouselSpeed: 30
    };
  });

  const currentTheme = useMemo(() => THEMES.find(t => t.id === settings.themeId) || THEMES[0], [settings.themeId]);

  const [viewingItem, setViewingItem] = useState<ContentItem | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isThemesCollapsed, setIsThemesCollapsed] = useState(true);
  const [targetCategoryId, setTargetCategoryId] = useState<string>('cat-default');
  const [activeModule, setActiveModule] = useState<'none' | 'notebook' | 'tasks'>('none');

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('recentIds', JSON.stringify(recentIds));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [isLoggedIn, categories, items, recentIds, settings, notes, tasks]);

  // Migration: Update carousel items if they are the old defaults (only 3 items)
  useEffect(() => {
    if (settings.carouselItems.length === 3) {
      const newItems = [
        { id: '1', text: 'اللهم صل وسلم على نبينا محمد' },
        { id: '2', text: 'سبحان الله وبحمده سبحان الله العظيم' },
        { id: '3', text: 'أستغفر الله العظيم وأتوب إليه' },
        { id: '4', text: 'لا إله إلا الله وحده لا شريك له' },
        { id: '5', text: 'الحمد لله حمداً كثيراً طيباً مباركاً فيه' },
        { id: '6', text: 'لا حول ولا قوة إلا بالله العلي العظيم' },
        { id: '7', text: 'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم' },
        { id: '8', text: 'اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور' },
        { id: '9', text: 'رضيت بالله رباً وبالإسلام ديناً وبمحمد صلى الله عليه وسلم نبياً' },
        { id: '10', text: 'يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين' },
        { id: '11', text: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة' },
        { id: '12', text: 'سبحان الله والحمد لله ولا إله إلا الله والله أكبر' }
      ];
      setSettings(prev => ({ ...prev, carouselItems: newItems }));
    }
  }, []);

  // Migration: Update default category name
  useEffect(() => {
    setCategories(prev => prev.map(cat => 
      (cat.id === 'cat-default' && cat.name === 'الروابط الافتراضية') 
        ? { ...cat, name: 'برامج نافعة لك' } 
        : cat
    ));
  }, []);

  const allCarouselItems = useMemo(() => {
    const taskItems = tasks
      .filter(t => t.showInCarousel)
      .map(t => ({ id: t.id, text: `مهمة: ${t.title} - ${t.date}` }));
    return [...settings.carouselItems, ...taskItems];
  }, [settings.carouselItems, tasks]);

  const handleLogin = () => setIsLoggedIn(true);

  const handleItemClick = (item: ContentItem) => {
    setRecentIds(prev => [item.id, ...prev.filter(id => id !== item.id)].slice(0, 10));
    if (item.type === 'link' || item.url.startsWith('http') || item.url.startsWith('blob:') || item.url.startsWith('data:')) {
      window.open(item.url, '_blank');
    } else {
      // Try to handle local file paths or just open in new tab
      window.open(item.url, '_blank');
    }
  };

  const toggleFavorite = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'favorites') return items.filter(i => i.isFavorite);
    if (activeTab === 'recent') return recentIds.map(id => items.find(i => i.id === id)).filter(Boolean) as ContentItem[];
    if (activeTab === 'home') {
      if (!currentCategory) return []; // Don't show links on home screen, only categories
      return items.filter(i => i.categoryId === currentCategory);
    }
    return items;
  }, [activeTab, items, recentIds, currentCategory]);

  const activeCategories = useMemo(() => {
    return categories.filter(c => c.parentId === currentCategory);
  }, [categories, currentCategory]);

  if (!isLoggedIn) return <Login onLogin={handleLogin} theme={currentTheme} />;

  if (viewingItem) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewingItem(null)}
              className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              <ArrowRight className="w-6 h-6 text-slate-700" />
            </button>
            <h2 className="font-bold text-slate-800 truncate max-w-[150px] sm:max-w-xs">{viewingItem.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(viewingItem.url);
                alert('تم نسخ الرابط بنجاح');
              }}
              className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              title="نسخ الرابط"
            >
              <Copy className="w-5 h-5 text-slate-600" />
            </button>
            <button 
              onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe) iframe.src = iframe.src;
              }}
              className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              title="تحديث"
            >
              <History className="w-5 h-5 text-slate-600" />
            </button>
            <a 
              href={viewingItem.url} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-shadow shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>فتح في نافذة جديدة</span>
            </a>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative bg-slate-50">
          {viewingItem.type === 'link' ? (
            <div className="w-full h-full relative">
              <iframe 
                src={viewingItem.url} 
                className="w-full h-full border-none" 
                title={viewingItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; geolocation; microphone; camera"
                allowFullScreen
              />
              {/* Optional: Overlay message if iframe might be blocked */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-white/10">
                <p className="bg-black/60 text-white px-4 py-2 rounded-full text-xs">إذا لم يظهر المحتوى، اضغط على زر "فتح في نافذة جديدة" أعلاه</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-50 p-8 text-center">
              <div>
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">معاينة ملف PDF (سيتم فتحه في نافذة جديدة)</p>
                <a 
                  href={viewingItem.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-4 inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  فتح الملف
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white border-t border-slate-200">
          <Carousel items={allCarouselItems} speed={settings.carouselSpeed} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-32 transition-all duration-500" style={{ background: currentTheme.background }}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: currentTheme.primary }}>
            <Home className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-bold" style={{ color: currentTheme.secondary }}>رفيق المسلم</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('settings')}
            className="p-2 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md border border-white/10"
          >
            <SettingsIcon className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Breadcrumbs / Back button if in category */}
        {activeTab === 'home' && currentCategory && (
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => {
                const cat = categories.find(c => c.id === currentCategory);
                setCurrentCategory(cat?.parentId || null);
              }}
              className="flex items-center gap-2 text-slate-600 font-bold bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-sm"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة</span>
            </button>
            <h2 className="text-xl font-display font-bold" style={{ color: currentTheme.secondary }}>
              {categories.find(c => c.id === currentCategory)?.name}
            </h2>
          </div>
        )}

        {/* Special Modules Grid */}
        {activeTab === 'home' && !currentCategory && (
          <div className="grid grid-cols-1 gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModule('tasks')}
              className="relative w-full p-4 rounded-2xl text-center shadow-xl border-b-4 transition-all overflow-hidden glow-border bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border-indigo-900/20"
            >
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-white/10" />
              </div>
              <div className="flex items-center justify-center gap-3 relative z-10">
                <CheckSquare className="w-6 h-6" />
                <span className="font-display font-bold text-lg">المهام اليومية</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModule('notebook')}
              className="relative w-full p-4 rounded-2xl text-center shadow-xl border-b-4 transition-all overflow-hidden glow-border bg-gradient-to-br from-amber-500 to-amber-700 text-white border-amber-900/20"
            >
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-white/10" />
              </div>
              <div className="flex items-center justify-center gap-3 relative z-10">
                <Book className="w-6 h-6" />
                <span className="font-display font-bold text-lg">مفكرة المسلم</span>
              </div>
            </motion.button>
          </div>
        )}

        {/* Categories Grid */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 gap-3">
            {activeCategories.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentCategory(cat.id)}
                className="relative w-full p-4 rounded-2xl text-center shadow-xl border-b-4 transition-all overflow-hidden glow-border"
                style={{ backgroundColor: cat.color, color: '#fff', borderColor: 'rgba(0,0,0,0.2)' }}
              >
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  {/* Triangle Shape */}
                  <div 
                    className="absolute top-0 right-0 w-24 h-24 bg-white/10" 
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />
                  {/* Circle Shape */}
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-white/10" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                <span className="font-display font-bold text-lg relative z-10">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map(item => (
            <div key={item.id}>
              <ContentCard 
                item={item} 
                onClick={() => handleItemClick(item)} 
                onToggleFavorite={toggleFavorite}
              />
            </div>
          ))}
          {activeTab === 'home' && currentCategory && filteredItems.length === 0 && activeCategories.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white/20 backdrop-blur-md rounded-3xl border border-white/10">
              <Plus className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">لا يوجد محتوى في هذا القسم بعد...</p>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom UI */}
      <div className="fixed bottom-0 left-0 w-full z-40">
        <nav className="bg-white border-t border-slate-200 px-6 py-1.5 flex items-center justify-between">
          <button 
            onClick={() => { setActiveTab('home'); setCurrentCategory(null); }}
            className="flex flex-col items-center gap-0.5 transition-colors"
            style={{ color: activeTab === 'home' ? currentTheme.primary : '#94a3b8' }}
          >
            <Home className="w-5 h-5" />
            <span className="text-[8px] font-bold">الرئيسية</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('recent')}
            className="flex flex-col items-center gap-0.5 transition-colors"
            style={{ color: activeTab === 'recent' ? currentTheme.primary : '#94a3b8' }}
          >
            <History className="w-5 h-5" />
            <span className="text-[8px] font-bold">الأخيرة</span>
          </button>

          {/* Central Red FAB - Aligned with others */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuickAdd(true)}
              className="w-10 h-10 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center border-4 border-white"
              style={{ backgroundColor: showQuickAdd ? currentTheme.primary : '#dc2626' }}
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>

          <button 
            onClick={() => setActiveTab('favorites')}
            className="flex flex-col items-center gap-0.5 transition-colors"
            style={{ color: activeTab === 'favorites' ? currentTheme.primary : '#94a3b8' }}
          >
            <Heart className="w-5 h-5" />
            <span className="text-[8px] font-bold">المفضلة</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className="flex flex-col items-center gap-0.5 transition-colors"
            style={{ color: activeTab === 'settings' ? currentTheme.primary : '#94a3b8' }}
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-[8px] font-bold">الإعدادات</span>
          </button>
        </nav>
      </div>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {showQuickAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickAdd(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8"
            >
              <h2 className="text-xl font-bold mb-6 text-slate-800">إضافة سريعة</h2>
              <div className="space-y-4">
                <button 
                  onClick={() => { setShowQuickAdd(false); setActiveTab('settings'); }}
                  className="w-full p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold flex items-center justify-between"
                >
                  <span>إضافة رابط أو ملف</span>
                  <Plus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => { setShowQuickAdd(false); setActiveTab('settings'); }}
                  className="w-full p-4 bg-blue-50 text-blue-700 rounded-2xl font-bold flex items-center justify-between"
                >
                  <span>إنشاء قسم جديد</span>
                  <Plus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowQuickAdd(false)}
                  className="w-full p-4 bg-slate-100 text-slate-600 rounded-2xl font-bold"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal (Overlay) */}
      <AnimatePresence>
        {activeTab === 'settings' && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">الإعدادات وإدارة المحتوى</h2>
              <button 
                onClick={() => setActiveTab('home')}
                className="p-2 bg-slate-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Theme Selection */}
              <section className="bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-sm">
                <button 
                  onClick={() => setIsThemesCollapsed(!isThemesCollapsed)}
                  className="w-full flex items-center justify-between mb-2"
                >
                  <h3 className="text-lg font-display font-bold flex items-center gap-2">
                    <Languages className="w-5 h-5" style={{ color: currentTheme.primary }} />
                    مظهر البرنامج (الثيمات)
                  </h3>
                  {isThemesCollapsed ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronUp className="w-5 h-5 text-slate-400" />}
                </button>
                
                <AnimatePresence>
                  {!isThemesCollapsed && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                        {THEMES.map(theme => (
                          <button
                            key={theme.id}
                            onClick={() => setSettings(s => ({ ...s, themeId: theme.id }))}
                            className={`p-3 rounded-2xl border-2 transition-all text-center ${settings.themeId === theme.id ? 'border-emerald-500 shadow-lg scale-105' : 'border-slate-100'}`}
                            style={{ background: theme.background }}
                          >
                            <div className="w-8 h-8 rounded-full mx-auto mb-2 shadow-inner" style={{ backgroundColor: theme.primary }} />
                            <span className="text-[10px] font-bold text-slate-700">{theme.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* Carousel Management */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-emerald-600" />
                    شريط الإعلانات
                  </h3>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full border">
                    <span className="text-[10px] font-bold text-slate-500">السرعة:</span>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      step="5"
                      value={settings.carouselSpeed}
                      onChange={(e) => setSettings(s => ({ ...s, carouselSpeed: parseInt(e.target.value) }))}
                      className="w-20 accent-emerald-600"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  {settings.carouselItems.map(item => (
                    <div key={item.id} className="flex gap-2">
                      <input 
                        className="flex-1 p-3 bg-slate-50 border rounded-xl"
                        value={item.text}
                        onChange={(e) => {
                          setSettings(s => ({
                            ...s,
                            carouselItems: s.carouselItems.map(i => i.id === item.id ? { ...i, text: e.target.value } : i)
                          }));
                        }}
                      />
                      <button 
                        onClick={() => {
                          setSettings(s => ({
                            ...s,
                            carouselItems: s.carouselItems.filter(i => i.id !== item.id)
                          }));
                        }}
                        className="p-3 bg-red-50 text-red-600 rounded-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      setSettings(s => ({
                        ...s,
                        carouselItems: [...s.carouselItems, { id: Date.now().toString(), text: 'نص جديد' }]
                      }));
                    }}
                    className="w-full p-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold"
                  >
                    + إضافة إعلان
                  </button>
                </div>
              </section>

              {/* Content Management */}
              <section>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-600" />
                  إدارة الأقسام والمحتوى
                </h3>
                
                {/* Add Category Form */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                  <h4 className="text-sm font-bold mb-3 text-slate-700">إضافة قسم جديد</h4>
                  <div className="flex gap-2">
                    <input 
                      id="new-cat-name"
                      placeholder="اسم القسم..."
                      className="flex-1 p-2 bg-white border rounded-lg text-sm"
                    />
                    <button 
                      onClick={() => {
                        const name = (document.getElementById('new-cat-name') as HTMLInputElement).value;
                        if (!name) return;
                        const newCat: Category = {
                          id: Date.now().toString(),
                          name,
                          parentId: currentCategory,
                          color: '#' + Math.floor(Math.random()*16777215).toString(16)
                        };
                        setCategories([...categories, newCat]);
                        (document.getElementById('new-cat-name') as HTMLInputElement).value = '';
                      }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold"
                    >
                      إضافة
                    </button>
                  </div>
                </div>

                {/* Add Item Form */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                  <h4 className="text-sm font-bold mb-3 text-slate-700">إضافة رابط / ملف جديد</h4>
                  <div className="space-y-3">
                    <input id="new-item-title" placeholder="العنوان..." className="w-full p-2 bg-white border rounded-lg text-sm" />
                    
                    <div className="flex gap-2">
                      <select 
                        id="new-item-type" 
                        value={newItemType}
                        onChange={(e) => setNewItemType(e.target.value as 'link' | 'pdf')}
                        className="flex-1 p-2 bg-white border rounded-lg text-sm"
                      >
                        <option value="link">رابط ويب</option>
                        <option value="pdf">ملف PDF</option>
                      </select>

                      <select 
                        value={targetCategoryId}
                        onChange={(e) => setTargetCategoryId(e.target.value)}
                        className="flex-1 p-2 bg-white border rounded-lg text-sm"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    {newItemType === 'link' ? (
                      <input id="new-item-url" placeholder="الرابط (URL)..." className="w-full p-2 bg-white border rounded-lg text-sm" />
                    ) : (
                      <div className="flex gap-2">
                        <input id="new-item-url" placeholder="مسار الملف المختار..." className="flex-1 p-2 bg-white border rounded-lg text-sm" />
                        <label className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold cursor-pointer hover:bg-emerald-200 transition-colors flex items-center">
                          <span>تصفح</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // In a real app we'd use File System Access API or store a blob
                                // For this request, we'll store the blob URL which works for the session
                                const blobUrl = URL.createObjectURL(file);
                                (document.getElementById('new-item-url') as HTMLInputElement).value = blobUrl;
                                if (!(document.getElementById('new-item-title') as HTMLInputElement).value) {
                                  (document.getElementById('new-item-title') as HTMLInputElement).value = file.name;
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    )}

                    <button 
                      onClick={async () => {
                        const title = (document.getElementById('new-item-title') as HTMLInputElement).value;
                        const url = (document.getElementById('new-item-url') as HTMLInputElement).value;
                        
                        if (!title || !url) {
                          alert('يرجى إدخال العنوان والرابط');
                          return;
                        }

                        const newItem: ContentItem = {
                          id: Date.now().toString(),
                          title,
                          url,
                          type: newItemType,
                          color: VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)],
                          categoryId: targetCategoryId,
                          createdAt: Date.now(),
                          isFavorite: false
                        };
                        setItems([...items, newItem]);
                        (document.getElementById('new-item-title') as HTMLInputElement).value = '';
                        (document.getElementById('new-item-url') as HTMLInputElement).value = '';
                        setSelectedPdfFile(null);
                      }}
                      className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg"
                    >
                      إضافة المحتوى
                    </button>
                  </div>
                </div>

                {/* List and Delete */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">المحتوى الحالي في هذا القسم</h4>
                  <div className="space-y-2">
                    {categories.filter(c => c.parentId === currentCategory).map(cat => (
                      <div key={cat.id} className="flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="font-bold text-slate-700">{cat.name} (قسم)</span>
                        </div>
                        <button 
                          onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {items.filter(i => i.categoryId === (currentCategory || 'cat-default')).map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm">
                        <div className="flex items-center gap-2">
                          {item.type === 'link' ? <ExternalLink className="w-4 h-4 text-slate-400" /> : <FileText className="w-4 h-4 text-slate-400" />}
                          <span className="text-sm text-slate-700">{item.title}</span>
                        </div>
                        <button 
                          onClick={() => setItems(items.filter(i => i.id !== item.id))}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Logout */}
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem('isLoggedIn');
                }}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl font-bold"
              >
                تسجيل الخروج
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Notebook Module */}
      <AnimatePresence>
        {activeModule === 'notebook' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-amber-800 flex items-center gap-2">
                <Book className="w-6 h-6" />
                مفكرة المسلم
              </h2>
              <button onClick={() => setActiveModule('none')} className="p-2 bg-slate-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 space-y-6">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <textarea 
                  id="note-content"
                  placeholder="اكتب أو الصق النص هنا..."
                  className="w-full h-40 bg-transparent border-none focus:ring-0 text-slate-700 font-medium resize-none"
                />
                <button 
                  onClick={() => {
                    const content = (document.getElementById('note-content') as HTMLTextAreaElement).value;
                    if (!content) return;
                    const newNote: Note = {
                      id: Date.now().toString(),
                      content,
                      createdAt: Date.now()
                    };
                    setNotes([newNote, ...notes]);
                    (document.getElementById('note-content') as HTMLTextAreaElement).value = '';
                  }}
                  className="w-full mt-4 py-3 bg-amber-600 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  حفظ في المفكرة
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs">الملاحظات المحفوظة</h3>
                {notes.map(note => (
                  <div key={note.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                      <span>{new Date(note.createdAt).toLocaleString('ar-EG')}</span>
                      <button onClick={() => setNotes(notes.filter(n => n.id !== note.id))} className="text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(note.content);
                        alert('تم نسخ النص');
                      }}
                      className="text-xs font-bold text-amber-600 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      نسخ النص
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks Module */}
      <AnimatePresence>
        {activeModule === 'tasks' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-indigo-800 flex items-center gap-2">
                <CheckSquare className="w-6 h-6" />
                المهام
              </h2>
              <button onClick={() => setActiveModule('none')} className="p-2 bg-slate-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 space-y-6">
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 space-y-4">
                <input 
                  id="task-title"
                  placeholder="ما هي المهمة؟"
                  className="w-full p-3 bg-white border border-indigo-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-indigo-100">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <input 
                    id="task-date"
                    type="date"
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-600"
                  />
                </div>
                <button 
                  onClick={() => {
                    const title = (document.getElementById('task-title') as HTMLInputElement).value;
                    const date = (document.getElementById('task-date') as HTMLInputElement).value;
                    if (!title || !date) return;
                    const newTask: Task = {
                      id: Date.now().toString(),
                      title,
                      date,
                      status: 'none',
                      showInCarousel: false,
                      createdAt: Date.now()
                    };
                    setTasks([newTask, ...tasks]);
                    (document.getElementById('task-title') as HTMLInputElement).value = '';
                    (document.getElementById('task-date') as HTMLInputElement).value = '';
                  }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg"
                >
                  إضافة المهمة
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-500 uppercase tracking-wider text-xs">قائمة المهام</h3>
                {tasks.map(task => (
                  <div key={task.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800">{task.title}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{task.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setTasks(tasks.map(t => t.id === task.id ? { ...t, showInCarousel: !t.showInCarousel } : t));
                          }}
                          className={`p-2 rounded-lg transition-colors ${task.showInCarousel ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-400'}`}
                          title="إظهار في الشريط المتحرك"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="p-2 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <button 
                        onClick={() => {
                          const nextStatus: Record<TaskStatus, TaskStatus> = {
                            'none': 'in-progress',
                            'in-progress': 'completed',
                            'completed': 'not-completed',
                            'not-completed': 'none'
                          };
                          setTasks(tasks.map(t => t.id === task.id ? { ...t, status: nextStatus[t.status] } : t));
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                          task.status === 'in-progress' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                          task.status === 'completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                          task.status === 'not-completed' ? 'bg-red-50 border-red-200 text-red-600' :
                          'bg-slate-50 border-slate-100 text-slate-400'
                        }`}
                      >
                        {task.status === 'none' && 'تحديد الحالة'}
                        {task.status === 'in-progress' && 'قيد التنفيذ'}
                        {task.status === 'completed' && 'تم التنفيذ'}
                        {task.status === 'not-completed' && 'لم يتم التنفيذ'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab !== 'settings' && (
        <div className="fixed bottom-[48px] left-0 w-full z-[60]">
          <Carousel items={allCarouselItems} speed={settings.carouselSpeed} />
        </div>
      )}
    </div>
  );
}
