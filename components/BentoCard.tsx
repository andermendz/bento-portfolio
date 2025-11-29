import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  isDragging = false,
  isGhost = false,
  isDragActive = false,
  onLongPress,
  onHover,
  dataId,
  isVisible = true,
  noPadding = false,
  index = 0
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPressed = useRef(false);
  const longPressTriggered = useRef(false);
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const initialPointerPos = useRef({ x: 0, y: 0 });
  const cardElementRef = useRef<HTMLElement | null>(null);
  
  // Visual feedback state for long-press progress
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Movement threshold to cancel long-press (in pixels)
  const MOVEMENT_THRESHOLD = 10;
  const LONG_PRESS_DURATION = 350; // ms - slightly faster for better mobile UX
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const cancelHold = () => {
    isPressed.current = false;
    setIsHolding(false);
    setHoldProgress(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };
  
  // Handle Press & Hold
  const handlePointerDown = (e: React.PointerEvent) => {
    longPressTriggered.current = false;
    if (!onLongPress) return;
    
    isPressed.current = true;
    cardElementRef.current = e.currentTarget as HTMLElement;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    initialPointerPos.current = { x: e.clientX, y: e.clientY };
    
    // Start visual feedback
    setIsHolding(true);
    setHoldProgress(0);
    
    // Animate progress ring
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / LONG_PRESS_DURATION, 1);
      setHoldProgress(progress);
      if (progress >= 1) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      }
    }, 16); // ~60fps

    timeoutRef.current = setTimeout(() => {
      if (isPressed.current && cardElementRef.current) {
        longPressTriggered.current = true;
        setIsHolding(false);
        setHoldProgress(0);
        
        // Haptic feedback for supported devices
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
        
        // Create a synthetic event-like object with current pointer position
        const syntheticEvent = {
          ...e,
          clientX: lastPointerPos.current.x,
          clientY: lastPointerPos.current.y
        } as React.PointerEvent;
        onLongPress(syntheticEvent, cardElementRef.current);
      }
    }, LONG_PRESS_DURATION); 
  };
  
  // Track pointer movement during long press detection
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPressed.current) {
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
      
      // Check if finger moved too far - cancel long-press to allow scrolling
      const deltaX = Math.abs(e.clientX - initialPointerPos.current.x);
      const deltaY = Math.abs(e.clientY - initialPointerPos.current.y);
      
      if (deltaX > MOVEMENT_THRESHOLD || deltaY > MOVEMENT_THRESHOLD) {
        cancelHold();
      }
    }
  };

  const handlePointerUp = () => {
    cancelHold();
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
       cancelHold();
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
  
  // Detect if we're on a touch device for showing drag hint
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  // Improved Visual Styles for Premium Feel
  // NOTE: Removed 'transform' from CSS transitions to prevent conflict with Framer Motion
  const baseClasses = isGhost 
    ? "rounded-[32px] border-2 border-dashed border-primary/40 bg-primary/10 h-full w-full backdrop-blur-sm relative overflow-hidden"
    : `relative overflow-hidden rounded-[32px] text-left transition-[background-color,box-shadow,border-color] duration-300 group select-none touch-pan-y
        ${isDragging 
          ? 'z-50 shadow-2xl cursor-grabbing border border-primary/50 bg-card pointer-events-none' 
          : 'bg-card backdrop-blur-xl cursor-grab active:cursor-grabbing shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-transparent dark:border-white/5'
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
      onPointerMove={!isGhost ? handlePointerMove : undefined}
      onPointerUp={!isGhost ? handlePointerUp : undefined}
      onPointerLeave={!isGhost ? handlePointerLeave : undefined}
      onPointerCancel={!isGhost ? handlePointerUp : undefined}
      onMouseEnter={onHover}
      onContextMenu={handleContextMenu}
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
      whileHover={(!isDragging && !isGhost && !isDragActive) ? { 
        y: -6, 
        scale: 1.02,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 25 
        }
      } : undefined} 
      whileTap={(!isDragging && !isGhost && !isDragActive) ? { 
        scale: 0.98,
        transition: { 
          type: 'spring', 
          stiffness: 500, 
          damping: 30 
        }
      } : undefined}
      transition={isDragActive ? {
        // During drag: fast, snappy layout transitions with no delays
        opacity: { duration: 0.15 },
        y: { duration: 0.15 },
        scale: { duration: 0.15 },
        layout: { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }
      } : {
        // Entrance animation - uses staggered delay
        opacity: { duration: 0.5, delay: index * 0.06, ease: 'easeOut' },
        y: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.4, delay: index * 0.06, ease: 'easeOut' },
        layout: { type: 'spring', stiffness: 350, damping: 30 }
      }}
      style={{ 
        WebkitTapHighlightColor: 'transparent', 
        WebkitUserSelect: 'none',
        willChange: 'transform'
      }}
    >
      {/* 
        DRAG TARGET OVERLAY - Uses onPointerMove for continuous detection
        when cards reposition underneath the cursor during drag
      */}
      {isDragActive && !isDragging && !isGhost && (
        <div 
          className="absolute inset-0 z-50 bg-transparent"
          onMouseEnter={onHover}
          onPointerMove={onHover}
          onPointerOver={onHover}
        />
      )}
      
      {/* Long-press visual feedback ring */}
      <AnimatePresence>
        {isHolding && !isGhost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-[60] pointer-events-none flex items-center justify-center"
          >
            {/* Pulsing background overlay */}
            <motion.div 
              className="absolute inset-0 bg-primary/10 rounded-[32px]"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            
            {/* Progress ring */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                {/* Background circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-text-muted/20"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-primary"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={2 * Math.PI * 28 * (1 - holdProgress)}
                  style={{ transition: 'stroke-dashoffset 16ms linear' }}
                />
              </svg>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <GripVertical size={20} className="text-primary" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile drag hint indicator - subtle grip icon on touch devices */}
      {isTouchDevice && onLongPress && !isGhost && !isDragActive && !isHolding && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 sm:hidden pointer-events-none">
          <div className="px-2 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center gap-1">
            <GripVertical size={10} className="text-text-muted" />
            <span className="text-[8px] text-text-muted font-medium uppercase tracking-wider">Hold to move</span>
          </div>
        </div>
      )}

      {/* Animated content for ghost placeholder */}
      {isGhost && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Pulsing drop zone indicator */}
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1, 0.95]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
              <GripVertical size={18} className="text-primary/50" />
            </div>
            <span className="text-[10px] font-medium text-primary/50 uppercase tracking-wider">Drop here</span>
          </motion.div>
        </div>
      )}

      {/* RENDER CONTENT only if not a ghost */}
      {!isGhost && (
        <>
          {backgroundImage && (
            <motion.div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url(${backgroundImage})` }}
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
              <div className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-45 ${backgroundImage ? 'bg-white/10 border-white/20 text-white' : 'bg-white/50 dark:bg-white/5 border-border text-text-muted group-hover:border-primary/20 group-hover:text-primary'}`}>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};