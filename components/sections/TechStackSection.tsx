import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const TechStackSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="w-full p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col min-h-full items-center">
      <header className="text-center mb-6 sm:mb-8 w-full">
        <h1 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary/70 mb-3">{t('techStackTitle')}</h1>
        <h2 id="section-title-stack" className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main mb-4 sm:mb-5 tracking-tight">{t('technicalArsenal')}</h2>
        <p className="text-text-muted max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
          {t('technicalArsenalDesc')}
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-6xl mx-auto pb-4 sm:pb-6">
        
        {/* Frontend */}
        <article className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover/70 border border-border transition-all duration-300">
           <h3 className="text-base sm:text-xl font-bold text-text-main mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
             <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
             {t('frontend')}
           </h3>
           <div className="flex flex-wrap gap-2">
             {[
               { name: 'React', color: '#61DAFB' },
               { name: 'Next.js', color: '#ffffff' },
               { name: 'TypeScript', color: '#3178C6' },
               { name: 'Tailwind CSS', color: '#06B6D4' },
               { name: 'Vue.js', color: '#42B883' },
               { name: 'Framer Motion', color: '#FF0080' },
             ].map(tech => (
               <span 
                 key={tech.name} 
                 className="px-4 py-2 rounded-xl bg-card text-text-muted text-sm font-medium border border-border transition-all duration-300 cursor-default hover:scale-105 hover:border-transparent"
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = tech.color;
                   e.currentTarget.style.backgroundColor = `${tech.color}10`;
                   e.currentTarget.style.borderColor = `${tech.color}30`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = '';
                   e.currentTarget.style.backgroundColor = '';
                   e.currentTarget.style.borderColor = '';
                 }}
               >{tech.name}</span>
             ))}
           </div>
        </article>

        {/* Backend */}
        <article className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover/70 border border-border transition-all duration-300">
           <h3 className="text-base sm:text-xl font-bold text-text-main mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
             {t('backend')}
           </h3>
           <div className="flex flex-wrap gap-2">
             {[
               { name: 'Node.js', color: '#68A063' },
               { name: 'PHP (Laravel)', color: '#FF2D20' },
               { name: 'Python', color: '#FFD43B' },
               { name: 'Docker', color: '#2496ED' },
               { name: 'GraphQL', color: '#E10098' },
               { name: 'Express', color: '#ffffff' },
               { name: 'NestJS', color: '#E0234E' },
             ].map(tech => (
               <span 
                 key={tech.name} 
                 className="px-4 py-2 rounded-xl bg-card text-text-muted text-sm font-medium border border-border transition-all duration-300 cursor-default hover:scale-105 hover:border-transparent"
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = tech.color;
                   e.currentTarget.style.backgroundColor = `${tech.color}10`;
                   e.currentTarget.style.borderColor = `${tech.color}30`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = '';
                   e.currentTarget.style.backgroundColor = '';
                   e.currentTarget.style.borderColor = '';
                 }}
               >{tech.name}</span>
             ))}
           </div>
        </article>

        {/* AI & Machine Learning */}
        <article className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover/70 border border-border transition-all duration-300">
           <h3 className="text-base sm:text-xl font-bold text-text-main mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
             <div className="w-2 h-2 rounded-full bg-purple-500"></div>
             {t('aiMl')}
           </h3>
           <div className="flex flex-wrap gap-2">
             {[
               { name: 'Gemini API', color: '#8B5CF6' },
               { name: 'OpenAI', color: '#10A37F' },
               { name: 'PyTorch', color: '#EE4C2C' },
               { name: 'TensorFlow', color: '#FF6F00' },
               { name: 'Hugging Face', color: '#FFD21E' },
               { name: 'LangChain', color: '#3BE0C0' },
             ].map(tech => (
               <span 
                 key={tech.name} 
                 className="px-4 py-2 rounded-xl bg-card text-text-muted text-sm font-medium border border-border transition-all duration-300 cursor-default hover:scale-105 hover:border-transparent"
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = tech.color;
                   e.currentTarget.style.backgroundColor = `${tech.color}10`;
                   e.currentTarget.style.borderColor = `${tech.color}30`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = '';
                   e.currentTarget.style.backgroundColor = '';
                   e.currentTarget.style.borderColor = '';
                 }}
               >{tech.name}</span>
             ))}
           </div>
        </article>

        {/* Database */}
        <article className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover/70 border border-border transition-all duration-300">
           <h3 className="text-base sm:text-xl font-bold text-text-main mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
             <div className="w-2 h-2 rounded-full bg-orange-500"></div>
             {t('database')}
           </h3>
           <div className="flex flex-wrap gap-2">
             {[
               { name: 'PostgreSQL', color: '#336791' },
               { name: 'MongoDB', color: '#00ED64' },
               { name: 'Redis', color: '#DC382D' },
               { name: 'Pinecone', color: '#ffffff' },
               { name: 'Supabase', color: '#3FCF8E' },
               { name: 'Prisma', color: '#5A67D8' },
             ].map(tech => (
               <span 
                 key={tech.name} 
                 className="px-4 py-2 rounded-xl bg-card text-text-muted text-sm font-medium border border-border transition-all duration-300 cursor-default hover:scale-105 hover:border-transparent"
                 onMouseEnter={(e) => {
                   e.currentTarget.style.color = tech.color;
                   e.currentTarget.style.backgroundColor = `${tech.color}10`;
                   e.currentTarget.style.borderColor = `${tech.color}30`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.color = '';
                   e.currentTarget.style.backgroundColor = '';
                   e.currentTarget.style.borderColor = '';
                 }}
               >{tech.name}</span>
             ))}
           </div>
        </article>
      </div>
    </section>
  );
};
