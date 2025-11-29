import React from 'react';

// Bento Grid Item Interface
export interface BentoItem {
  id: string;
  colSpan: string;
  rowSpan?: string;
  type: 'normal' | 'placeholder';
  content?: React.ReactNode;
  title?: string;
  bgImage?: string;
  hasArrow?: boolean;
  onClickModal?: string;
  noPadding?: boolean;
}

// Theme type
export type Theme = 'dark' | 'light';

// Drag state interface
export interface DragState {
  draggedItem: BentoItem | null;
  dragSize: { width: number; height: number };
}

// Props interfaces for content components
export interface ContentWithCopyProps {
  copyToClipboard: (text: string, label: string) => void;
  copiedText: string | null;
  isDragging?: boolean;
}

export interface MapContentProps {
  time: Date;
  theme: Theme;
}

export interface GlobeProps {
  theme: Theme;
  scale?: number;
}

