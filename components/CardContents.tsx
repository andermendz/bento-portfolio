import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Database, 
  Code2, 
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Brain,
  Cpu,
  Sparkles,
  Layout,
  Server
} from 'lucide-react';
import type { ContentWithCopyProps } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

// ----- INTRO CONTENT -----

export const IntroContent: React.FC = () => {
  const { t } = useLanguage();
  
  // Parse the bio text with styled spans
  const renderBio = () => {
    const bioText = t('introBio');
    const parts = bioText.split(/(<scalable>.*?<\/scalable>|<performance>.*?<\/performance>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<scalable>')) {
        const text = part.replace(/<\/?scalable>/g, '');
        return <span key={index} className="text-text-main font-semibold">{text}</span>;
      }
      if (part.startsWith('<performance>')) {
        const text = part.replace(/<\/?performance>/g, '');
        return <span key={index} className="text-text-main font-semibold">{text}</span>;
      }
      return part;
    });
  };

  return (
    <div className="relative h-full flex flex-col justify-between">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      {/* Top Section: Status Badge */}
      <div className="relative z-10 flex justify-end">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-card border border-border shadow-sm transition-all hover:border-emerald-500/20 cursor-default group">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted group-hover:text-text-main transition-colors">{t('availableForWork')}</span>
        </div>
      </div>

      {/* Bottom Section: Name + Bio */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mt-auto">
        <div className="relative bottom-[-4px]">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.85] text-text-main">
            Anderson
          </h1>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.85] text-text-muted/20">
            Mendoza.
          </h1>
        </div>

        <div className="md:max-w-[160px] md:text-right pb-1">
          <p className="text-xs text-text-muted font-medium leading-relaxed">
            {renderBio()}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----- SOCIALS CONTENT -----

export const SocialsContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col h-full gap-3 w-full">
      {/* Platforms */}
      <div className="flex-1 flex gap-3 min-h-0">
        <a 
          href="https://github.com/andermendz" 
          target="_blank" 
          rel="noreferrer"
          className="relative flex-1 flex flex-col items-center justify-center rounded-[24px] bg-card-hover border border-border group/social overflow-hidden transition-all duration-300 hover:border-text-main/20 hover:bg-text-main"
        >
          <Github size={32} className="text-text-main transition-all duration-300 group-hover/social:text-page group-hover/social:scale-110" />
        </a>

        <a 
          href="https://linkedin.com/in/andermendz" 
          target="_blank" 
          rel="noreferrer"
          className="relative flex-1 flex flex-col items-center justify-center rounded-[24px] bg-card-hover border border-border group/social overflow-hidden transition-all duration-300 hover:border-[#0077b5]/30 hover:bg-[#0077b5]"
        >
          <Linkedin size={32} className="text-text-main transition-all duration-300 group-hover/social:text-white group-hover/social:scale-110" />
        </a>
      </div>

      {/* Contact Action */}
      <a 
        href="https://linkedin.com/in/andermendz"
        target="_blank"
        rel="noreferrer"
        className="relative h-14 w-full bg-text-main rounded-[24px] flex items-center justify-between px-6 gap-2 text-page font-bold shadow-md transition-all overflow-hidden group hover:shadow-xl active:scale-[0.98] cursor-pointer"
      >
        <span className="relative z-10 text-sm tracking-wide">{t('letsConnect')}</span>
        <div className="relative z-10 w-8 h-8 rounded-full bg-page/20 flex items-center justify-center group-hover:bg-page group-hover:text-text-main transition-colors">
          <ArrowUpRight size={16} />
        </div>
      </a>
    </div>
  );
};

// ----- TECH ICON COMPONENT -----

const TechIcon: React.FC<{ icon: React.ReactNode; label: string; hoverColor: string }> = ({ icon, label, hoverColor }) => (
  <div 
    className="group/tech flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-card-hover border border-border/50 shrink-0 shadow-sm cursor-default transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-[var(--hover-color)]"
    style={{ ['--hover-color' as string]: hoverColor }}
  >
    <span className="text-text-muted transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">
      {icon}
    </span>
    <span className="text-xs font-semibold text-text-main whitespace-nowrap transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">
      {label}
    </span>
  </div>
);

// ----- TECH STACK CONTENT -----

export const TechStackContent: React.FC = () => {
  const row1 = [
    { icon: <Code2 size={14} />, label: "React", hoverColor: "#61DAFB" },
    { icon: <Cpu size={14} />, label: "Next.js", hoverColor: "#ffffff" },
    { icon: <Terminal size={14} />, label: "TypeScript", hoverColor: "#3178C6" },
    { icon: <Layout size={14} />, label: "Tailwind", hoverColor: "#06B6D4" },
    { icon: <Brain size={14} />, label: "Gemini API", hoverColor: "#8B5CF6" },
    { icon: <Database size={14} />, label: "PostgreSQL", hoverColor: "#336791" },
  ];

  const row2 = [
    { icon: <Server size={14} />, label: "Node.js", hoverColor: "#68A063" },
    { icon: <Code2 size={14} />, label: "Python", hoverColor: "#FFD43B" },
    { icon: <Database size={14} />, label: "MongoDB", hoverColor: "#00ED64" },
    { icon: <Layout size={14} />, label: "Framer Motion", hoverColor: "#FF0080" },
    { icon: <Terminal size={14} />, label: "Docker", hoverColor: "#2496ED" },
    { icon: <Database size={14} />, label: "Redis", hoverColor: "#DC382D" },
  ];

  return (
    <div className="flex flex-col flex-1 justify-center w-full relative overflow-hidden mask-linear-fade">
      {/* Row 1 */}
      <div className="flex gap-3 overflow-x-hidden overflow-y-visible w-full mb-3 py-1">
        <div className="flex shrink-0 animate-marquee items-center gap-3">
          {row1.map((item, i) => <TechIcon key={`r1-${i}`} {...item} />)}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-3">
          {row1.map((item, i) => <TechIcon key={`r1-d-${i}`} {...item} />)}
        </div>
      </div>
  
      {/* Row 2 */}
      <div className="flex gap-3 overflow-x-hidden overflow-y-visible w-full py-1">
        <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">
          {row2.map((item, i) => <TechIcon key={`r2-${i}`} {...item} />)}
        </div>
        <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">
          {row2.map((item, i) => <TechIcon key={`r2-d-${i}`} {...item} />)}
        </div>
      </div>
    </div>
  );
};

// ----- ABOUT CONTENT -----

export const AboutContent: React.FC = () => {
  const { t } = useLanguage();
  
  // Parse the about phrase with styled spans
  const renderPhrase = () => {
    const phrase = t('aboutPhrase');
    const parts = phrase.split(/(<details>.*?<\/details>|<performance>.*?<\/performance>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<details>')) {
        const text = part.replace(/<\/?details>/g, '');
        return <span key={index} className="text-text-muted decoration-1 underline decoration-border underline-offset-4">{text}</span>;
      }
      if (part.startsWith('<performance>')) {
        const text = part.replace(/<\/?performance>/g, '');
        return <span key={index} className="text-text-muted decoration-1 underline decoration-border underline-offset-4">{text}</span>;
      }
      return part;
    });
  };

  return (
    <div className="h-full flex flex-col justify-end relative z-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center text-text-main border border-border shadow-sm">
          <Sparkles size={18} strokeWidth={1.5} />
        </div>
        <p className="text-xl sm:text-2xl font-medium text-text-main leading-tight tracking-tight">
          {renderPhrase()}
        </p>
      </div>
    </div>
  );
};

// ----- EXPERIENCE CONTENT -----

export const ExperienceContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-auto space-y-4">
      <div className="flex items-center gap-4 group">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main group-hover:border-primary/20 transition-colors shadow-sm shrink-0">
          <Briefcase size={20} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-text-main font-bold text-base sm:text-lg leading-none mb-1">Visbl</p>
          <p className="text-text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wide">{t('softwareDeveloper')}</p>
        </div>
      </div>
      <div className="w-full h-px bg-border"></div>
      <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shrink-0">
          <Briefcase size={20} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-text-main font-bold text-base sm:text-lg leading-none mb-1">Comfenalco</p>
          <p className="text-text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wide">{t('fullStackDev')}</p>
        </div>
      </div>
    </div>
  );
};

// ----- EDUCATION CONTENT -----

export const EducationContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="h-full flex flex-col justify-end">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 p-24 bg-gradient-to-br from-primary/5 to-purple-500/5 blur-[60px] rounded-full pointer-events-none z-0"></div>
      
      <div className="mt-auto space-y-3 relative z-10">
        <div className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm">
          <GraduationCap size={20} strokeWidth={1.5} />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-text-main leading-tight mb-1">{t('systemsEngineering').split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}</h3>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <p className="text-text-muted text-xs font-medium">{t('technologicalUniversity')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- CONTACT CONTENT -----

export const ContactContent: React.FC<ContentWithCopyProps> = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col justify-between h-full relative z-10">
      <div className="max-w-[80%]">
        <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm mb-4">
          <Mail size={24} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-semibold text-text-main mb-2 tracking-tight">
          {t('contactTitle')}
        </h3>
      </div>
      <div className="w-full">
        <a 
          href="https://linkedin.com/in/andermendz"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 px-5 py-4 rounded-[20px] bg-card hover:bg-card-hover border border-border transition-all text-sm group w-full shadow-sm hover:shadow-lg hover:border-primary/20 active:scale-[0.99]"
        >
          <span className="truncate font-medium text-text-muted group-hover:text-text-main transition-colors">{t('connectOnLinkedIn')}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-all shrink-0 bg-border/50 text-text-muted group-hover:bg-primary group-hover:text-primary-fg">
            {t('open')}
          </span>
        </a>
      </div>
    </div>
  );
};
