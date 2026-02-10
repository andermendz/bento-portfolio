import React from 'react';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="p-6 sm:p-8 md:p-12 lg:p-14 min-h-full">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary/70 mb-3">{t('experienceTitle')}</h1>
          <h2 id="section-title-experience" className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main mb-3 sm:mb-4 tracking-tight">{t('workExperience')}</h2>
          <p className="text-text-muted text-base sm:text-lg max-w-3xl">{t('workExperienceDesc')}</p>
        </header>
        
        <div className="space-y-6 sm:space-y-10 pb-4 sm:pb-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
          
          {/* Job 1 */}
          <article className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-card bg-primary text-primary-fg shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Building2 size={16} className="sm:hidden" />
              <Building2 size={20} className="hidden sm:block" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-card-hover/70 border border-border hover:border-primary/20 transition-colors shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="font-bold text-text-main text-base sm:text-xl">{t('softwareDeveloper')}</h3>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">{t('present')}</span>
              </div>
              <div className="text-text-muted font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Visbl</div>
              <p className="text-text-main/80 text-xs sm:text-sm leading-relaxed">
                {t('visblDesc')}
              </p>
            </div>
          </article>

          {/* Job 2 */}
          <article className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-card bg-card-hover text-text-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Building2 size={16} className="sm:hidden" />
              <Building2 size={20} className="hidden sm:block" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-card-hover/70 border border-border hover:border-text-muted/20 transition-colors shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="font-bold text-text-main text-base sm:text-xl">{t('fullStackDev')}</h3>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-text-muted bg-card px-2.5 sm:px-3 py-1 rounded-full w-fit border border-border">2023 - 2024</span>
              </div>
              <div className="text-text-muted font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Tecnológico Comfenalco</div>
              <p className="text-text-main/80 text-xs sm:text-sm leading-relaxed">
                {t('comfenalcoDesc')}
              </p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};
