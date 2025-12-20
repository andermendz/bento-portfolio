import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code2,
  Layers,
  Mail,
  Linkedin,
  Sparkles,
  Check,
  Copy
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { BentoCard } from './BentoCard';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t } = useLanguage();

  return (
    <BentoCard 
      noPadding 
      className="group overflow-hidden"
      index={index}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Side: Info */}
        <div className="flex flex-col justify-between p-8 sm:p-10 z-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: project.color }}
              >
                <Code2 size={24} />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tagIndex * 0.1 }}
                    className="px-2.5 py-1 rounded-lg bg-card-hover border border-border text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-text-main transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-text-main mb-4 tracking-tight leading-tight">
              {t(project.titleKey as any)}
            </h3>
            <p className="text-base text-text-muted leading-relaxed mb-8 max-w-lg">
              {t(project.descKey as any)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-text-main text-page text-xs font-bold shadow-sm hover:shadow-md transition-all"
            >
              <ExternalLink size={14} />
              Live Demo
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card-hover border border-border text-text-main text-xs font-bold hover:border-primary/20 transition-all"
            >
              <Github size={14} />
              Source
            </motion.a>
          </div>
        </div>

        {/* Right Side: Enhanced Visual */}
        <div className="relative aspect-video lg:aspect-auto h-full min-h-[300px] bg-gradient-to-br from-card-hover to-card border-l border-border group-hover:border-primary/10 transition-all duration-500 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
               style={{ backgroundImage: `radial-gradient(${project.color} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
          
          <div
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle at 70% 30%, ${project.color}40, transparent 70%)` }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative"
            >
              <div className="absolute inset-0 blur-3xl opacity-20" style={{ backgroundColor: project.color }}></div>
              <Layers size={80} className="relative text-text-muted/20 group-hover:text-text-muted/40 transition-colors duration-500" />
            </motion.div>
          </div>

          {/* Floating Badge */}
          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-card/80 backdrop-blur-md border border-border text-[10px] font-bold uppercase tracking-widest text-text-main shadow-lg flex items-center gap-2">
            <Sparkles size={12} className="text-primary" />
            Case Study Soon
          </div>

          {/* Project Number */}
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center text-xs font-black text-text-muted group-hover:text-text-main transition-colors">
            0{index + 1}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

export const ProjectsView: React.FC<{ onBack: () => void; theme: 'light' | 'dark' }> = ({ onBack, theme }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Parse the hero description with styled spans
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
      {/* Floating Back Button - Direct implementation to ensure visibility */}
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
      <main className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-text-main mb-8 leading-[0.85] transition-colors duration-500 ease">
              {t('projectsTriggerTitle')}
            </h2>
            <p className="text-xl sm:text-2xl text-text-muted max-w-2xl leading-relaxed font-medium transition-colors duration-500 ease">
              {renderHeroDesc()}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:gap-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Enhanced Contact Section - Bento Style */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 sm:mt-48"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-6xl font-black text-text-main mb-6 tracking-tight">
              {t('letsConnect')}
            </h3>
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Interested in working together or just want to say hi? My inbox is always open.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {/* Email Card - With Copy Functionality */}
            <BentoCard 
              className="group" 
              index={0} 
              onClick={handleCopyEmail}
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                    {copied ? (
                      <Check size={20} className="sm:w-6 sm:h-6 text-emerald-500" strokeWidth={2} />
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

            {/* LinkedIn Card - Icon Background Change Only */}
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