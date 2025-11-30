import { useState, useEffect } from 'react';
import { BentoCard } from './components/BentoCard';
import { DetailView } from './components/DetailView';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

// Import extracted components
import { MapContent } from './components/Globe';
import {
  IntroContent,
  SocialsContent,
  TechStackContent,
  AboutContent,
  ExperienceContent,
  EducationContent,
  ContactContent,
} from './components/CardContents';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LanguageTransition, LanguageContentWrapper } from './components/LanguageTransition';

// Import i18n
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// Import types
import type { BentoItem, Theme } from './types';

// ----- MAIN APP CONTENT -----

function AppContent() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  
  const { t, language } = useLanguage();

  // Handle language change animation
  const handleLanguageChange = () => {
    setIsLanguageChanging(true);
    setTimeout(() => {
      setIsLanguageChanging(false);
    }, 700);
  };

  // Theme initialization
  useEffect(() => {
    // Check system preference on load (optional)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // Optional: set initial theme based on system
    }
  }, []);

  // Theme toggle effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Time update effect
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Static items configuration
  const items: BentoItem[] = [
    { id: 'intro', colSpan: 'col-span-2 sm:col-span-2' },
    { id: 'photo', colSpan: 'col-span-1', bgImage: "/profile.png" },
    { id: 'socials', colSpan: 'col-span-1' },
    { id: 'about', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'about' },
    { id: 'experience', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'experience' },
    { id: 'stack', colSpan: 'col-span-2 sm:col-span-2', hasArrow: true, onClickModal: 'stack' },
    { id: 'education', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'education' },
    { id: 'contact', colSpan: 'col-span-2 sm:col-span-2' },
    { id: 'map', colSpan: 'col-span-1', noPadding: true },
  ];

  // Render content for cards
  const renderCardContent = (itemId: string) => {
    switch (itemId) {
      case 'intro':
        return <IntroContent />;
      case 'socials':
        return <SocialsContent />;
      case 'stack':
        return <TechStackContent />;
      case 'about':
        return <AboutContent />;
      case 'experience':
        return <ExperienceContent />;
      case 'education':
        return <EducationContent />;
      case 'contact':
        return <ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} />;
      case 'map':
        return <MapContent time={time} theme={theme} />;
      default:
        return null;
    }
  };

  // Get translated titles for cards
  const getCardTitle = (itemId: string) => {
    switch (itemId) {
      case 'stack':
        return t('techStackTitle');
      case 'about':
        return t('aboutTitle');
      case 'experience':
        return t('experienceTitle');
      case 'education':
        return t('educationTitle');
      default:
        return undefined;
    }
  };

  return (
    <div 
      className="min-h-screen bg-page text-text-main p-4 pt-8 md:p-6 md:pt-12 font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center"
    >
      {/* Language Transition Effect */}
      <LanguageTransition isActive={isLanguageChanging} language={language} />
      
      {/* Language Switcher */}
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />
      
      {/* Theme Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[60] p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl text-text-main hover:bg-card-hover transition-colors ring-1 ring-white/10"
        onClick={toggleTheme}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
              <Sun size={24} />
            </motion.div>
          ) : (
            <motion.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
              <Moon size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Detail Overlay View */}
      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = 'unset';
        }}
      >
        {activeModal && (
          <DetailView 
            onClose={() => setActiveModal(null)} 
            type={activeModal} 
            layoutId={activeModal} 
          />
        )}
      </AnimatePresence>

      <LanguageContentWrapper isChanging={isLanguageChanging}>
        <div className="w-full max-w-[1320px] mx-auto pb-24 sm:pb-6">
          
          {/* Main Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[250px] grid-flow-row-dense"
          > 
            {items.map((item, index) => {
              const isExpanded = activeModal === item.id;

              return (
                <BentoCard 
                  key={item.id}
                  layoutId={item.id}
                  dataId={item.id}
                  index={index}
                  className={`${item.colSpan} ${item.rowSpan || ''} h-full`}
                  title={getCardTitle(item.id)}
                  backgroundImage={item.bgImage}
                  hasArrow={item.hasArrow}
                  isVisible={!isExpanded} 
                  onClick={item.onClickModal ? () => setActiveModal(item.onClickModal!) : undefined}
                  noPadding={item.noPadding}
                >
                  {renderCardContent(item.id)}
                </BentoCard>
              );
            })}
          </motion.div>
          
          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col md:flex-row justify-between items-center text-text-muted text-xs font-medium uppercase tracking-wider gap-4"
          >
            <p>{t('copyright')}</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
              <p>{t('role')}</p>
            </div>
          </motion.div>
        </div>
      </LanguageContentWrapper>
    </div>
  );
}

// ----- MAIN APP WITH PROVIDER -----

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
