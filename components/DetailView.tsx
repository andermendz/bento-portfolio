import React, { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load section components
const AboutSection = lazy(() => import('./sections/AboutSection').then(m => ({ default: m.AboutSection })));
const ExperienceSection = lazy(() => import('./sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const EducationSection = lazy(() => import('./sections/EducationSection').then(m => ({ default: m.EducationSection })));
const TechStackSection = lazy(() => import('./sections/TechStackSection').then(m => ({ default: m.TechStackSection })));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));

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
      case 'projects':
        return <ProjectsSection />;
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
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            aria-label="Go back"
            className="absolute top-3 left-3 sm:top-6 sm:left-6 z-40 h-10 sm:h-11 px-3 sm:px-4 rounded-full bg-card/90 hover:bg-text-main hover:text-page flex items-center gap-2 text-text-main transition-all active:scale-95 border border-border shadow-md backdrop-blur-xl"
          >
            <ArrowLeft size={18} />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">Back</span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex flex-col w-full min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y relative z-10 modal-scroll pt-14 sm:pt-16">
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
