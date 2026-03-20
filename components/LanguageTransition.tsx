import React from 'react';
import { m, AnimatePresence } from 'framer-motion';

interface LanguageTransitionProps {
  isActive: boolean;
  language: 'en' | 'es';
}

export const LanguageTransition: React.FC<LanguageTransitionProps> = ({ isActive, language }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Main circular reveal effect - monochrome */}
          <m.div
            className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {/* Expanding circle from bottom-left (where language switcher is) */}
            <m.div
              className="absolute rounded-full"
              style={{
                left: '24px',
                bottom: '24px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)',
              }}
              initial={{ 
                width: 0, 
                height: 0,
                x: 0,
                y: 0,
              }}
              animate={{ 
                width: '300vmax', 
                height: '300vmax',
                x: '-150vmax',
                y: '150vmax',
              }}
              exit={{ 
                opacity: 0,
              }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            />
            
            {/* Second subtle ring */}
            <m.div
              className="absolute rounded-full border border-white/5"
              style={{
                left: '24px',
                bottom: '24px',
              }}
              initial={{ 
                width: 0, 
                height: 0,
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{ 
                width: '200vmax', 
                height: '200vmax',
                x: '-100vmax',
                y: '100vmax',
                opacity: 0,
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
              }}
            />
          </m.div>

          {/* Subtle blur overlay */}
          <m.div
            className="fixed inset-0 z-[199] pointer-events-none backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Language text indicator - monochrome */}
          <m.div
            className="fixed bottom-20 left-6 z-[201] pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="px-4 py-2 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl">
              <m.span 
                className="text-xs font-bold uppercase tracking-widest text-text-main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {language === 'es' ? 'Español' : 'English'}
              </m.span>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Content wrapper that fades during language change
export const LanguageContentWrapper: React.FC<{ 
  children: React.ReactNode;
  isChanging: boolean;
}> = ({ children, isChanging }) => {
  return (
    <m.div
      className="flex-1 flex flex-col min-h-0 w-full"
      style={{ willChange: 'filter, opacity, transform' }}
      animate={{ 
        opacity: isChanging ? 0.4 : 1,
        scale: isChanging ? 0.985 : 1,
        filter: isChanging ? 'blur(2.5px)' : 'blur(0px)',
      }}
      transition={{ 
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </m.div>
  );
};
