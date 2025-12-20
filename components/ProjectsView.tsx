import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code2,
  Mail,
  Linkedin,
  Check,
  Copy,
  Terminal
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { BentoCard } from './BentoCard';
import type { Project } from '../types';

// --- Minimal Monochrome Visual ---
const ProjectVisual: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center overflow-hidden relative rounded-lg border border-border bg-card/30 group-hover:bg-card/50 transition-colors duration-500">
    {/* Subtle Grid Pattern (Monochrome) */}
    <div 
      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
      style={{ 
        backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`, 
        backgroundSize: '20px 20px' 
      }} 
    />
    
    {/* Minimal Icon */}
    <div className="relative z-10 text-text-muted group-hover:text-text-main transition-colors duration-500">
      <Code2 size={48} strokeWidth={1} />
    </div>
  </div>
);

// --- Timeline Item Component ---
const TimelineItem: React.FC<{ project: Project; isLast: boolean }> = ({ project, isLast }) => {
  const { t } = useLanguage();

  return (
    <div className="relative pl-8 sm:pl-12 py-2 group">
      {/* Vertical Timeline Line (Monochrome) - Only between items */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-[-30px] w-px bg-border group-hover:bg-text-muted/30 transition-colors"></div>
      )}

      {/* Timeline Marker (Hollow Circle) */}
      <div className="absolute left-0 sm:left-1 top-3 w-[22px] h-[22px] rounded-full border border-border bg-page flex items-center justify-center z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted group-hover:bg-text-main transition-colors duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-6 mb-20 sm:mb-28">
        
        {/* Header: Title Only */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
            {t(project.titleKey as any)}
          </h3>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Description & Details (Left) */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6">
            <p className="text-base text-text-muted leading-relaxed">
              {t(project.descKey as any)}
            </p>

            <div className="space-y-6">
              {/* Tech Stack Tags (Monochrome) */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-text-muted px-2 py-1 rounded border border-border bg-transparent uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links (Minimal) */}
              <div className="flex items-center gap-5 pt-2">
                <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-bold text-text-main hover:opacity-70 flex items-center gap-2 transition-opacity uppercase tracking-wider">
                  <ExternalLink size={14} />
                  Live Demo
                </a>
                <a href={project.repo} target="_blank" rel="noreferrer" className="text-xs font-bold text-text-muted hover:text-text-main flex items-center gap-2 transition-colors uppercase tracking-wider">
                  <Github size={14} />
                  Source
                </a>
              </div>
            </div>
          </div>

          {/* Visual Preview (Right) */}
          <div className="lg:col-span-3">
            <div className="aspect-video w-full">
               <ProjectVisual />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const ProjectsView: React.FC<{ onBack: () => void; theme: 'light' | 'dark' }> = ({ onBack, theme }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const renderHeroDesc = () => {
    const descText = t('projectsHeroDesc');
    const parts = descText.split(/(<highlight>.*?<\/highlight>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<highlight>')) {
        const text = part.replace(/<\/?highlight>/g, '');
        return <span key={index} className="text-text-main font-semibold">{text}</span>;
      }
      return part;
    });
  };

  const handleCopyEmail = () => {
    const email = t('emailAddress');
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projects: Project[] = [
    {
      id: '1',
      titleKey: 'project1Title',
      descKey: 'project1Desc',
      tags: ['Next.js', 'Gemini AI', 'Tailwind'],
      link: '#',
      repo: '#',
      color: '#8B5CF6'
    },
    {
      id: '2',
      titleKey: 'project2Title',
      descKey: 'project2Desc',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      link: '#',
      repo: '#',
      color: '#3B82F6'
    },
    {
      id: '3',
      titleKey: 'project3Title',
      descKey: 'project3Desc',
      tags: ['D3.js', 'WebSockets', 'TypeScript'],
      link: '#',
      repo: '#',
      color: '#10B981'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-page overflow-y-auto transition-colors duration-500 ease"
    >
      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        onClick={onBack}
        className="fixed top-6 left-6 z-[110] w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-[20px] sm:rounded-[28px] bg-card backdrop-blur-xl border border-transparent dark:border-white/5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-card-hover hover:-translate-y-1 transition-all duration-300 group"
        aria-label="Go back"
      >
        <ArrowLeft size={20} className="text-text-main group-hover:-translate-x-1 transition-transform" />
      </motion.button>

      {/* Content */}
      <main className="relative max-w-4xl mx-auto px-6 py-16 sm:py-24">
        
        {/* Header Section - No Border */}
        <div className="relative z-10 mb-24 sm:mb-32 pl-8 sm:pl-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-text-main mb-6 leading-[0.9]">
              {t('projectsTriggerTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed font-medium">
              {renderHeroDesc()}
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TimelineItem 
                project={project} 
                isLast={index === projects.length - 1} 
              />
            </motion.div>
          ))}
        </div>

        {/* Contact Section - No Border */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 sm:mt-20 pl-8 sm:pl-12 relative"
        >
          <div className="mb-16 pt-12">
            <h3 className="text-4xl sm:text-6xl font-black text-text-main mb-6 tracking-tight">
              {t('letsConnect')}
            </h3>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed">
              Interested in working together or just want to say hi? My inbox is always open.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Email Card */}
            <BentoCard 
              className="group" 
              index={0} 
              onClick={handleCopyEmail}
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm group-hover:scale-110 group-hover:border-text-main/20 transition-all duration-500">
                    {copied ? (
                      <Check size={20} className="sm:w-6 sm:h-6 text-text-main" strokeWidth={2} />
                    ) : (
                      <Mail size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="p-2 rounded-full bg-card border border-border text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy size={14} />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-text-main mb-1 tracking-tight">
                    {copied ? t('copied') : t('emailMe')}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-text-muted flex items-center gap-2 break-all">
                    {t('emailAddress')}
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* LinkedIn Card */}
            <BentoCard 
              className="group" 
              index={1} 
              hasArrow 
              onClick={() => window.open('https://linkedin.com/in/andermendz', '_blank')}
            >
              <div className="h-full flex flex-col justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm group-hover:scale-110 group-hover:bg-[#0077b5] group-hover:text-white group-hover:border-[#0077b5]/30 transition-all duration-500">
                  <Linkedin size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-text-main mb-1 tracking-tight transition-colors">
                    {t('linkedIn')}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-muted transition-colors flex items-center gap-2">
                    {t('linkedInHandle')}
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>
        </motion.section>
      </main>

      {/* Bottom Spacer */}
      <div className="h-16"></div>
    </motion.div>
  );
};