import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MemeAttempt, Meme } from '../types/models';
import { Alert } from 'react-native';

interface GalleryContextValue {
  attempts: MemeAttempt[];
  isLoading: boolean;
  addAttempt: (meme: Meme, imageUri: string) => Promise<void>;
  deleteAttempt: (attemptId: string) => Promise<void>;
}

const GalleryContext = createContext<GalleryContextValue | undefined>(undefined);
const STORAGE_KEY = 'memearoo/attempts';

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [attempts, setAttempts] = useState<MemeAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: MemeAttempt[] = JSON.parse(stored);
          setAttempts(parsed);
        }
      } catch (error) {
        console.warn('Failed to load attempts', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttempts();
  }, []);

  useEffect(() => {
    const persist = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
      } catch (error) {
        console.warn('Failed to persist attempts', error);
      }
    };

    if (!isLoading) {
      void persist();
    }
  }, [attempts, isLoading]);

  const addAttempt = useCallback(async (meme: Meme, imageUri: string) => {
    const newAttempt: MemeAttempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      memeId: meme.id,
      memeTitle: meme.title,
      memeImageUri: meme.imageUri,
      imageUri,
      timestamp: Date.now(),
    };

    setAttempts((prev) => [newAttempt, ...prev]);
    Alert.alert('Saved', 'Attempt added to your gallery');
  }, []);

  const deleteAttempt = useCallback(async (attemptId: string) => {
    setAttempts((prev) => prev.filter((item) => item.id !== attemptId));
  }, []);

  const value = useMemo(
    () => ({ attempts, addAttempt, deleteAttempt, isLoading }),
    [attempts, addAttempt, deleteAttempt, isLoading],
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

export const useGallery = (): GalleryContextValue => {
  const ctx = useContext(GalleryContext);
  if (!ctx) {
    throw new Error('useGallery must be used within GalleryProvider');
  }
  return ctx;
};
