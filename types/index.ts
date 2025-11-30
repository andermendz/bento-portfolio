import React from 'react';

// Bento Grid Item Interface
export interface BentoItem {
  id: string;
  colSpan: string;
  rowSpan?: string;
  content?: React.ReactNode;
  title?: string;
  bgImage?: string;
  hasArrow?: boolean;
  onClickModal?: string;
  noPadding?: boolean;
}

// Theme type
export type Theme = 'dark' | 'light';

// Props interfaces for content components
export interface ContentWithCopyProps {
  copyToClipboard: (text: string, label: string) => void;
  copiedText: string | null;
}

export interface MapContentProps {
  time: Date;
  theme: Theme;
}

export interface GlobeProps {
  theme: Theme;
  scale?: number;
}
