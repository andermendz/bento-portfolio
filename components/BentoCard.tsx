import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { m, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  hasArrow?: boolean;
  backgroundImage?: string;
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
  dataId,
  isVisible = true,
  noPadding = false,
  index = 0
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  
  // Mouse tracking for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !onClick || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = `relative overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[32px] text-left transition-[background-color,box-shadow,border-color] duration-300 group ${onClick ? 'select-none' : ''}
      bg-card backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-transparent dark:border-white/5 hover:border-primary/10
      ${onClick ? 'cursor-pointer hover:bg-card-hover' : ''}
  `;

  return (
    <m.div
      ref={cardRef}
      layout="position"
      data-bento-id={dataId}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${baseClasses} ${className}`}
      style={{ 
        rotateX: onClick && !reduceMotion ? rotateX : 0,
        rotateY: onClick && !reduceMotion ? rotateY : 0,
        WebkitTapHighlightColor: 'transparent',
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      initial={{
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 30,
        scale: reduceMotion ? 1 : 0.95
      }}
      animate={{
        opacity: isVisible && (reduceMotion || isInView) ? 1 : 0,
        y: reduceMotion ? 0 : (isInView ? 0 : 30),
        scale: reduceMotion ? 1 : (isInView ? 1 : 0.95)
      }}
      whileHover={onClick && !reduceMotion ? { 
        y: -4, 
        scale: 1.01,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 25 
        }
      } : undefined} 
      whileTap={onClick && !reduceMotion ? { 
        scale: 0.98,
        transition: { 
          type: 'spring', 
          stiffness: 500, 
          damping: 30 
        }
      } : undefined}
      transition={{
        // Entrance animation - uses staggered delay when in view
        opacity: { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion || !isInView ? 0 : index * 0.06, ease: 'easeOut' },
        y: { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion || !isInView ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: reduceMotion ? 0 : 0.4, delay: reduceMotion || !isInView ? 0 : index * 0.06, ease: 'easeOut' },
        // Smooth layout transition for card-to-modal expansion
        layout: {
          type: 'spring',
          stiffness: 180,
          damping: 28,
          mass: 0.8
        }
      }}
    >
      {backgroundImage && (
        <m.div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          role="img"
          aria-label={dataId === 'photo' ? 'Profile photo of the developer' : 'Background image'}
        />
      )}

      {/* Content wrapper */}
      <div className={`relative h-full flex flex-col z-10 w-full ${noPadding ? 'p-0' : 'p-4 sm:p-6 md:p-7'} ${backgroundImage ? 'text-white' : ''}`}>
        {title && (
          <h3 className={`text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-auto flex items-center gap-2 ${backgroundImage ? 'text-white/70' : 'text-text-muted'} ${noPadding ? 'absolute top-4 left-4 sm:top-6 sm:left-6 md:top-7 md:left-7 z-20' : ''}`}>
            {title}
          </h3>
        )}
        
        {children}

        {hasArrow && (
          <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-45 group-hover:shadow-lg ${backgroundImage ? 'bg-white/10 border-white/20 text-white' : 'bg-white/50 dark:bg-white/5 border-border text-text-muted group-hover:border-primary/20 group-hover:text-primary'}`}>
            <ArrowUpRight size={14} className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </m.div>
  );
};
