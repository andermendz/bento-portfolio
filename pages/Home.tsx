import { useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { BentoCard } from '../components/BentoCard';
import { DetailView } from '../components/DetailView';
import { AnimatePresence, motion } from 'framer-motion';

// Import extracted components
import { MapContent } from '../components/Globe';
import {
  IntroContent,
  SocialsContent,
  TechStackContent,
  AboutContent,
  ExperienceContent,
  EducationContent,
  ContactContent,
  ProjectsTriggerContent,
} from '../components/CardContents';

// Import i18n
import { useLanguage } from '../i18n/LanguageContext';

// Import types
import type { BentoItem, Theme } from '../types';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

interface HomeProps {
  theme: Theme;
}

export function Home({ theme }: HomeProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  const { t } = useLanguage();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [runViewTransition]);

  // Static items configuration
  const items: BentoItem[] = [
    { id: 'intro', colSpan: 'col-span-2 sm:col-span-2' },
    { id: 'photo', colSpan: 'col-span-1', bgImage: "/profile.png" },
    { id: 'socials', colSpan: 'col-span-1' },
    { id: 'about', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'about' },
    { id: 'experience', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'experience' },
    { id: 'stack', colSpan: 'col-span-2 sm:col-span-2', hasArrow: true, onClickModal: 'stack' },
    { id: 'education', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'education' },
    { id: 'projects', colSpan: 'col-span-2 sm:col-span-2', hasArrow: true, onClickModal: 'projects' },
    { id: 'map', colSpan: 'col-span-1', noPadding: true },
  ];

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
      case 'projects':
        return <ProjectsTriggerContent />;
      case 'contact':
        return <ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} />;
      case 'map':
        return <MapContent theme={theme} />;
      default:
        return null;
    }
  };

  const getCardTitle = (itemId: string) => {
    switch (itemId) {
      case 'stack': return t('techStackTitle');
      case 'about': return t('aboutTitle');
      case 'experience': return t('experienceTitle');
      case 'education': return t('educationTitle');
      case 'projects': return t('projectsTriggerTitle');
      default: return undefined;
    }
  };

  return (
    <div className={`w-full max-w-[1320px] mx-auto pb-24 sm:pb-6 ${activeSection ? 'flex-1 flex flex-col min-h-0' : ''}`}>
      <AnimatePresence mode="wait" initial={false}>
        {activeSection ? (
          <motion.div
            key={`section-${activeSection}`}
            initial={{ opacity: 0.01, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="flex-1 flex flex-col min-h-0 w-full pb-24 sm:pb-0"
            style={{ viewTransitionName: 'expanded-section' }}
          >
            <DetailView onClose={closeSection} type={activeSection} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] grid-flow-row-dense"
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
                onClick={
                  item.onClickModal
                    ? () => openSection(item.onClickModal!)
                    : undefined
                }
                noPadding={item.noPadding}
              >
                {renderCardContent(item.id)}
              </BentoCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!activeSection && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col md:flex-row justify-between items-center text-text-muted text-xs font-medium uppercase tracking-wider gap-4"
        >
          <p>{t('copyright').replace('{year}', String(new Date().getFullYear()))}</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
            <p>{t('role')}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
