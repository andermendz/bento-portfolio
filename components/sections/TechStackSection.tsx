import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const TechStackSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 sm:mb-20 text-center sm:text-left">
          <h1 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-6">
            {t('techStackTitle')}
          </h1>
          <h2 id="section-title-stack" className="text-4xl sm:text-6xl md:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-10">
            Technical
            <br />
            <span className="text-text-muted/20">Arsenal.</span>
          </h2>
          <p className="text-lg sm:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {t('technicalArsenalDesc')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 pb-12">
          {/* Frontend */}
          <div className="space-y-8">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('frontend')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'React', color: '#61DAFB' },
                { name: 'Next.js', color: 'var(--next-hover)' },
                { name: 'TypeScript', color: '#3178C6' },
                { name: 'Tailwind CSS', color: '#06B6D4' },
                { name: 'Vue.js', color: '#41B883' },
                { name: 'Framer Motion', color: '#FF0080' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="space-y-8">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('backend')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Node.js', color: '#339933' },
                { name: 'Python', color: '#3776AB' },
                { name: 'PHP (Laravel)', color: '#FF2D20' },
                { name: 'Docker', color: '#2496ED' },
                { name: 'GraphQL', color: '#E10098' },
                { name: 'NestJS', color: '#E0234E' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </div>

          {/* AI & Machine Learning */}
          <div className="space-y-8">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('aiMl')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Gemini API', color: '#8E75FF' },
                { name: 'OpenAI', color: 'var(--ai-hover)' },
                { name: 'PyTorch', color: '#EE4C2C' },
                { name: 'TensorFlow', color: '#FF6F00' },
                { name: 'LangChain', color: '#3BE0C0' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </div>

          {/* Database */}
          <div className="space-y-8">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('database')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'PostgreSQL', color: '#4169E1' },
                { name: 'MongoDB', color: '#47A248' },
                { name: 'Redis', color: '#DC382D' },
                { name: 'Supabase', color: '#3ECF8E' },
                { name: 'Prisma', color: '#16A394' },
                { name: 'Pinecone', color: 'var(--ai-hover)' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechTag: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <span 
    className="px-5 py-2.5 rounded-xl bg-card-hover text-text-muted text-xs font-bold border border-border transition-all duration-300 cursor-default hover:scale-105 hover:text-text-main"
    onMouseEnter={(e) => {
      const targetColor = color.startsWith('var(') ? getComputedStyle(document.documentElement).getPropertyValue(color.match(/\(([^)]+)\)/)![1]).trim() : color;
      e.currentTarget.style.color = targetColor;
      e.currentTarget.style.borderColor = `${targetColor}40`;
      e.currentTarget.style.boxShadow = `0 0 15px ${targetColor}15`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = '';
      e.currentTarget.style.borderColor = '';
      e.currentTarget.style.boxShadow = '';
    }}
  >
    {name}
  </span>
);
