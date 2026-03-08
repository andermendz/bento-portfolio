import React, { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load section components
const AboutSection = lazy(() => import('./sections/AboutSection').then(m => ({ default: m.AboutSection })));
const ExperienceSection = lazy(() => import('./sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const EducationSection = lazy(() => import('./sections/EducationSection').then(m => ({ default: m.EducationSection })));
const TechStackSection = lazy(() => import('./sections/TechStackSection').then(m => ({ default: m.TechStackSection })));

interface DetailViewProps {
  onClose: () => void;
  type: string;
}

/**
 * A wrapper that notifies when its children have mounted.
 */
const MountNotifier: React.FC<{ onMount: () => void; children: React.ReactNode }> = ({ onMount, children }) => {
  useEffect(() => {
    // Small delay to ensure browser has painted the content
    const timer = setTimeout(onMount, 50);
    return () => clearTimeout(timer);
  }, [onMount]);
  return <>{children}</>;
};

export const DetailView: React.FC<DetailViewProps> = ({ onClose, type }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus management
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement;
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, []);

  const renderSection = () => {
    switch (type) {
      case 'about':
        return <AboutSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'education':
        return <EducationSection />;
      case 'stack':
        return <TechStackSection />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={modalRef}
      layout
      className="relative w-full min-h-[calc(100vh-8rem)] sm:min-h-[75vh] max-h-[calc(100vh-8rem)] sm:max-h-[88vh] bg-card rounded-[24px] sm:rounded-[40px] border border-border overflow-hidden flex flex-col shadow-2xl ring-1 ring-white/10 transform-gpu will-change-[transform,height,opacity] flex-1"
      tabIndex={-1}
      role="region"
      aria-labelledby={`section-title-${type}`}
      initial={{ y: 12, opacity: 0 }}
      animate={{ 
        y: isReady ? 0 : 8, 
        opacity: isReady ? 1 : 0 
      }}
      exit={{ y: 8, opacity: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1], // Apple-style quintic ease-out
        layout: { 
          type: "spring",
          stiffness: 180,
          damping: 28,
          mass: 1
        }
      }}
    >
      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 z-40 px-4 py-4 sm:px-8 sm:py-6 flex items-center justify-between pointer-events-none"
          >
            <button
              onClick={onClose}
              aria-label="Go back"
              className="group h-10 px-4 rounded-full bg-card/60 hover:bg-text-main hover:text-page flex items-center gap-2 text-text-main transition-all active:scale-95 border border-border shadow-lg backdrop-blur-xl pointer-events-auto"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs sm:text-sm font-bold tracking-tight uppercase tracking-[0.1em]">Back</span>
            </button>
            
            <div className="hidden sm:block pointer-events-none">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/30">
                {type}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col w-full min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y relative z-10 modal-scroll pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <Suspense fallback={null}>
          <MountNotifier onMount={() => setIsReady(true)}>
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ 
                opacity: isReady ? 1 : 0,
                filter: isReady ? "blur(0px)" : "blur(4px)"
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {renderSection()}
            </motion.div>
          </MountNotifier>
        </Suspense>
      </div>
    </motion.div>
  );
};
