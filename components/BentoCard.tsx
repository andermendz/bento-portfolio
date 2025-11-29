import React, { useRef } from 'react';
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
  isDragging?: boolean;
  isGhost?: boolean;
  isDragActive?: boolean;
  onLongPress?: (e: React.PointerEvent, element: HTMLElement) => void;
  onHover?: () => void;
  dataId?: string;
  isVisible?: boolean;
  noPadding?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = "", 
  onClick, 
  title, 
  hasArrow = false,
  backgroundImage,
  layoutId,
  isDragging = false,
  isGhost = false,
  isDragActive = false,
  onLongPress,
  onHover,
  dataId,
  isVisible = true,
  noPadding = false
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPressed = useRef(false);
  const longPressTriggered = useRef(false);
  
  // Handle Press & Hold
  const handlePointerDown = (e: React.PointerEvent) => {
    longPressTriggered.current = false;
    if (!onLongPress) return;
    
    isPressed.current = true;
    const element = e.currentTarget as HTMLElement;

    timeoutRef.current = setTimeout(() => {
      if (isPressed.current) {
        longPressTriggered.current = true;
        onLongPress(e, element);
      }
    }, 400); 
  };

  const handlePointerUp = () => {
    isPressed.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
       handlePointerUp();
    }
  };

  const handleClick = () => {
    if (longPressTriggered.current) {
        return;
    }
    if (onClick) onClick();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Improved Visual Styles for Premium Feel
  const baseClasses = isGhost 
    ? "rounded-[32px] border-2 border-dashed border-primary/20 bg-primary/5 h-full w-full opacity-60 backdrop-blur-sm"
    : `relative overflow-hidden rounded-[32px] text-left transition-[background-color,transform,box-shadow,border-color] duration-500 group select-none touch-pan-y
        ${isDragging 
          ? 'z-50 shadow-2xl cursor-grabbing border border-primary/50 bg-card pointer-events-none scale-105' 
          : 'bg-card backdrop-blur-xl cursor-grab active:cursor-grabbing shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-transparent dark:border-white/5'
        }
        ${!isDragging && !isGhost && onClick ? 'hover:bg-card-hover' : ''}
    `;

  return (
    <motion.div 
      layoutId={isDragging ? undefined : layoutId}
      layout
      data-bento-id={dataId}
      onClick={(!isDragging && !isGhost && onClick) ? handleClick : undefined}
      onPointerDown={!isGhost ? handlePointerDown : undefined}
      onPointerUp={!isGhost ? handlePointerUp : undefined}
      onPointerLeave={!isGhost ? handlePointerLeave : undefined}
      onPointerCancel={!isGhost ? handlePointerUp : undefined}
      onMouseEnter={onHover}
      onContextMenu={handleContextMenu}
      className={`${baseClasses} ${className}`}
      initial={false}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isDragging ? 1.05 : 1,
      }}
      whileHover={(!isDragging && !isGhost) ? { y: -2, scale: 1.005 } : undefined} 
      whileTap={(!isDragging && !isGhost) ? { scale: 0.98 } : undefined}
      transition={{
        opacity: { duration: 0.2 },
        layout: { type: 'spring', stiffness: 280, damping: 30, mass: 1 }, 
        y: { duration: 0.3, ease: "easeOut" },
        scale: { duration: 0.3, ease: "easeOut" }
      }}
      style={{ WebkitTapHighlightColor: 'transparent', WebkitUserSelect: 'none' }}
    >
      {/* 
        DRAG TARGET OVERLAY
      */}
      {isDragActive && !isDragging && !isGhost && (
        <div 
          className="absolute inset-0 z-50 bg-transparent"
          onMouseEnter={onHover}
        />
      )}

      {/* RENDER CONTENT only if not a ghost */}
      {!isGhost && (
        <>
          {backgroundImage && (
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              whileHover={!isDragging ? { scale: 1.1 } : {}}
              transition={{ duration: 0.8 }}
            />
          )}
          
          {/* Enhanced Gradient Overlay for BG Images */}
          {backgroundImage && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
          )}

          {/* Content wrapper */}
          <div className={`relative h-full flex flex-col z-10 w-full pointer-events-none ${noPadding ? 'p-0' : 'p-6 sm:p-7'} ${backgroundImage ? 'text-white' : ''}`}>
            {title && (
              <h3 className={`text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-auto flex items-center gap-2 ${backgroundImage ? 'text-white/70' : 'text-text-muted'} ${noPadding ? 'absolute top-6 left-6 sm:top-7 sm:left-7 z-20' : ''}`}>
                {title}
              </h3>
            )}
            
            {children}

            {hasArrow && (
              <div className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-500 group-hover:scale-110 group-hover:rotate-45 ${backgroundImage ? 'bg-white/10 border-white/20 text-white' : 'bg-white/50 dark:bg-white/5 border-border text-text-muted group-hover:border-primary/20 group-hover:text-primary'}`}>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};