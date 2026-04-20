import React from 'react';
import { Mic } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-5 sm:mb-7 lg:mb-9 3xl:mb-16 text-center sm:text-left">
          <h1 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3 3xl:mb-6">
            {t('projectsTitle')}
          </h1>
          <h2
            id="section-title-projects"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-4 3xl:mb-10"
          >
            {t('projectsHeadline')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {t('projectsSectionDesc')}
          </p>
        </header>

        <article className="relative rounded-[24px] sm:rounded-[32px] border border-border bg-card-hover/50 p-6 sm:p-8 lg:p-10 3xl:p-12">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 3xl:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Mic size={24} className="sm:w-7 sm:h-7" strokeWidth={1.5} aria-hidden />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="text-xl sm:text-2xl 3xl:text-3xl font-black text-text-main tracking-tight">{t('escribboName')}</h3>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-primary bg-card px-4 py-1.5 rounded-full border border-border">
                {t('openSourceProject')}
              </span>
            </div>
          </div>

          <p className="text-text-muted text-sm sm:text-base 3xl:text-lg leading-relaxed max-w-2xl mb-6 3xl:mb-8 font-medium">
            {t('escribboDesc')}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="https://www.escribbo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-card border border-border text-sm font-bold text-text-main hover:border-primary/30 hover:bg-card-hover transition-colors"
            >
              {t('escribboWebsite')}
            </a>
            <a
              href="https://github.com/andermendz/escribbo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-card border border-border text-sm font-bold text-text-main hover:border-primary/30 hover:bg-card-hover transition-colors"
            >
              {t('escribboRepo')}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};
