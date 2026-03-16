import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { BentoCard } from './components/BentoCard';
import { DetailView } from './components/DetailView';
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { Sun, Moon } from 'lucide-react';

import { Suspense, lazy } from 'react';

// Import extracted components
const MapContent = lazy(() => import('./components/Globe').then(module => ({ default: module.MapContent })));
import {
  IntroContent,
  SocialsContent,
  TechStackContent,
  AboutContent,
  ExperienceContent,
  EducationContent,
  ContactContent,
} from './components/cards';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SEO } from './components/SEO';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPersonSchema,
  buildWebsiteSchema,
  DEFAULT_KEYWORDS,
  getLocale,
} from './config/seo';

import { LanguageTransition, LanguageContentWrapper } from './components/LanguageTransition';

import { bentoItems } from './config/layout';

// Import i18n
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// Import types
// (No types needed here anymore)

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

// ----- MAIN APP CONTENT -----

function AppContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  
  const { t, language } = useLanguage();
  const isSpanish = language === 'es';

  const homepageTitle = isSpanish
    ? 'Anderson Mendoza | Ingeniero Full-Stack y Constructor de Productos con IA'
    : 'Anderson Mendoza | Full-Stack Engineer and AI Product Builder';
  const homepageSeoTitle = isSpanish
    ? 'Ingeniero Full-Stack y Constructor de Productos con IA'
    : 'Full-Stack Engineer and AI Product Builder';
  const homepageDescription = isSpanish
    ? 'Portfolio y blog de Anderson Mendoza, ingeniero full-stack y constructor de productos con IA en Cartagena, Colombia. Especializado en React, TypeScript, Node.js y aplicaciones impulsadas por LLMs.'
    : 'Portfolio and blog of Anderson Mendoza, a full-stack engineer and AI product builder in Cartagena, Colombia. Specialized in React, TypeScript, Node.js, and LLM-powered applications.';
  const homepageKeywords = isSpanish
    ? [...DEFAULT_KEYWORDS, 'ingeniero full-stack', 'portfolio desarrollador', 'constructor de productos con IA', 'ingeniero de software Colombia']
    : [...DEFAULT_KEYWORDS, 'developer portfolio', 'software engineer portfolio', 'AI product builder portfolio'];
  const homepageCanonical = absoluteUrl(isSpanish ? '/?lang=es' : '/');
  const homepageAlternates = [
    { hrefLang: 'en', href: absoluteUrl('/') },
    { hrefLang: 'es', href: absoluteUrl('/?lang=es') },
    { hrefLang: 'x-default', href: absoluteUrl('/') },
  ];
  const homepageSchemas = [
    buildPersonSchema(),
    buildWebsiteSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: homepageTitle,
      description: homepageDescription,
      url: homepageCanonical,
      inLanguage: isSpanish ? 'es' : 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Anderson Mendoza',
        url: absoluteUrl('/'),
      },
      mainEntity: {
        '@type': 'Person',
        name: 'Anderson Mendoza',
        url: absoluteUrl('/'),
      },
    },
    buildBreadcrumbSchema([
      { name: 'Home', item: absoluteUrl(isSpanish ? '/?lang=es' : '/') },
    ]),
  ];

  /**
   * Handles the language change animation by setting the changing state
   * and resetting it after the animation duration.
   */
  const handleLanguageChange = () => {
    setIsLanguageChanging(true);
    setTimeout(() => {
      setIsLanguageChanging(false);
    }, 700);
  };

  // When opening a section, scroll page to top so the section is in frame (fixes mobile when user had scrolled down)
  useEffect(() => {
    if (activeSection) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeSection]);

  /**
   * Copies the provided text to the clipboard and shows a temporary success message.
   * @param text - The text to copy
   * @param label - The label for the copied text (for display purposes)
   */
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback: could show an alert or toast
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  const runViewTransition = useCallback((update: () => void) => {
    const doc = document as DocumentWithViewTransition;
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => {
        flushSync(update);
      });
      return;
    }
    update();
  }, []);

  const closeSection = useCallback(() => {
    runViewTransition(() => setActiveSection(null));
  }, [runViewTransition]);

  const openSection = useCallback((sectionType: string) => {
    runViewTransition(() => setActiveSection(sectionType));
  }, [runViewTransition]);

  // Use imported layout configuration
  const items = bentoItems;


  /**
   * Renders the appropriate content component based on the card item ID.
   * @param itemId - The unique identifier for the card item
   * @returns The React component to render for the card
   */
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
        return (
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-text-muted"><div className="w-6 h-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div></div>}>
            <MapContent theme={theme} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  /**
   * Gets the translated title for a card based on its ID.
   * @param itemId - The unique identifier for the card item
   * @returns The translated title string or undefined if no title
   */
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
      className={`min-h-screen bg-page text-text-main p-4 pt-8 md:p-6 md:pt-16 3xl:pt-20 font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center ${activeSection ? 'overflow-y-hidden' : ''}`}
    >
      <SEO 
        title={homepageSeoTitle}
        description={homepageDescription}
        canonical={homepageCanonical}
        locale={getLocale(language)}
        alternateLocales={['en_US', 'es_CO']}
        keywords={homepageKeywords}
        alternates={homepageAlternates}
        schemaData={homepageSchemas}
      />
      {/* Language Transition Effect */}
      <LanguageTransition isActive={isLanguageChanging} language={language} />
      
      {/* Language Switcher */}
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />
      
      {/* Theme Toggle Button */}
      <m.button
        className="fixed bottom-6 right-6 z-[120] p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl text-text-main hover:bg-card-hover transition-colors ring-1 ring-white/10"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
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

      <LanguageContentWrapper isChanging={isLanguageChanging}>
        <div className={`w-full max-w-[1320px] 3xl:max-w-[1500px] mx-auto pb-24 sm:pb-6 ${activeSection ? 'flex-1 flex flex-col min-h-0' : ''}`}>
          
          <AnimatePresence mode="wait" initial={false}>
            {activeSection ? (
              <m.div
                key={`section-${activeSection}`}
                initial={{ opacity: 0.01, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="flex-1 flex flex-col min-h-0 w-full pb-24 sm:pb-0"
                style={{ viewTransitionName: 'expanded-section' }}
              >
                <DetailView onClose={closeSection} type={activeSection} />
              </m.div>
            ) : (
              <m.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 3xl:gap-6 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] 3xl:auto-rows-[280px] grid-flow-row-dense"
                style={{ viewTransitionName: 'bento-grid' }}
              >
                {items.map((item, index) => (
                  <BentoCard
                    key={item.id}
                    dataId={item.id}
                    index={index}
                    className={`${item.colSpan} ${item.rowSpan || ''} h-full`}
                    title={getCardTitle(item.id)}
                    backgroundImage={item.bgImage}
                    hasArrow={item.hasArrow}
                    onClick={item.onClickModal ? () => openSection(item.onClickModal!) : undefined}
                    noPadding={item.noPadding}
                  >
                    {renderCardContent(item.id)}
                  </BentoCard>
                ))}
              </m.div>
            )}
          </AnimatePresence>

          
          {/* Footer */}
          {!activeSection && (
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col md:flex-row justify-between items-center text-text-muted text-xs font-medium uppercase tracking-wider gap-4"
            >
              <div className="flex items-center gap-3">
                <p>{t('copyright').replace('{year}', String(new Date().getFullYear()))}</p>
                <a
                  href={language === 'es' ? 'https://blog.andermendz.dev/?lang=es' : 'https://blog.andermendz.dev/'}
                  className="transition-colors hover:text-text-main"
                >
                  Blog
                </a>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                <p>{t('role')}</p>
              </div>
            </m.div>
          )}
        </div>
      </LanguageContentWrapper>
    </div>
  );
}

// ----- MAIN APP WITH PROVIDER -----

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <LazyMotion features={domAnimation}>
          <AppContent />
                  </LazyMotion>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
