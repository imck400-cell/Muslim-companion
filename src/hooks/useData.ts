import { useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../lib/utils';
import { Category, ContentItem, Note, Task, AppSettings } from '../types';
import { DEFAULT_CATEGORIES, DEFAULT_ITEMS } from '../constants';

export const useData = () => {
  const [categories, setCategories] = useState<Category[]>(() => loadFromLocalStorage('categories', DEFAULT_CATEGORIES));
  const [items, setItems] = useState<ContentItem[]>(() => loadFromLocalStorage('items', DEFAULT_ITEMS));
  const [notes, setNotes] = useState<Note[]>(() => loadFromLocalStorage('notes', []));
  const [tasks, setTasks] = useState<Task[]>(() => loadFromLocalStorage('tasks', []));
  const [settings, setSettings] = useState<AppSettings>(() => loadFromLocalStorage('settings', {
    language: 'ar',
    themeId: 'modern-emerald',
    carouselItems: [],
    carouselSpeed: 30,
    uid: 'default'
  }));

  useEffect(() => {
    saveToLocalStorage('categories', categories);
  }, [categories]);

  useEffect(() => {
    saveToLocalStorage('items', items);
  }, [items]);

  useEffect(() => {
    saveToLocalStorage('notes', notes);
  }, [notes]);

  useEffect(() => {
    saveToLocalStorage('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveToLocalStorage('settings', settings);
  }, [settings]);

  return {
    categories, setCategories,
    items, setItems,
    notes, setNotes,
    tasks, setTasks,
    settings, setSettings
  };
};
