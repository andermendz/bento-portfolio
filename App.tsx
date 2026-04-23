import { useState, useEffect, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { DetailView } from './components/DetailView';
import { AnimatePresence, m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { BlogLink } from './components/BlogLink';
import { SEO } from './components/SEO';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { SmoothScroll, useSmoothScroll } from './components/SmoothScroll';
import { IntroLoader } from './components/IntroLoader';
import { Grain } from './components/Grain';
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPersonSchema,
  buildWebsiteSchema,
  DEFAULT_KEYWORDS,
  getLocale,
  PERSON_ID,
  WEBSITE_ID,
} from './config/seo';

import { LanguageTransition, LanguageContentWrapper } from './components/LanguageTransition';

import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// Chapters
import { HeroChapter } from './components/chapters/HeroChapter';
import { BentoChapter } from './components/chapters/BentoChapter';
import { StoryChapter } from './components/chapters/StoryChapter';
import { TimelineChapter } from './components/chapters/TimelineChapter';
import { ProjectsChapter } from './components/chapters/ProjectsChapter';
import { BlogChapter } from './components/chapters/BlogChapter';
import { StackChapter } from './components/chapters/StackChapter';
import { GlobeChapter } from './components/chapters/GlobeChapter';
import { OutroChapter } from './components/chapters/OutroChapter';

// ----- MAIN APP CONTENT -----

function AppContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const { stop, start } = useSmoothScroll();

  const { t, language } = useLanguage();
  const isSpanish = language === 'es';

  const homepageTitle = isSpanish
    ? 'Anderson Mendoza | Ingeniero de Software'
    : 'Anderson Mendoza | Software Engineer';
  const homepageSeoTitle = isSpanish ? 'Ingeniero de Software' : 'Software Engineer';
  const homepageDescription = isSpanish
    ? 'Portfolio y blog de Anderson Mendoza, ingeniero de software en Cartagena, Colombia. Especializado en React, TypeScript, Node.js y aplicaciones con IA.'
    : 'Portfolio and blog of Anderson Mendoza, a software engineer in Cartagena, Colombia. Specialized in React, TypeScript, Node.js, and AI-powered applications.';
  const homepageKeywords = isSpanish
    ? [...DEFAULT_KEYWORDS, 'ingeniero de software', 'portfolio desarrollador', 'desarrollador react']
    : [...DEFAULT_KEYWORDS, 'software engineer', 'developer portfolio', 'react developer'];
  const homepageCanonical = absoluteUrl(isSpanish ? '/?lang=es' : '/');
  const homepageAlternates = [
    { hrefLang: 'en', href: absoluteUrl('/') },
    { hrefLang: 'es', href: absoluteUrl('/?lang=es') },
    { hrefLang: 'x-default', href: absoluteUrl('/') },
  ];
  const homepageFaq = isSpanish
    ? [
        {
          question: '¿Quién es Anderson Mendoza?',
          answer:
            'Anderson Mendoza es un ingeniero de software y constructor de productos con IA basado en Cartagena, Colombia. Actualmente es Líder Técnico en Visbl y trabaja con React, TypeScript, Node.js, Python, Rust y modelos de lenguaje (LLMs).',
        },
        {
          question: '¿Está disponible para trabajo freelance o de tiempo completo?',
          answer:
            'Sí. Anderson está disponible para proyectos freelance y roles de tiempo completo, trabajando de forma asíncrona desde UTC−5 con equipos en cualquier parte del mundo.',
        },
        {
          question: '¿En qué tecnologías se especializa?',
          answer:
            'Frontend con React 19, TypeScript, Vite y Tailwind. Backend con Node.js, Python y PostgreSQL. Integración de IA con LLMs, reconocimiento de voz (Whisper, Parakeet) y modelos de difusión. Aplicaciones de escritorio con Rust y Tauri.',
        },
        {
          question: '¿Dónde puedo leer sus escritos?',
          answer:
            'El blog está en https://andermendz.dev/blog con ensayos largos sobre ingeniería de IA, LLMs y oficio técnico, disponible en inglés y español.',
        },
      ]
    : [
        {
          question: 'Who is Anderson Mendoza?',
          answer:
            'Anderson Mendoza is a software engineer and AI product builder based in Cartagena, Colombia. He is currently Technical Lead at Visbl and works across React, TypeScript, Node.js, Python, Rust, and LLMs.',
        },
        {
          question: 'Is Anderson available for freelance or full-time work?',
          answer:
            'Yes. Anderson is available for freelance projects and full-time roles, working async-friendly from UTC−5 with teams anywhere in the world.',
        },
        {
          question: 'What technologies does Anderson specialize in?',
          answer:
            'Frontend with React 19, TypeScript, Vite, and Tailwind. Backend with Node.js, Python, and PostgreSQL. AI integration with LLMs, speech-to-text (Whisper, Parakeet), and diffusion models. Desktop apps with Rust and Tauri.',
        },
        {
          question: 'Where can I read his writing?',
          answer:
            'The blog lives at https://andermendz.dev/blog with long-form essays on AI engineering, LLMs, and technical craft, available in English and Spanish.',
        },
      ];

  const homepageSchemas = [
    buildPersonSchema(),
    buildWebsiteSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${homepageCanonical}#profile`,
      name: homepageTitle,
      description: homepageDescription,
      url: homepageCanonical,
      inLanguage: isSpanish ? 'es-CO' : 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    buildFaqSchema(homepageFaq),
    buildBreadcrumbSchema([{ name: t('home'), item: absoluteUrl(isSpanish ? '/?lang=es' : '/') }]),
  ];

  const handleLanguageChange = () => {
    setIsLanguageChanging(true);
    setTimeout(() => {
      setIsLanguageChanging(false);
    }, 700);
  };

  // Freeze Lenis while a detail modal is open to prevent background drift.
  useEffect(() => {
    if (activeSection) {
      stop();
    } else if (loaderDone) {
      start();
    }
  }, [activeSection, loaderDone, stop, start]);

  const closeSection = useCallback(() => {
    setActiveSection(null);
  }, []);

  const openSection = useCallback((sectionType: string) => {
    setActiveSection(sectionType);
  }, []);

  return (
    <div className="relative min-h-screen bg-page text-text-main font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-clip">
      <a href="#main-content" className="skip-to-main">
        {t('skipToMainContent')}
      </a>
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

      <IntroLoader onComplete={() => setLoaderDone(true)} />

      <LanguageTransition isActive={isLanguageChanging} language={language} />

      <LanguageSwitcher onLanguageChange={handleLanguageChange} />

      <BlogLink />

      <m.button
        className="fixed z-[120] p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl text-text-main hover:bg-card-hover transition-colors ring-1 ring-white/10 bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))]"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('themeSwitchToLight') : t('themeSwitchToDark')}
        initial={reduceMotion ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 1.0, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: 10 }}
        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <m.div key="sun" initial={reduceMotion ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={reduceMotion ? { opacity: 0 } : { scale: 0, rotate: 90 }}>
              <Sun size={24} />
            </m.div>
          ) : (
            <m.div key="moon" initial={reduceMotion ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={reduceMotion ? { opacity: 0 } : { scale: 0, rotate: -90 }}>
              <Moon size={24} />
            </m.div>
          )}
        </AnimatePresence>
      </m.button>

      <Grain />

      <LanguageContentWrapper isChanging={isLanguageChanging}>
        <main
          id="main-content"
          tabIndex={-1}
          className="relative w-full outline-none"
        >
          <HeroChapter />
          <BentoChapter theme={theme} onOpenSection={openSection} />
          <StoryChapter />
          <TimelineChapter />
          <ProjectsChapter />
          <BlogChapter />
          <StackChapter />
          <GlobeChapter theme={theme} />
          <OutroChapter />
        </main>
      </LanguageContentWrapper>

      {/* Detail view modal (opened from bento cards) */}
      <AnimatePresence>
        {activeSection && (
          <m.div
            key={`section-${activeSection}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-page/80 backdrop-blur-xl"
            onClick={closeSection}
          >
            <div
              className="w-full max-w-[1320px] 3xl:max-w-[1500px] h-full max-h-[calc(100vh-2rem)] sm:max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <DetailView onClose={closeSection} type={activeSection} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
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
            <SmoothScroll>
              <AppContent />
            </SmoothScroll>
          </LazyMotion>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
