import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  hasArrow?: boolean;
  backgroundImage?: string;
  layoutId?: string;
  dataId?: string;
  isVisible?: boolean;
  noPadding?: boolean;
  index?: number; // For staggered entrance animation
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = "", 
  onClick, 
  title, 
  hasArrow = false,
  backgroundImage,
  layoutId,
  dataId,
  isVisible = true,
  noPadding = false,
  index = 0
}) => {
  const baseClasses = `relative overflow-hidden rounded-[32px] text-left transition-[background-color,box-shadow,border-color] duration-300 group select-none
      bg-card backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-transparent dark:border-white/5
      ${onClick ? 'cursor-pointer hover:bg-card-hover' : ''}
  `;

  return (
    <motion.div 
      layoutId={layoutId}
      layout
      data-bento-id={dataId}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      initial={{ 
        opacity: 0, 
        y: 30,
        scale: 0.95
      }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: 0,
        scale: 1
      }}
      whileHover={onClick ? { 
        y: -6, 
        scale: 1.02,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 25 
        }
      } : undefined} 
      whileTap={onClick ? { 
        scale: 0.98,
        transition: { 
          type: 'spring', 
          stiffness: 500, 
          damping: 30 
        }
      } : undefined}
      transition={{
        // Entrance animation - uses staggered delay
        opacity: { duration: 0.5, delay: index * 0.06, ease: 'easeOut' },
        y: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.4, delay: index * 0.06, ease: 'easeOut' },
        // Smooth layout transition for card-to-modal expansion
        layout: { 
          type: 'spring', 
          stiffness: 200, 
          damping: 28,
          mass: 0.8
        }
      }}
      style={{ 
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {backgroundImage && (
        <motion.div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Content wrapper */}
      <div className={`relative h-full flex flex-col z-10 w-full ${noPadding ? 'p-0' : 'p-6 sm:p-7'} ${backgroundImage ? 'text-white' : ''}`}>
        {title && (
          <h3 className={`text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-auto flex items-center gap-2 ${backgroundImage ? 'text-white/70' : 'text-text-muted'} ${noPadding ? 'absolute top-6 left-6 sm:top-7 sm:left-7 z-20' : ''}`}>
            {title}
          </h3>
        )}
        
        {children}

        {hasArrow && (
          <div className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-45 ${backgroundImage ? 'bg-white/10 border-white/20 text-white' : 'bg-white/50 dark:bg-white/5 border-border text-text-muted group-hover:border-primary/20 group-hover:text-primary'}`}>
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </div>
        )}
      </div>
    </motion.div>
  );
};
