import React, { useState, useEffect } from 'react';
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

// Import custom hook
import { useDragAndDrop } from './hooks/useDragAndDrop';

// Import types
import type { BentoItem, Theme } from './types';

// ----- MAIN COMPONENT -----

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState<Theme>('dark');
  const [items, setItems] = useState<BentoItem[]>([]);

  // Use custom drag and drop hook
  const {
    draggedItem,
    dragSize,
    dragOverlayRef,
    handleStartDrag,
    handleHoverItem,
  } = useDragAndDrop({ items, setItems });

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

  // Initialize Items Data - ONLY ONCE
  useEffect(() => {
    setItems([
      { id: 'intro', type: 'normal', colSpan: 'col-span-1 sm:col-span-2', content: <IntroContent /> },
      { id: 'photo', type: 'normal', colSpan: 'col-span-1', bgImage: "/profile.png" },
      { id: 'socials', type: 'normal', colSpan: 'col-span-1', content: <SocialsContent /> },
      { id: 'stack', type: 'normal', colSpan: 'col-span-1 sm:col-span-2', title: "Tech Stack", content: <TechStackContent />, hasArrow: true, onClickModal: 'stack' },
      { id: 'about', type: 'normal', colSpan: 'col-span-1', title: "About", content: <AboutContent />, hasArrow: true, onClickModal: 'about' },
      { id: 'experience', type: 'normal', colSpan: 'col-span-1', title: "Experience", content: <ExperienceContent />, hasArrow: true, onClickModal: 'experience' },
      { id: 'education', type: 'normal', colSpan: 'col-span-1', title: "Education", content: <EducationContent />, hasArrow: true, onClickModal: 'education' },
      { id: 'contact', type: 'normal', colSpan: 'col-span-1 sm:col-span-2', content: <ContactContent copyToClipboard={() => {}} copiedText={null} /> },
      { id: 'map', type: 'normal', colSpan: 'col-span-1', content: <MapContent time={new Date()} theme="dark" />, noPadding: true },
    ]);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Render content for cards (with live data)
  const renderCardContent = (itemId: string, isDragging = false) => {
    switch (itemId) {
      case 'intro':
        return <IntroContent />;
      case 'socials':
        return <SocialsContent isDragging={isDragging} />;
      case 'stack':
        return <TechStackContent />;
      case 'about':
        return <AboutContent />;
      case 'experience':
        return <ExperienceContent />;
      case 'education':
        return <EducationContent />;
      case 'contact':
        return <ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} isDragging={isDragging} />;
      case 'map':
        return <MapContent time={time} theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-page text-text-main p-4 pt-8 md:p-6 md:pt-12 font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center"
    >
      
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

      {/* Floating Drag Overlay */}
      <AnimatePresence>
        {draggedItem && (
          <motion.div 
            ref={dragOverlayRef}
            className="fixed z-[100] pointer-events-none will-change-transform"
            style={{ 
              width: dragSize.width, 
              height: dragSize.height,
              left: 0,
              top: 0
            }}
            initial={{ scale: 1, rotate: 0 }}
            animate={{ 
              scale: 1.03, 
              rotate: 1,
              transition: { 
                type: 'spring', 
                stiffness: 400, 
                damping: 25 
              }
            }}
            exit={{ 
              scale: 1, 
              rotate: 0, 
              opacity: 0,
              transition: { duration: 0.15 }
            }}
          >
            <BentoCard 
              isDragging={true}
              title={draggedItem.title}
              backgroundImage={draggedItem.bgImage}
              hasArrow={draggedItem.hasArrow}
              noPadding={draggedItem.noPadding}
              className="h-full w-full shadow-2xl shadow-black/50 ring-2 ring-primary/30"
            >
              {renderCardContent(draggedItem.id, true)}
            </BentoCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[1320px] mx-auto pb-6">
        
        {/* Main Grid */}
        <motion.div 
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={draggedItem ? {
            duration: 0.3,
            layout: { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }
          } : { duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[250px] grid-flow-row-dense"
        > 
          {items.map((item, index) => {
            const isExpanded = activeModal === item.id;

            return (
              <BentoCard 
                key={item.id}
                layoutId={item.id}
                dataId={item.id}
                index={index}
                className={`${item.colSpan} ${item.rowSpan || ''} ${item.type === 'normal' ? 'h-full' : ''}`}
                title={item.title}
                backgroundImage={item.bgImage}
                hasArrow={item.hasArrow}
                isGhost={item.type === 'placeholder'}
                isDragActive={!!draggedItem} 
                isVisible={!isExpanded} 
                onClick={item.onClickModal ? () => setActiveModal(item.onClickModal!) : undefined}
                onLongPress={(e, el) => handleStartDrag(item, el, e)}
                onHover={() => handleHoverItem(item.id)}
                noPadding={item.noPadding}
              >
                {item.type === 'normal' && renderCardContent(item.id)}
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
          <p>© 2025 Anderson Mendoza.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
            <p>Systems Engineer</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
