import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 sm:mb-16 text-center sm:text-left">
          <h1 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-6">
            {t('educationTitle')}
          </h1>
          <h2 id="section-title-education" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-8 sm:mb-10">
            {t('academicBackground').split(' ')[0]}
            <br />
            <span className="text-text-muted/20">{t('academicBackground').split(' ')[1]}</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {t('educationDesc')}
          </p>
        </header>

        <div className="space-y-10 sm:space-y-16 relative">
          {/* Main Degree */}
          <article className="group relative">
            <div className="flex flex-col md:flex-row md:items-start gap-8 sm:gap-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[24px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform duration-500">
                <GraduationCap size={32} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl font-black text-text-main tracking-tight group-hover:text-primary transition-colors duration-500">
                    {t('systemsEngineering')}
                  </h3>
                  <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 w-fit">2024</span>
                </div>
                <p className="text-lg sm:text-xl 3xl:text-2xl text-text-main font-bold mb-2">Fundación Universitaria Tecnológico Comfenalco</p>
                <p className="text-text-muted text-sm sm:text-base 3xl:text-lg font-medium">{t('professionalDegree')} • Cartagena, Colombia</p>
              </div>
            </div>
          </article>

          <div className="h-px w-full bg-gradient-to-r from-border via-border to-transparent"></div>

          {/* Secondary Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
            <article className="group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">{t('webAppDevelopment')}</h3>
              <p className="text-text-main font-bold text-sm mb-2">Universidad de Antioquia</p>
              <p className="text-text-muted text-sm font-medium mb-4">{t('universityDiploma')}</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">2021</span>
            </article>

            <article className="group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">{t('softwareDevTechnologist')}</h3>
              <p className="text-text-main font-bold text-sm mb-2">Tecnológico Comfenalco</p>
              <p className="text-text-muted text-sm font-medium mb-4">{t('technologistDegree')}</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">2022</span>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
