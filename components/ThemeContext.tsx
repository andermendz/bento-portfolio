import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check system preference on load (optional)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (error) {
      console.error('Failed to toggle theme:', error);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    // Support for Document View Transitions API
    if (!(document as any).startViewTransition) {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      return;
    }

    (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      });
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
