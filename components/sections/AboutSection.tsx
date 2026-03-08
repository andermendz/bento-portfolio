import React from 'react';
import { Layout, Zap } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="p-5 sm:p-6 md:p-8 lg:p-10 3xl:p-16 min-h-full flex flex-col items-center">
      <div className="max-w-6xl 3xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-4 sm:gap-5 3xl:gap-8 w-full">
        <article className="rounded-[24px] sm:rounded-[32px] 3xl:rounded-[48px] border border-border bg-card-hover/65 p-6 sm:p-8 md:p-10 3xl:p-16">
          <h1 className="text-[10px] sm:text-xs 3xl:text-sm font-bold text-primary uppercase tracking-[0.22em] mb-4 sm:mb-5 3xl:mb-8">
            {t('aboutTitle')}
          </h1>
          <h2 id="section-title-about" className="text-3xl sm:text-4xl md:text-5xl 3xl:text-7xl font-black text-text-main mb-5 sm:mb-6 3xl:mb-10 leading-[0.95] tracking-tight">
            {t('systemsEngineering')}
            <br />
            <span className="text-text-muted">{t('scalableArchitect')}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg 3xl:text-xl text-text-muted leading-relaxed sm:leading-loose 3xl:leading-extra-relaxed">
            {t('bioText')}
          </p>
        </article>

        <aside className="rounded-[24px] sm:rounded-[32px] 3xl:rounded-[48px] border border-border bg-card-hover/45 p-6 sm:p-7 md:p-8 3xl:p-12">
          <h3 className="text-[10px] sm:text-xs 3xl:text-sm font-bold uppercase tracking-[0.22em] text-text-muted mb-4 sm:mb-5 3xl:mb-8">{t('profile')}</h3>
          <div className="flex flex-wrap gap-2.5 3xl:gap-4">
            <span className="px-4 py-2 3xl:px-6 3xl:py-3 rounded-xl 3xl:rounded-2xl bg-card text-text-main text-xs 3xl:text-sm font-semibold border border-border shadow-sm">{t('proactive')}</span>
            <span className="px-4 py-2 3xl:px-6 3xl:py-3 rounded-xl 3xl:rounded-2xl bg-card text-text-main text-xs 3xl:text-sm font-semibold border border-border shadow-sm">{t('detailOriented')}</span>
            <span className="px-4 py-2 3xl:px-6 3xl:py-3 rounded-xl 3xl:rounded-2xl bg-card text-text-main text-xs 3xl:text-sm font-semibold border border-border shadow-sm">{t('problemSolver')}</span>
          </div>
        </aside>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 3xl:gap-8">
          <section className="group rounded-[24px] sm:rounded-[30px] 3xl:rounded-[40px] border border-border bg-card-hover/60 p-5 sm:p-6 3xl:p-10 transition-all duration-300 hover:border-blue-500/20 hover:bg-card-hover">
            <div className="flex items-start gap-4 3xl:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 3xl:w-16 3xl:h-16 rounded-xl sm:rounded-2xl 3xl:rounded-3xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
                <Layout size={18} className="sm:hidden" />
                <Layout size={20} className="hidden sm:block 3xl:hidden" />
                <Layout size={28} className="hidden 3xl:block" />
              </div>
              <div className="min-w-0">
                <h4 className="text-text-main font-bold text-sm sm:text-base 3xl:text-xl mb-1.5 sm:mb-2 3xl:mb-3">{t('userCentricDesign')}</h4>
                <p className="text-text-muted text-xs sm:text-sm 3xl:text-base leading-relaxed">{t('userCentricDesignDesc')}</p>
              </div>
            </div>
          </section>

          <section className="group rounded-[24px] sm:rounded-[30px] 3xl:rounded-[40px] border border-border bg-card-hover/60 p-5 sm:p-6 3xl:p-10 transition-all duration-300 hover:border-amber-500/20 hover:bg-card-hover">
            <div className="flex items-start gap-4 3xl:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 3xl:w-16 3xl:h-16 rounded-xl sm:rounded-2xl 3xl:rounded-3xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
                <Zap size={18} className="sm:hidden" />
                <Zap size={20} className="hidden sm:block 3xl:hidden" />
                <Zap size={28} className="hidden 3xl:block" />
              </div>
              <div className="min-w-0">
                <h4 className="text-text-main font-bold text-sm sm:text-base 3xl:text-xl mb-1.5 sm:mb-2 3xl:mb-3">{t('performanceFirst')}</h4>
                <p className="text-text-muted text-xs sm:text-sm 3xl:text-base leading-relaxed">{t('performanceFirstDesc')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
