import React from 'react';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="p-5 sm:p-6 md:p-8 lg:p-10 min-h-full flex flex-col items-center">
      <div className="max-w-5xl mx-auto w-full">
        <header className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary/70 mb-3">{t('experienceTitle')}</h1>
          <h2 id="section-title-experience" className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main mb-3 sm:mb-4 tracking-tight">{t('workExperience')}</h2>
          <p className="text-text-muted text-base sm:text-lg max-w-3xl">{t('workExperienceDesc')}</p>
        </header>
        
        <div className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
          
          {/* Job 1: Visbl Grouped Roles */}
          <article className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-card bg-primary text-primary-fg shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Building2 size={16} className="sm:hidden" />
              <Building2 size={20} className="hidden sm:block" />
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-card-hover/70 border border-border hover:border-primary/20 transition-colors shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="text-text-main font-black text-xl sm:text-2xl tracking-tight">Visbl</div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full">{t('present')}</span>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border/50">
                {/* Current Role */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-card z-10"></div>
                  <div className="flex flex-col mb-1">
                    <h3 className="font-bold text-text-main text-base sm:text-lg leading-none">{t('technicalLead')}</h3>
                    <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-1.5">Mar 2024 — {t('present')}</span>
                  </div>
                  <p className="text-text-main/70 text-xs sm:text-sm leading-relaxed mt-2">
                    {t('visblDesc')}
                  </p>
                </div>

                {/* Previous Role */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-border bg-card z-10"></div>
                  <div className="flex flex-col mb-1">
                    <h3 className="font-bold text-text-main/80 text-base sm:text-lg leading-none">{t('softwareDeveloper')}</h3>
                    <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-1.5">2023 — Mar 2024</span>
                  </div>
                  <p className="text-text-main/60 text-xs sm:text-sm leading-relaxed mt-2">
                    Developing core platform features and maintaining robust software architecture.
                  </p>
                </div>
              </div>
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
