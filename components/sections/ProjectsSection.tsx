import React from 'react';
import { Construction, Coffee, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

export const ProjectsSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="p-5 sm:p-6 md:p-8 lg:p-10 min-h-full flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full text-center space-y-6 py-4">
        {/* Under Construction Card */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full rounded-[30px] sm:rounded-[36px] border border-border bg-card px-6 sm:px-8 py-8 sm:py-10"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-500">
            <Construction size={34} strokeWidth={1.8} className="sm:hidden" />
            <Construction size={42} strokeWidth={1.8} className="hidden sm:block" />
          </div>

          <h2 id="section-title-projects" className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
            {language === 'es' ? 'Sección en construcción' : 'Under Construction'}
          </h2>

          <p className="mt-3 text-text-muted text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            {language === 'es'
              ? 'Estoy un poco ocupado ahora mismo construyendo cosas geniales. Vuelve pronto para ver esta sección completa.'
              : "I'm kinda busy right now building some cool stuff. Come back soon for the full section."}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card-hover px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-text-muted">
              <Hammer size={14} />
              Work in progress
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card-hover px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-text-muted">
              <Coffee size={14} />
              {language === 'es' ? 'Cargando cafeína' : 'Loading caffeine'}
            </span>
          </div>
        </motion.div>

        {/* Ghost project cards for context — hidden on mobile to avoid wasted scroll */}
        <div className="hidden md:grid md:grid-cols-3 gap-3 sm:gap-4 opacity-25 pointer-events-none select-none">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video rounded-2xl sm:rounded-3xl border border-border bg-card-hover/50" />
          ))}
        </div>
      </div>
    </section>
  );
};
