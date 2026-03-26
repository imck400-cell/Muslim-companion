/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef, Component, ReactNode, ErrorInfo } from 'react';
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
  Share2,
  User
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { LOGIN_PHRASE, WELCOME_MESSAGE, FOOTER_INFO, CONTACT_PHONE, WHATSAPP_LINK, DEFAULT_CATEGORIES, DEFAULT_ITEMS, THEMES, VIBRANT_COLORS } from './constants';
import { Category, ContentItem, AppSettings, CarouselItem, Theme, Note, Task, TaskStatus } from './types';
import { db, auth, storage, handleFirestoreError, OperationType, testFirestoreConnection, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

import { collection, doc, setDoc, deleteDoc, onSnapshot, query, getDocs, writeBatch, updateDoc, where, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// --- Components ---

export class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">عذراً، حدث خطأ غير متوقع</h2>
            <p className="text-slate-600 mb-8">لقد واجهنا مشكلة في تحميل هذه الصفحة. يرجى محاولة إعادة تحميل التطبيق.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors"
            >
              إعادة تحميل التطبيق
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Carousel = ({ items, speed }: { items: CarouselItem[], speed: number }) => {
  const colors = ['#f43f5e', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'];
  const safeSpeed = typeof speed === 'number' && !isNaN(speed) ? speed : 30;
  const duration = Math.max(10, 130 - safeSpeed);

  const baseList = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return [];
    let list = [...items];
    // Repeat items to ensure the marquee is smooth and covers the screen
    while (list.length > 0 && list.length < 20) {
      list = [...list, ...items];
    }
    return list;
  }, [items]);

  if (baseList.length === 0) return null;

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
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              try {
                localStorage.setItem('defaultProgramId', item.id);
                window.dispatchEvent(new CustomEvent('defaultProgramChanged', { detail: item.id }));
                toast.success('تم تعيين هذا البرنامج كافتراضي. سيتم فتحه تلقائياً عند الدخول.');
              } catch (err) {
                console.error('Error setting default program:', err);
                toast.error('حدث خطأ أثناء تعيين البرنامج الافتراضي');
              }
            }}
            title="تعيين كبرنامج افتراضي"
            className="p-1.5 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md border border-white/10 shrink-0"
          >
            <Home className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
            className="p-1.5 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md border border-white/10 shrink-0"
          >
            <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'recent' | 'favorites' | 'settings'>('home');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [newItemType, setNewItemType] = useState<'link' | 'pdf'>('link');
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<AppSettings>({
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
    carouselSpeed: 30,
    uid: 'default'
  });

  const currentTheme = useMemo(() => THEMES.find(t => t.id === settings.themeId) || THEMES[0], [settings.themeId]);

  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isThemesCollapsed, setIsThemesCollapsed] = useState(true);
  const [targetCategoryId, setTargetCategoryId] = useState<string>('cat-default');
  const [activeModule, setActiveModule] = useState<'none' | 'notebook' | 'tasks'>('none');

  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [defaultProgramId, setDefaultProgramId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('defaultProgramId');
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    testFirestoreConnection();
    
    const handleDefaultProgramChanged = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setDefaultProgramId(customEvent.detail);
    };
    window.addEventListener('defaultProgramChanged', handleDefaultProgramChanged);
    return () => window.removeEventListener('defaultProgramChanged', handleDefaultProgramChanged);
  }, []);

  useEffect(() => {
    // Set auth ready after 2 seconds regardless, to avoid getting stuck
    const timer = setTimeout(() => {
      setIsAuthReady(true);
    }, 2000);

    const unsubAuth = auth.onAuthStateChanged((user) => {
      clearTimeout(timer);
      setIsAuthReady(true);
    });

    return () => {
      clearTimeout(timer);
      unsubAuth();
    };
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const handleError = (error: any, path: string) => {
      const errInfo = handleFirestoreError(error, OperationType.GET, path);
      if (errInfo && errInfo.error.includes('Quota exceeded')) {
        setIsQuotaExceeded(true);
        // Fallback to defaults if not already loaded
        setCategories(prev => prev.length === 0 ? DEFAULT_CATEGORIES : prev);
        setItems(prev => prev.length === 0 ? DEFAULT_ITEMS : prev);
        setIsLoading(false);
      }
    };

    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const cats: Category[] = [];
      snapshot.forEach(doc => cats.push(doc.data() as Category));
      if (cats.length === 0) {
        // Initialize default categories
        const batch = writeBatch(db);
        DEFAULT_CATEGORIES.forEach(cat => {
          batch.set(doc(db, 'categories', cat.id), { ...cat, uid: 'default' });
        });
        batch.commit().catch(error => handleError(error, 'categories-init'));
      } else {
        setCategories(cats);
        // Check for missing default categories and add them
        const batch = writeBatch(db);
        let needsUpdate = false;

        const missingCats = DEFAULT_CATEGORIES.filter(dc => !cats.some(c => c.id === dc.id));
        if (missingCats.length > 0) {
          missingCats.forEach(cat => {
            batch.set(doc(db, 'categories', cat.id), { ...cat, uid: 'default' });
          });
          needsUpdate = true;
        }

        DEFAULT_CATEGORIES.forEach(dc => {
          const existing = cats.find(c => c.id === dc.id);
          if (existing && (existing.parentId !== dc.parentId || existing.name !== dc.name || existing.color !== dc.color)) {
            batch.update(doc(db, 'categories', dc.id), { 
              parentId: dc.parentId,
              name: dc.name,
              color: dc.color
            });
            needsUpdate = true;
          }
        });

        // Migrate any custom root categories to cat-useful-sites
        cats.forEach(c => {
          if (c.parentId === null && c.id !== 'cat-default' && c.id !== 'cat-useful-sites') {
            batch.update(doc(db, 'categories', c.id), { parentId: 'cat-useful-sites' });
            needsUpdate = true;
          }
        });

        if (needsUpdate) {
          batch.commit().catch(error => handleError(error, 'categories-update'));
        }
      }
    }, (error) => handleError(error, 'categories'));

    const unsubItems = onSnapshot(collection(db, 'items'), (snapshot) => {
      const itms: ContentItem[] = [];
      snapshot.forEach(doc => itms.push(doc.data() as ContentItem));
      if (itms.length === 0) {
        // Initialize default items
        const batch = writeBatch(db);
        DEFAULT_ITEMS.forEach(item => {
          batch.set(doc(db, 'items', item.id), { ...item, uid: 'default' });
        });
        batch.commit().catch(error => handleError(error, 'items-init'));
      } else {
        setItems(itms);
        // Check for missing default items and add them
        const batch = writeBatch(db);
        let needsUpdate = false;

        const missingItems = DEFAULT_ITEMS.filter(di => !itms.some(i => i.id === di.id));
        if (missingItems.length > 0) {
          missingItems.forEach(item => {
            batch.set(doc(db, 'items', item.id), { ...item, uid: 'default' });
          });
          needsUpdate = true;
        }

        DEFAULT_ITEMS.forEach(di => {
          const existing = itms.find(i => i.id === di.id);
          if (existing && existing.color !== di.color) {
            batch.update(doc(db, 'items', di.id), { color: di.color });
            needsUpdate = true;
          }
        });

        if (needsUpdate) {
          batch.commit().catch(error => handleError(error, 'items-update'));
        }
      }
    }, (error) => handleError(error, 'items'));

    const unsubNotes = onSnapshot(collection(db, 'notes'), (snapshot) => {
      const nts: Note[] = [];
      snapshot.forEach(doc => nts.push(doc.data() as Note));
      setNotes(nts);
    }, (error) => handleError(error, 'notes'));

    const unsubTasks = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tsks: Task[] = [];
      snapshot.forEach(doc => tsks.push(doc.data() as Task));
      setTasks(tsks);
    }, (error) => handleError(error, 'tasks'));

    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists() && docSnap.data()) {
        setSettings({ ...settings, ...(docSnap.data() as AppSettings) });
      } else {
        setDoc(doc(db, 'settings', 'global'), settings).catch(error => handleError(error, 'settings/global-init'));
      }
      setIsLoading(false);
    }, (error) => {
      handleError(error, 'settings/global');
      setIsLoading(false);
    });

    return () => {
      unsubCategories();
      unsubItems();
      unsubNotes();
      unsubTasks();
      unsubSettings();
    };
  }, [isAuthReady]);

  // Loading timeout for stability
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn('Loading timed out, forcing app to show');
        setIsLoading(false);
      }
    }, 5000); // 5 seconds timeout
    return () => clearTimeout(timer);
  }, [isLoading]);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await setDoc(doc(db, 'settings', 'global'), updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/global');
    }
  };

  const allCarouselItems = useMemo(() => {
    const carouselItems = Array.isArray(settings.carouselItems) ? settings.carouselItems : [];
    const taskItems = (Array.isArray(tasks) ? tasks : [])
      .filter(t => t && t.showInCarousel)
      .map(t => ({ id: t.id, text: `مهمة: ${t.title} - ${t.date}` }));
    return [...carouselItems, ...taskItems];
  }, [settings.carouselItems, tasks]);

  const handleItemClick = async (item: ContentItem) => {
    if (!item) return;
    try {
      setRecentIds(prev => {
        if (!Array.isArray(prev)) return [item.id];
        return [item.id, ...prev.filter(id => id !== item.id)].slice(0, 10);
      });
      
      let finalUrl = item.url || '';
      if (!finalUrl) {
        toast.error('الرابط غير متاح لهذا العنصر');
        return;
      }

      if (finalUrl.startsWith('storage://')) {
        const fileId = finalUrl.replace('storage://', '');
        try {
          const fileRef = ref(storage, `files/${fileId}`);
          finalUrl = await getDownloadURL(fileRef);
        } catch (err) {
          console.error('Error loading file from Storage:', err);
          toast.error('الملف غير موجود أو تم حذفه من السحابة');
          return;
        }
      } else if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://') && !finalUrl.startsWith('mailto:') && !finalUrl.startsWith('tel:')) {
        finalUrl = 'https://' + finalUrl;
      }
      
      if (!finalUrl) return;

      // Always open in a new tab as requested
      const win = window.open(finalUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        toast.error('تم حظر فتح النافذة الجديدة. يرجى السماح بالنوافذ المنبثقة.');
      }
    } catch (error) {
      console.error('Error in handleItemClick:', error);
      toast.error('حدث خطأ غير متوقع عند محاولة فتح الرابط');
    }
  };

  const toggleFavorite = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const updatedItem = { ...item, isFavorite: !item.isFavorite };
      setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      try {
        await setDoc(doc(db, 'items', id), updatedItem);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `items/${id}`);
      }
    }
  };

  const filteredItems = useMemo(() => {
    const safeItems = Array.isArray(items) ? items : [];
    const safeRecentIds = Array.isArray(recentIds) ? recentIds : [];
    
    if (activeTab === 'favorites') return safeItems.filter(i => i && i.isFavorite);
    if (activeTab === 'recent') return safeRecentIds.map(id => safeItems.find(i => i && i.id === id)).filter(Boolean) as ContentItem[];
    if (activeTab === 'home') {
      if (!currentCategory) return []; // Don't show links on home screen, only categories
      return safeItems.filter(i => i && i.categoryId === currentCategory);
    }
    return safeItems;
  }, [activeTab, items, recentIds, currentCategory]);

  const activeCategories = useMemo(() => {
    const safeCategories = Array.isArray(categories) ? categories : [];
    const filtered = safeCategories.filter(c => c && c.parentId === currentCategory);
    // Sort based on DEFAULT_CATEGORIES order if they are default categories
    return [...filtered].sort((a, b) => {
      const indexA = DEFAULT_CATEGORIES.findIndex(dc => dc.id === a.id);
      const indexB = DEFAULT_CATEGORIES.findIndex(dc => dc.id === b.id);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, [categories, currentCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" style={{ background: currentTheme.background }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-bold animate-pulse">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-32 transition-all duration-500" style={{ background: currentTheme.background }}>
      {/* Toaster for notifications */}
      <Toaster position="top-center" richColors />

      {/* Quota Exceeded Banner */}
      <AnimatePresence>
        {isQuotaExceeded && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 w-full z-50 bg-amber-600 text-white p-4 shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold">تنبيه: تم تجاوز حصة الاستخدام (Quota Exceeded). سيتم استخدام البيانات المحلية الافتراضية. ستتم إعادة تعيين الحصة غداً.</span>
            </div>
            <button 
              onClick={() => setIsQuotaExceeded(false)}
              className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg font-bold transition-colors"
            >
              إغلاق
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
              {/* Auth Section */}
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-slate-600" />
                  الحساب والمزامنة
                </h3>
                {auth.currentUser ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {auth.currentUser.photoURL && (
                        <img src={auth.currentUser.photoURL} alt="" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-slate-800">{auth.currentUser.displayName}</p>
                        <p className="text-xs text-slate-500">{auth.currentUser.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => signOut(auth)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600 mb-4">قم بتسجيل الدخول لمزامنة بياناتك والوصول إلى ميزات الإدارة.</p>
                    <button 
                      onClick={() => signInWithPopup(auth, googleProvider)}
                      className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors"
                    >
                      <img src="https://www.gstatic.com/firebase/explore/images/google-logo.svg" alt="" className="w-5 h-5" />
                      تسجيل الدخول باستخدام Google
                    </button>
                  </div>
                )}
              </section>

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

              {/* Default Program Management */}
              <section className="bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-sm">
                <h3 className="text-lg font-display font-bold flex items-center gap-2 mb-4">
                  <Home className="w-5 h-5" style={{ color: currentTheme.primary }} />
                  البرنامج الافتراضي
                </h3>
                {defaultProgramId ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-slate-600">
                      يوجد برنامج افتراضي معين حالياً. سيتم فتحه تلقائياً عند الدخول.
                    </p>
                    <div className="p-3 bg-slate-50 border rounded-xl text-xs text-slate-500 truncate" dir="ltr">
                      {items.find(i => i.id === defaultProgramId)?.title || 'برنامج غير معروف'}
                    </div>
                    <button 
                      onClick={() => {
                        try {
                          localStorage.removeItem('defaultProgramId');
                          setDefaultProgramId(null);
                          toast.success('تم إزالة البرنامج الافتراضي بنجاح.');
                        } catch (err) {
                          console.error('Error removing default program:', err);
                          toast.error('حدث خطأ أثناء إزالة البرنامج الافتراضي');
                        }
                      }}
                      className="w-full py-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold shadow-sm border border-red-100 hover:bg-red-100 transition-colors"
                    >
                      إلغاء تعيين البرنامج الافتراضي
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    لا يوجد برنامج افتراضي. يمكنك تعيين أي برنامج كافتراضي من خلال النقر على أيقونة المنزل (الرئيسية) بجانبه.
                  </p>
                )}
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
                      onClick={async () => {
                        const name = (document.getElementById('new-cat-name') as HTMLInputElement).value;
                        if (!name) return;
                        const catId = Date.now().toString();
                        const newCat: Category = {
                          id: catId,
                          name,
                          parentId: currentCategory,
                          color: VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)],
                          uid: 'default'
                        };
                        try {
                          await setDoc(doc(db, 'categories', catId), newCat);
                          (document.getElementById('new-cat-name') as HTMLInputElement).value = '';
                        } catch (error) {
                          handleFirestoreError(error, OperationType.WRITE, `categories/${catId}`);
                        }
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
                                setSelectedPdfFile(file);
                                (document.getElementById('new-item-url') as HTMLInputElement).value = file.name;
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
                        let url = (document.getElementById('new-item-url') as HTMLInputElement).value;
                        
                        if (newItemType === 'link' && url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
                          url = 'https://' + url;
                        }

                        if (!title || (!url && newItemType === 'link') || (!selectedPdfFile && newItemType === 'pdf')) {
                          toast.error('يرجى إدخال العنوان والرابط أو اختيار ملف');
                          return;
                        }

                        const itemId = Date.now().toString();

                        if (newItemType === 'pdf' && selectedPdfFile) {
                          try {
                            const fileRef = ref(storage, `files/${itemId}`);
                            await uploadBytes(fileRef, selectedPdfFile);
                            url = `storage://${itemId}`;
                          } catch (err) {
                            console.error('Error saving file:', err);
                            toast.error('حدث خطأ أثناء حفظ الملف');
                            return;
                          }
                        }

                        const newItem: ContentItem = {
                          id: itemId,
                          title,
                          url,
                          type: newItemType,
                          color: VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)],
                          categoryId: targetCategoryId,
                          createdAt: Date.now(),
                          isFavorite: false,
                          uid: 'default'
                        };
                        
                        try {
                          await setDoc(doc(db, 'items', itemId), newItem);
                          (document.getElementById('new-item-title') as HTMLInputElement).value = '';
                          (document.getElementById('new-item-url') as HTMLInputElement).value = '';
                          setSelectedPdfFile(null);
                        } catch (error) {
                          handleFirestoreError(error, OperationType.WRITE, `items/${itemId}`);
                        }
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
                          onClick={async () => {
                            try {
                              await deleteDoc(doc(db, 'categories', cat.id));
                              // Also delete items in this category
                              const itemsToDelete = items.filter(i => i.categoryId === cat.id);
                              for (const item of itemsToDelete) {
                                await deleteDoc(doc(db, 'items', item.id));
                                if (item.url.startsWith('storage://')) {
                                  const fileRef = ref(storage, `files/${item.url.replace('storage://', '')}`);
                                  deleteObject(fileRef).catch(console.error);
                                }
                              }
                            } catch (error) {
                              handleFirestoreError(error, OperationType.DELETE, `categories/${cat.id}`);
                            }
                          }}
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
                          onClick={async () => {
                            try {
                              await deleteDoc(doc(db, 'items', item.id));
                              if (item.url.startsWith('storage://')) {
                                const fileRef = ref(storage, `files/${item.url.replace('storage://', '')}`);
                                deleteObject(fileRef).catch(console.error);
                              }
                            } catch (error) {
                              handleFirestoreError(error, OperationType.DELETE, `items/${item.id}`);
                            }
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
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
                  onClick={async () => {
                    const content = (document.getElementById('note-content') as HTMLTextAreaElement).value;
                    if (!content) return;
                    const noteId = Date.now().toString();
                    const newNote: Note = {
                      id: noteId,
                      content,
                      createdAt: Date.now(),
                      uid: 'default'
                    };
                    try {
                      await setDoc(doc(db, 'notes', noteId), newNote);
                      (document.getElementById('note-content') as HTMLTextAreaElement).value = '';
                    } catch (error) {
                      handleFirestoreError(error, OperationType.WRITE, `notes/${noteId}`);
                    }
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
                      <button 
                        onClick={async () => {
                          try {
                            await deleteDoc(doc(db, 'notes', note.id));
                          } catch (error) {
                            handleFirestoreError(error, OperationType.DELETE, `notes/${note.id}`);
                          }
                        }} 
                        className="text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                    <button 
                      onClick={() => {
                        try {
                          navigator.clipboard.writeText(note.content);
                          toast.success('تم نسخ النص');
                        } catch (err) {
                          console.error('Error copying text:', err);
                          toast.error('فشل نسخ النص');
                        }
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
                  onClick={async () => {
                    const title = (document.getElementById('task-title') as HTMLInputElement).value;
                    const date = (document.getElementById('task-date') as HTMLInputElement).value;
                    if (!title || !date) return;
                    const taskId = Date.now().toString();
                    const newTask: Task = {
                      id: taskId,
                      title,
                      date,
                      status: 'none',
                      showInCarousel: false,
                      createdAt: Date.now(),
                      uid: 'default'
                    };
                    try {
                      await setDoc(doc(db, 'tasks', taskId), newTask);
                      (document.getElementById('task-title') as HTMLInputElement).value = '';
                      (document.getElementById('task-date') as HTMLInputElement).value = '';
                    } catch (error) {
                      handleFirestoreError(error, OperationType.WRITE, `tasks/${taskId}`);
                    }
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
                          onClick={async () => {
                            try {
                              await setDoc(doc(db, 'tasks', task.id), { ...task, showInCarousel: !task.showInCarousel });
                            } catch (error) {
                              handleFirestoreError(error, OperationType.WRITE, `tasks/${task.id}`);
                            }
                          }}
                          className={`p-2 rounded-lg transition-colors ${task.showInCarousel ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-400'}`}
                          title="إظهار في الشريط المتحرك"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={async () => {
                            try {
                              await deleteDoc(doc(db, 'tasks', task.id));
                            } catch (error) {
                              handleFirestoreError(error, OperationType.DELETE, `tasks/${task.id}`);
                            }
                          }} 
                          className="p-2 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <button 
                        onClick={async () => {
                          const nextStatus: Record<TaskStatus, TaskStatus> = {
                            'none': 'in-progress',
                            'in-progress': 'completed',
                            'completed': 'not-completed',
                            'not-completed': 'none'
                          };
                          try {
                            await setDoc(doc(db, 'tasks', task.id), { ...task, status: nextStatus[task.status] });
                          } catch (error) {
                            handleFirestoreError(error, OperationType.WRITE, `tasks/${task.id}`);
                          }
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
