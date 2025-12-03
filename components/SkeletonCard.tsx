import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[32px] bg-card border border-border p-4 sm:p-6 md:p-7 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="animate-pulse">
        <div className="h-4 bg-border rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-border rounded w-full"></div>
          <div className="h-3 bg-border rounded w-5/6"></div>
          <div className="h-3 bg-border rounded w-4/6"></div>
        </div>
      </div>
    </motion.div>
  );
};