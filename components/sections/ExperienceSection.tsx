import React from 'react';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-4 sm:mb-6 lg:mb-8 3xl:mb-16 text-center sm:text-left">
          <h1 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3 3xl:mb-6">
            {t('experienceTitle')}
          </h1>
          <h2 id="section-title-experience" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-4 3xl:mb-10">
            {t('workExperience')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {t('workExperienceDesc')}
          </p>
        </header>

        <div className="space-y-6 sm:space-y-8 lg:space-y-10 3xl:space-y-16 relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-border to-transparent"></div>
          
          {/* Job 1: Visbl Grouped Roles */}
          <article className="relative pl-12 sm:pl-16 3xl:pl-20">
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-8 h-8 sm:w-11 3xl:w-12 sm:h-11 3xl:h-12 rounded-full border-4 border-card bg-card-hover text-text-main shadow-xl flex items-center justify-center z-10">
              <Building2 size={16} className="sm:w-5 3xl:w-6 sm:h-5 3xl:h-6" />
            </div>
            
            <div className="group">
              <div className="flex items-center justify-between mb-6 3xl:mb-8">
                <div className="text-2xl sm:text-3xl 3xl:text-4xl font-black tracking-tight text-text-main">visbl</div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-text-main bg-card-hover px-4 py-1.5 rounded-full border border-border">{t('present')}</span>
              </div>

              <div className="space-y-8 3xl:space-y-12 relative before:absolute before:left-[-25px] before:top-2 before:bottom-2 before:w-px before:bg-border/30">
                {/* Current Role */}
                <div className="relative">
                  <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full border-2 border-text-main bg-card z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
                  <div className="flex flex-col mb-3 3xl:mb-4">
                    <h3 className="font-bold text-text-main text-lg sm:text-xl 3xl:text-2xl leading-none">{t('technicalLead')}</h3>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest mt-2 3xl:mt-3 opacity-60">Mar 2026 — {t('present')}</span>
                  </div>
                  <p className="text-text-muted text-sm sm:text-base 3xl:text-lg leading-relaxed max-w-2xl font-medium">
                    {t('visblDesc')}
                  </p>
                </div>

                {/* Previous Role */}
                <div className="relative opacity-60 hover:opacity-100 transition-opacity">
                  <div className="absolute left-[-31px] top-1.5 w-3 h-3 rounded-full border-2 border-border bg-card z-10"></div>
                  <div className="flex flex-col mb-3 3xl:mb-4">
                    <h3 className="font-bold text-text-main text-lg sm:text-xl 3xl:text-2xl leading-none">{t('softwareDeveloper')}</h3>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-widest mt-2 3xl:mt-3">Mar 2025 — Mar 2026</span>
                  </div>
                  <p className="text-text-muted text-sm sm:text-base 3xl:text-lg leading-relaxed max-w-2xl">
                    {t('visblPrevDesc')}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Job 2: Comfenalco */}
          <article className="relative pl-12 sm:pl-16 3xl:pl-20 opacity-50 hover:opacity-100 transition-opacity">
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-8 h-8 sm:w-11 3xl:w-12 sm:h-11 3xl:h-12 rounded-full border-4 border-card bg-card-hover text-text-muted shadow-lg flex items-center justify-center z-10">
              <Building2 size={16} className="sm:w-5 3xl:w-6 sm:h-5 3xl:h-6" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4 3xl:mb-6">
                <div className="text-xl sm:text-2xl 3xl:text-3xl font-black text-text-main tracking-tight">Comfenalco</div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-text-muted border border-border px-4 py-1.5 rounded-full">2023 - 2024</span>
              </div>
              
              <div className="flex flex-col mb-3 3xl:mb-4">
                <h3 className="font-bold text-text-main text-lg sm:text-xl 3xl:text-2xl leading-none">{t('fullStackDev')}</h3>
              </div>
              <p className="text-text-muted text-sm sm:text-base 3xl:text-lg leading-relaxed max-w-2xl">
                {t('comfenalcoDesc')}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
