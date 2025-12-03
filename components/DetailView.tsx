import React, { useEffect, useRef } from 'react';
import { X, Building2, GraduationCap, Award, BookOpen, Layout, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

interface DetailViewProps {
  onClose: () => void;
  type: string;
  layoutId?: string;
}

export const DetailView: React.FC<DetailViewProps> = ({ onClose, type, layoutId }) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus management
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement;
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <>
      {/* Backdrop with smooth blur transition */}
      <motion.div 
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} 
        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }} 
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-overlay"
        onClick={onClose} 
      />
      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-4 pb-24 sm:pb-8 px-3 sm:px-8 pointer-events-none overflow-y-auto">
        <motion.div
          ref={modalRef}
          layoutId={layoutId}
          className="relative w-full max-w-5xl my-auto bg-card rounded-[24px] sm:rounded-[40px] border border-border overflow-hidden flex flex-col shadow-2xl pointer-events-auto ring-1 ring-white/10 max-h-[calc(100vh-8rem)] sm:max-h-[85vh]"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${type}`}
          initial={{ scale: 0.92, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ 
            layout: { 
              type: 'spring', 
              stiffness: 200, 
              damping: 28,
              mass: 0.8
            },
            scale: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
            opacity: { duration: 0.3, ease: 'easeOut' }
          }}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/90 backdrop-blur-md hover:bg-text-main hover:text-page flex items-center justify-center text-text-main transition-all active:scale-90 border border-border shadow-md"
          >
            <X size={18} className="sm:hidden" />
            <X size={20} className="hidden sm:block" />
          </motion.button>

          {/* Content Wrapper with staggered fade-in */}
          <motion.div 
            className="flex flex-col w-full h-full overflow-y-auto overscroll-contain touch-pan-y relative z-10 modal-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              delay: 0.15, 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            
            {/* ABOUT MODAL */}
            {type === 'about' && (
              <div className="flex flex-col md:flex-row min-h-full">
                <div className="w-full md:w-2/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-card-hover md:border-r border-b md:border-b-0 border-border">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6 sm:mb-8 opacity-60 mt-6 sm:mt-0">{t('profile')}</h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main mb-4 sm:mb-6 leading-tight tracking-tight">
                    {t('systemsEngineering').split(' ')[0]}<br/> <span className="text-text-muted">{t('scalableArchitect')}</span>
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-auto">
                     <span className="px-4 py-2 rounded-xl bg-card text-text-main text-xs font-medium border border-border shadow-sm">{t('proactive')}</span>
                     <span className="px-4 py-2 rounded-xl bg-card text-text-main text-xs font-medium border border-border shadow-sm">{t('detailOriented')}</span>
                     <span className="px-4 py-2 rounded-xl bg-card text-text-main text-xs font-medium border border-border shadow-sm">{t('problemSolver')}</span>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 pb-8 sm:pb-10 bg-card">
                  <div className="space-y-8 sm:space-y-10">
                    <div>
                      <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">{t('bio')}</h3>
                      <p className="text-text-main leading-relaxed sm:leading-loose text-base sm:text-lg font-light">
                        {t('bioText')}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">{t('philosophy')}</h3>
                      <div className="grid gap-3 sm:gap-4 pb-2 sm:pb-4">
                         {/* Item 1 */}
                         <div className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-card-hover/40 hover:bg-card-hover border border-border hover:border-blue-500/20 transition-all duration-300">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
                               <Layout size={18} className="sm:hidden" />
                               <Layout size={20} className="hidden sm:block" />
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                               <h4 className="text-text-main font-bold text-sm sm:text-base mb-1.5 sm:mb-2">{t('userCentricDesign')}</h4>
                               <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                                  {t('userCentricDesignDesc')}
                               </p>
                            </div>
                         </div>

                         {/* Item 2 */}
                         <div className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-card-hover/40 hover:bg-card-hover border border-border hover:border-amber-500/20 transition-all duration-300">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
                               <Zap size={18} className="sm:hidden" />
                               <Zap size={20} className="hidden sm:block" />
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                               <h4 className="text-text-main font-bold text-sm sm:text-base mb-1.5 sm:mb-2">{t('performanceFirst')}</h4>
                               <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                                  {t('performanceFirstDesc')}
                               </p>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCE MODAL */}
            {type === 'experience' && (
              <div className="p-6 sm:p-8 md:p-12 pb-8 sm:pb-10 bg-card min-h-full">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8 sm:mb-10 mt-6 sm:mt-0">
                     <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-text-main mb-3 sm:mb-4 tracking-tight">{t('workExperience')}</h2>
                     <p className="text-text-muted text-base sm:text-lg">{t('workExperienceDesc')}</p>
                  </div>
                  
                  <div className="space-y-6 sm:space-y-10 pb-4 sm:pb-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
                    
                    {/* Job 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-card bg-primary text-primary-fg shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Building2 size={16} className="sm:hidden" />
                        <Building2 size={20} className="hidden sm:block" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-card-hover border border-border hover:border-primary/20 transition-colors shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                          <h3 className="font-bold text-text-main text-base sm:text-xl">{t('softwareDeveloper')}</h3>
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">{t('present')}</span>
                        </div>
                        <div className="text-text-muted font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Visbl</div>
                        <p className="text-text-main/80 text-xs sm:text-sm leading-relaxed">
                          {t('visblDesc')}
                        </p>
                      </div>
                    </div>

                    {/* Job 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-card bg-card-hover text-text-muted border-border shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Building2 size={16} className="sm:hidden" />
                        <Building2 size={20} className="hidden sm:block" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-card-hover border border-border hover:border-text-muted/20 transition-colors shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                          <h3 className="font-bold text-text-main text-base sm:text-xl">{t('fullStackDev')}</h3>
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase text-text-muted bg-card px-2.5 sm:px-3 py-1 rounded-full w-fit border border-border">2023 - 2024</span>
                        </div>
                        <div className="text-text-muted font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Tecnológico Comfenalco</div>
                        <p className="text-text-main/80 text-xs sm:text-sm leading-relaxed">
                          {t('comfenalcoDesc')}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* EDUCATION MODAL */}
            {type === 'education' && (
              <div className="p-6 sm:p-8 md:p-12 pb-8 sm:pb-10 bg-card min-h-full">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8 sm:mb-10 mt-6 sm:mt-0">
                     <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-text-main mb-3 sm:mb-4 tracking-tight">{t('educationTitle')}</h2>
                     <p className="text-text-muted text-base sm:text-lg">{t('educationDesc')}</p>
                  </div>
                  
                  <div className="grid gap-4 sm:gap-6 pb-4 sm:pb-6">
                    {/* Item 1 */}
                    <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-border hover:border-primary/20 transition-all group shadow-sm">
                       <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                             <GraduationCap size={24} className="sm:hidden" />
                             <GraduationCap size={32} className="hidden sm:block" />
                          </div>
                          <div className="flex-1">
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h3 className="text-lg sm:text-2xl font-bold text-text-main">{t('systemsEngineering')}</h3>
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">2024</span>
                             </div>
                             <p className="text-text-main font-medium text-sm sm:text-base mb-1">Fundación Universitaria Tecnológico Comfenalco</p>
                             <p className="text-text-muted text-xs sm:text-sm">{t('professionalDegree')} • Cartagena, Colombia</p>
                          </div>
                       </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-border hover:border-blue-500/20 transition-all group shadow-sm">
                       <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                             <Award size={24} className="sm:hidden" />
                             <Award size={32} className="hidden sm:block" />
                          </div>
                          <div className="flex-1">
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h3 className="text-lg sm:text-2xl font-bold text-text-main">{t('webAppDevelopment')}</h3>
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-blue-500 bg-blue-500/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">2021</span>
                             </div>
                             <p className="text-text-main font-medium text-sm sm:text-base mb-1">Universidad de Antioquia</p>
                             <p className="text-text-muted text-xs sm:text-sm">{t('universityDiploma')}</p>
                          </div>
                       </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-border hover:border-emerald-500/20 transition-all group shadow-sm">
                       <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                             <BookOpen size={24} className="sm:hidden" />
                             <BookOpen size={32} className="hidden sm:block" />
                          </div>
                          <div className="flex-1">
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h3 className="text-lg sm:text-2xl font-bold text-text-main">{t('softwareDevTechnologist')}</h3>
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">2022</span>
                             </div>
                             <p className="text-text-main font-medium text-sm sm:text-base mb-1">Fundación Universitaria Tecnológico Comfenalco</p>
                             <p className="text-text-muted text-xs sm:text-sm">{t('technologistDegree')}</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STACK MODAL */}
            {type === 'stack' && (
               <div className="w-full p-6 sm:p-8 md:p-12 pb-8 sm:pb-10 bg-card flex flex-col items-center min-h-full">
                 <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-text-main mb-4 sm:mb-6 mt-6 sm:mt-0 text-center tracking-tight">{t('technicalArsenal')}</h2>
                 <p className="text-text-muted max-w-2xl mx-auto mb-10 sm:mb-16 text-center text-base sm:text-lg font-light leading-relaxed">
                   {t('technicalArsenalDesc')}
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl pb-4 sm:pb-6">
                   
                   {/* Frontend */}
                   <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-border transition-all duration-300">
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
                            style={{ ['--hover-color' as string]: tech.color }}
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
                   </div>

                   {/* Backend */}
                   <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-border transition-all duration-300">
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
                   </div>

                   {/* AI & Machine Learning */}
                   <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-border transition-all duration-300">
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
                   </div>

                   {/* Database */}
                   <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-border transition-all duration-300">
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
                   </div>

                 </div>
               </div>
            )}

          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
