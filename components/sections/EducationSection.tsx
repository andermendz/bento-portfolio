import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="p-5 sm:p-6 md:p-8 lg:p-10 min-h-full flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full">
        <header className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary/70 mb-3">{t('educationTitle')}</h1>
          <h2 id="section-title-education" className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main mb-3 sm:mb-4 tracking-tight">{t('educationTitle')}</h2>
          <p className="text-text-muted text-base sm:text-lg max-w-3xl">{t('educationDesc')}</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pb-4 sm:pb-6">
          <article className="lg:col-span-2 p-6 sm:p-8 md:p-9 rounded-[24px] sm:rounded-[32px] bg-card-hover/75 border border-border hover:border-primary/20 transition-all group shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-5 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                <GraduationCap size={24} className="sm:hidden" />
                <GraduationCap size={32} className="hidden sm:block" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-main">{t('systemsEngineering')}</h3>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">2024</span>
                </div>
                <p className="text-text-main font-medium text-sm sm:text-base mb-1">Fundación Universitaria Tecnológico Comfenalco</p>
                <p className="text-text-muted text-xs sm:text-sm">{t('professionalDegree')} • Cartagena, Colombia</p>
              </div>
            </div>
          </article>

          <article className="p-6 sm:p-7 rounded-[24px] sm:rounded-[30px] bg-card-hover/65 border border-border hover:border-blue-500/20 transition-all group shadow-sm">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                <Award size={22} className="sm:hidden" />
                <Award size={28} className="hidden sm:block" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-text-main leading-tight">{t('webAppDevelopment')}</h3>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase text-blue-500 bg-blue-500/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">2021</span>
                </div>
                <p className="text-text-main font-medium text-sm sm:text-base mb-1">Universidad de Antioquia</p>
                <p className="text-text-muted text-xs sm:text-sm">{t('universityDiploma')}</p>
              </div>
            </div>
          </article>

          <article className="p-6 sm:p-7 rounded-[24px] sm:rounded-[30px] bg-card-hover/65 border border-border hover:border-emerald-500/20 transition-all group shadow-sm">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <BookOpen size={22} className="sm:hidden" />
                <BookOpen size={28} className="hidden sm:block" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-text-main leading-tight">{t('softwareDevTechnologist')}</h3>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">2022</span>
                </div>
                <p className="text-text-main font-medium text-sm sm:text-base mb-1">Fundación Universitaria Tecnológico Comfenalco</p>
                <p className="text-text-muted text-xs sm:text-sm">{t('technologistDegree')}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
