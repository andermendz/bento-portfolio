import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../components/ThemeContext';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { LanguageTransition, LanguageContentWrapper } from '../../components/LanguageTransition';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';

function BlogLayoutContent() {
  const { theme, toggleTheme } = useTheme();
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  const isBlogHome = location.pathname === '/';
  const isSpanish = language === 'es';
  const backLabel = isBlogHome
    ? (isSpanish ? 'Volver' : 'Back')
    : (isSpanish ? 'Volver a artículos' : 'Back to articles');
  const getHomeHref = () => {
    if (typeof window === 'undefined') return '/';
    
    const host = window.location.host; // e.g., "blog.localhost:3000", "blog.andermendz.dev"
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const langQuery = language === 'es' ? '?lang=es' : '';

    if (hostname === 'blog.andermendz.dev' || hostname === 'www.blog.andermendz.dev') {
      return `https://andermendz.dev/${langQuery}`;
    }
    
    // For localhost development, if we are on a blog subdomain, strip it to go back to root
    if (hostname.startsWith('blog.')) {
      const mainHost = host.replace(/^blog\./, '');
      return `${protocol}//${mainHost}/${langQuery}`;
    }

    // Fallback if accessed via path /blog
    return `/${langQuery}`;
  };

  const homeHref = getHomeHref();
  const blogHomeHref = isSpanish ? '/?lang=es' : '/';

  const handleLanguageChange = () => {
    setIsLanguageChanging(true);
    setTimeout(() => {
      setIsLanguageChanging(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-page text-text-main font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center">
      <LanguageTransition isActive={isLanguageChanging} language={language} />

      {isBlogHome ? (
        <a
          href={homeHref}
          aria-label="Go back"
          className="fixed top-6 left-6 z-[120] group h-10 px-4 rounded-full bg-card/60 hover:bg-text-main hover:text-page flex items-center gap-2 text-text-main transition-all active:scale-95 border border-border shadow-lg backdrop-blur-xl"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs sm:text-sm font-bold tracking-tight uppercase tracking-[0.1em]">{backLabel}</span>
        </a>
      ) : (
        <Link
          to={blogHomeHref}
          aria-label="Go back"
          className="fixed top-6 left-6 z-[120] group h-10 px-4 rounded-full bg-card/60 hover:bg-text-main hover:text-page flex items-center gap-2 text-text-main transition-all active:scale-95 border border-border shadow-lg backdrop-blur-xl"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs sm:text-sm font-bold tracking-tight uppercase tracking-[0.1em]">{backLabel}</span>
        </Link>
      )}

      {/* Floating Language Switcher */}
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />

      {/* Floating Theme Toggle */}
      <m.button
        className="fixed bottom-6 right-6 z-[120] p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl text-text-main hover:bg-card-hover transition-colors ring-1 ring-white/10"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <m.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
              <Sun size={24} />
            </m.div>
          ) : (
            <m.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
              <Moon size={24} />
            </m.div>
          )}
        </AnimatePresence>
      </m.button>

      {/* Main Content */}
      <LanguageContentWrapper isChanging={isLanguageChanging}>
        <main className="w-full max-w-[1320px] 3xl:max-w-[1500px] mx-auto px-6 pt-20 flex-1">
          <Outlet />
        </main>
      </LanguageContentWrapper>
    </div>
  );
}


export function BlogLayout() {
  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation}>
      <BlogLayoutContent />
          </LazyMotion>
    </LanguageProvider>
  );
}
