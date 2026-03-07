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
  ExternalLink, 
  FileText,
  Trash2,
  Edit2,
  Menu,
  X,
  Languages,
  ArrowRight
} from 'lucide-react';
import { LOGIN_PHRASE, WELCOME_MESSAGE, FOOTER_INFO, CONTACT_PHONE, WHATSAPP_LINK, DEFAULT_CATEGORIES, DEFAULT_ITEMS } from './constants';
import { Category, ContentItem, AppSettings, CarouselItem } from './types';

// --- Components ---

const Login = ({ onLogin }: { onLogin: () => void }) => {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-teal-100 text-slate-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/50"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
            <Home className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-emerald-800 mb-2">رفيق المسلم</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
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

const Carousel = ({ items }: { items: CarouselItem[] }) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-white/50 backdrop-blur-sm py-3 border-t border-slate-100">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap px-4"
      >
        {[...items, ...items].map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            {item.imageUrl && <img src={item.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />}
            <span className="text-sm font-medium text-slate-700">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

function ContentCard({ item, onClick, onToggleFavorite }: { item: ContentItem, onClick: () => void, onToggleFavorite: (id: string) => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="relative w-full p-4 rounded-2xl text-right flex flex-col justify-between h-24 shadow-xl border-b-4 transition-all overflow-hidden group cursor-pointer mb-2"
      style={{ 
        backgroundColor: item.color, 
        borderColor: 'rgba(0,0,0,0.2)',
        color: '#fff'
      }}
    >
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute top-1/4 right-10 w-20 h-20 rotate-45 border border-white/10" />
        <div className="absolute bottom-2 left-1/3 w-12 h-12 rounded-full border-2 border-white/5" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-16 h-1 bg-white/10 -rotate-12" />
        <div className="absolute top-2 left-1/2 w-1 h-16 bg-white/10 rotate-45" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-start w-full relative z-10">
        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
          {item.type === 'link' ? <ExternalLink className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          className="p-2 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
        >
          <Heart className={`w-5 h-5 ${item.isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      <h3 className="text-xl font-bold leading-tight drop-shadow-lg z-10 relative">{item.title}</h3>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [activeTab, setActiveTab] = useState<'home' | 'recent' | 'favorites' | 'settings'>('home');
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
      theme: 'light',
      carouselItems: [
        { id: '1', text: 'اللهم صل وسلم على نبينا محمد' },
        { id: '2', text: 'سبحان الله وبحمده سبحان الله العظيم' },
        { id: '3', text: 'أستغفر الله العظيم وأتوب إليه' }
      ]
    };
  });

  const [viewingItem, setViewingItem] = useState<ContentItem | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('recentIds', JSON.stringify(recentIds));
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [isLoggedIn, categories, items, recentIds, settings]);

  const handleLogin = () => setIsLoggedIn(true);

  const handleItemClick = (item: ContentItem) => {
    setRecentIds(prev => [item.id, ...prev.filter(id => id !== item.id)].slice(0, 10));
    setViewingItem(item);
  };

  const toggleFavorite = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'favorites') return items.filter(i => i.isFavorite);
    if (activeTab === 'recent') return recentIds.map(id => items.find(i => i.id === id)).filter(Boolean) as ContentItem[];
    if (currentCategory) return items.filter(i => i.categoryId === currentCategory);
    return items;
  }, [activeTab, items, recentIds, currentCategory]);

  const activeCategories = useMemo(() => {
    return categories.filter(c => c.parentId === currentCategory);
  }, [categories, currentCategory]);

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <Home className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-emerald-800">رفيق المسلم</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Languages className="w-5 h-5 text-slate-500" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Breadcrumbs / Back button if in category */}
        {currentCategory && (
          <button 
            onClick={() => {
              const cat = categories.find(c => c.id === currentCategory);
              setCurrentCategory(cat?.parentId || null);
            }}
            className="flex items-center gap-2 text-emerald-600 font-bold"
          >
            <ArrowRight className="w-5 h-5" />
            العودة
          </button>
        )}

        {/* Categories Grid */}
        {activeTab === 'home' && activeCategories.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {activeCategories.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setCurrentCategory(cat.id)}
                className="relative w-full p-4 rounded-2xl text-center shadow-xl border-b-4 transition-all overflow-hidden"
                style={{ backgroundColor: cat.color, color: '#fff', borderColor: 'rgba(0,0,0,0.2)' }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                <span className="font-bold text-xl relative z-10">{cat.name}</span>
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
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-400">
              <p>لا يوجد محتوى هنا بعد...</p>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom UI */}
      <div className="fixed bottom-0 left-0 w-full z-40">
        <Carousel items={settings.carouselItems} />
        
        <nav className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <button 
            onClick={() => { setActiveTab('home'); setCurrentCategory(null); }}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">الرئيسية</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('recent')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'recent' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <History className="w-6 h-6" />
            <span className="text-[10px] font-bold">الأخيرة</span>
          </button>

          {/* Central Red FAB */}
          <div className="relative -top-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuickAdd(true)}
              className="w-14 h-14 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center border-4 border-white"
            >
              <Plus className="w-8 h-8" />
            </motion.button>
          </div>

          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'favorites' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-[10px] font-bold">المفضلة</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <SettingsIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">الإعدادات</span>
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
              {/* Carousel Management */}
              <section>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-emerald-600" />
                  شريط الإعلانات
                </h3>
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
                    <input id="new-item-url" placeholder="الرابط (URL)..." className="w-full p-2 bg-white border rounded-lg text-sm" />
                    <div className="flex gap-2">
                      <select id="new-item-type" className="flex-1 p-2 bg-white border rounded-lg text-sm">
                        <option value="link">رابط ويب</option>
                        <option value="pdf">ملف PDF</option>
                      </select>
                      <button 
                        onClick={() => {
                          const title = (document.getElementById('new-item-title') as HTMLInputElement).value;
                          const url = (document.getElementById('new-item-url') as HTMLInputElement).value;
                          const type = (document.getElementById('new-item-type') as HTMLSelectElement).value as 'link' | 'pdf';
                          if (!title || !url) return;
                          const newItem: ContentItem = {
                            id: Date.now().toString(),
                            title,
                            url,
                            type,
                            color: '#' + Math.floor(Math.random()*16777215).toString(16),
                            categoryId: currentCategory || 'cat-default',
                            createdAt: Date.now(),
                            isFavorite: false
                          };
                          setItems([...items, newItem]);
                          (document.getElementById('new-item-title') as HTMLInputElement).value = '';
                          (document.getElementById('new-item-url') as HTMLInputElement).value = '';
                        }}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold"
                      >
                        إضافة
                      </button>
                    </div>
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
    </div>
  );
}
