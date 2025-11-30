import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  onLanguageChange?: () => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange }) => {
  const { language, setLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
  ];

  const handleLanguageChange = (newLang: Language) => {
    if (newLang === language || isAnimating) return;
    
    setIsAnimating(true);
    onLanguageChange?.();
    
    // Small delay before changing language for effect sync
    setTimeout(() => {
      setLanguage(newLang);
    }, 150);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-[60] flex items-center gap-1 p-1.5 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl ring-1 ring-white/10"
      initial={{ opacity: 0, scale: 0, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            relative px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 overflow-hidden
            ${language === lang.code 
              ? 'text-page' 
              : 'text-text-muted hover:text-text-main hover:bg-card-hover'
            }
          `}
          whileHover={{ scale: language === lang.code ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isAnimating}
        >
          {/* Active background pill */}
          {language === lang.code && (
            <motion.div
              layoutId="activeLang"
              className="absolute inset-0 bg-text-main rounded-full"
              transition={{ 
                type: 'spring', 
                stiffness: 500, 
                damping: 35,
                mass: 1
              }}
            />
          )}
          
          {/* Content */}
          <span className="relative z-10 flex items-center gap-1.5">
            <span className="text-sm">{lang.flag}</span>
            <span>{lang.label}</span>
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};
