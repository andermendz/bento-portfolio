import React from 'react';
import { X, Building2, GraduationCap, Award, BookOpen, Layout, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface DetailViewProps {
  onClose: () => void;
  type: string;
  layoutId?: string;
}

export const DetailView: React.FC<DetailViewProps> = ({ onClose, type, layoutId }) => {

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm"
        onClick={onClose} 
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <motion.div 
          layoutId={layoutId}
          layout
          className="relative w-full max-w-5xl max-h-[85vh] bg-card rounded-[40px] border border-border overflow-hidden flex flex-col md:flex-row shadow-2xl pointer-events-auto ring-1 ring-white/10"
          transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 1 }}
        >
          {/* Close Button */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-card/80 backdrop-blur-md hover:bg-text-main hover:text-page flex items-center justify-center text-text-main transition-all active:scale-90 border border-border shadow-sm"
          >
            <X size={20} />
          </motion.button>

          {/* Content Wrapper */}
          <motion.div 
            className="flex flex-col w-full h-full overflow-y-auto no-scrollbar relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
          >
            
            {/* ABOUT MODAL */}
            {type === 'about' && (
              <div className="flex flex-col md:flex-row min-h-full">
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-card-hover border-r border-border">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-8 opacity-60">Profile</h4>
                  <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-6 leading-tight tracking-tight">
                    Systems Engineer<br/> <span className="text-text-muted">Scalable Architect.</span>
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-auto">
                     <span className="px-4 py-2 rounded-xl bg-card text-text-main text-xs font-medium border border-border shadow-sm">Proactive</span>
                     <span className="px-4 py-2 rounded-xl bg-card text-text-main text-xs font-medium border border-border shadow-sm">Detail Oriented</span>
                     <span className="px-4 py-2 rounded-xl bg-card text-text-main text-xs font-medium border border-border shadow-sm">Problem Solver</span>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-8 md:p-12 bg-card">
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-6">Bio</h3>
                      <p className="text-text-main leading-loose text-lg font-light">
                        I am a passionate Software Developer from Cartagena, Colombia. My work focuses on building efficient, scalable web applications and exploring the frontiers of AI/ML technologies. I thrive in dynamic environments where I can apply my skills in modern web frameworks and backend systems.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-6">Philosophy</h3>
                      <div className="grid gap-4">
                         {/* Item 1 */}
                         <div className="group flex items-start gap-5 p-5 rounded-3xl bg-card-hover/40 hover:bg-card-hover border border-border hover:border-blue-500/20 transition-all duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
                               <Layout size={20} />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                               <h4 className="text-text-main font-bold text-base mb-2">User-Centric Design</h4>
                               <p className="text-text-muted text-sm leading-relaxed">
                                  Prioritizing intuitive interfaces and seamless interactions.
                               </p>
                            </div>
                         </div>

                         {/* Item 2 */}
                         <div className="group flex items-start gap-5 p-5 rounded-3xl bg-card-hover/40 hover:bg-card-hover border border-border hover:border-amber-500/20 transition-all duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
                               <Zap size={20} />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                               <h4 className="text-text-main font-bold text-base mb-2">Performance First</h4>
                               <p className="text-text-muted text-sm leading-relaxed">
                                  Optimizing code for maximum speed and efficiency.
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
              <div className="p-8 md:p-12 bg-card min-h-full">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-10">
                     <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">Work Experience</h2>
                     <p className="text-text-muted text-lg">My professional journey in software development.</p>
                  </div>
                  
                  <div className="space-y-10 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
                    
                    {/* Job 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-card bg-primary text-primary-fg shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Building2 size={20} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-[32px] bg-card-hover border border-border hover:border-primary/20 transition-colors shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <h3 className="font-bold text-text-main text-xl">Software Developer</h3>
                          <span className="text-[11px] font-bold uppercase text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">Present</span>
                        </div>
                        <div className="text-text-muted font-semibold mb-4 text-base">Visbl</div>
                        <p className="text-text-main/80 text-sm leading-relaxed">
                          Developing core platform features and maintaining robust software architecture to ensure scalability and performance. Contributing to the entire SDLC.
                        </p>
                      </div>
                    </div>

                    {/* Job 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-card bg-card-hover text-text-muted border-border shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Building2 size={20} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-[32px] bg-card-hover border border-border hover:border-text-muted/20 transition-colors shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <h3 className="font-bold text-text-main text-xl">Full-stack Developer</h3>
                          <span className="text-[11px] font-bold uppercase text-text-muted bg-card px-3 py-1 rounded-full w-fit border border-border">2023 - 2024</span>
                        </div>
                        <div className="text-text-muted font-semibold mb-4 text-base">Tecnológico Comfenalco</div>
                        <p className="text-text-main/80 text-sm leading-relaxed">
                          Built and maintained academic management systems using PHP and Modern JS. Focused on delivering user-friendly interfaces and optimizing database queries.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* EDUCATION MODAL */}
            {type === 'education' && (
              <div className="p-8 md:p-12 bg-card min-h-full">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-10">
                     <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">Education</h2>
                     <p className="text-text-muted text-lg">Academic background and certifications.</p>
                  </div>
                  
                  <div className="grid gap-6">
                    {/* Item 1 */}
                    <div className="p-8 rounded-[32px] bg-card-hover border border-border hover:border-primary/20 transition-all group shadow-sm">
                       <div className="flex flex-col md:flex-row gap-6 md:items-center">
                          <div className="w-16 h-16 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                             <GraduationCap size={32} />
                          </div>
                          <div className="flex-1">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h3 className="text-2xl font-bold text-text-main">Systems Engineering</h3>
                                <span className="text-[11px] font-bold uppercase text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">2024</span>
                             </div>
                             <p className="text-text-main font-medium text-base mb-1">Fundación Universitaria Tecnológico Comfenalco</p>
                             <p className="text-text-muted text-sm">Professional Degree • Cartagena, Colombia</p>
                          </div>
                       </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-8 rounded-[32px] bg-card-hover border border-border hover:border-blue-500/20 transition-all group shadow-sm">
                       <div className="flex flex-col md:flex-row gap-6 md:items-center">
                          <div className="w-16 h-16 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                             <Award size={32} />
                          </div>
                          <div className="flex-1">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h3 className="text-2xl font-bold text-text-main">Web App Development</h3>
                                <span className="text-[11px] font-bold uppercase text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full w-fit">2021</span>
                             </div>
                             <p className="text-text-main font-medium text-base mb-1">Universidad de Antioquia</p>
                             <p className="text-text-muted text-sm">University Diploma</p>
                          </div>
                       </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-8 rounded-[32px] bg-card-hover border border-border hover:border-emerald-500/20 transition-all group shadow-sm">
                       <div className="flex flex-col md:flex-row gap-6 md:items-center">
                          <div className="w-16 h-16 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                             <BookOpen size={32} />
                          </div>
                          <div className="flex-1">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h3 className="text-2xl font-bold text-text-main">Software Dev Technologist</h3>
                                <span className="text-[11px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full w-fit">2022</span>
                             </div>
                             <p className="text-text-main font-medium text-base mb-1">Fundación Universitaria Tecnológico Comfenalco</p>
                             <p className="text-text-muted text-sm">Technologist Degree</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STACK MODAL */}
            {type === 'stack' && (
               <div className="w-full p-8 md:p-12 bg-card flex flex-col items-center min-h-full">
                 <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 text-center tracking-tight">Technical Arsenal</h2>
                 <p className="text-text-muted max-w-2xl mx-auto mb-16 text-center text-lg font-light leading-relaxed">
                   A comprehensive toolkit for full-stack development, ranging from modern front-end frameworks to robust backend systems and AI integration.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                   
                   {/* Frontend */}
                   <div className="p-8 rounded-[32px] bg-card-hover border border-border hover:border-blue-500/20 transition-all duration-300">
                      <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Frontend
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Framer Motion'].map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-xl bg-card text-text-muted hover:text-blue-500 hover:bg-blue-500/5 hover:border-blue-500/20 text-sm font-medium border border-border transition-colors cursor-default">{tag}</span>
                        ))}
                      </div>
                   </div>

                   {/* Backend */}
                   <div className="p-8 rounded-[32px] bg-card-hover border border-border hover:border-emerald-500/20 transition-all duration-300">
                      <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        Backend
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Node.js', 'PHP (Laravel)', 'Python', 'Docker', 'GraphQL', 'Express', 'NestJS'].map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-xl bg-card text-text-muted hover:text-emerald-500 hover:bg-emerald-500/5 hover:border-emerald-500/20 text-sm font-medium border border-border transition-colors cursor-default">{tag}</span>
                        ))}
                      </div>
                   </div>

                   {/* AI & Machine Learning */}
                   <div className="p-8 rounded-[32px] bg-card-hover border border-border hover:border-rose-500/20 transition-all duration-300">
                      <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        AI & Machine Learning
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['Gemini API', 'OpenAI', 'PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain'].map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-xl bg-card text-text-muted hover:text-rose-500 hover:bg-rose-500/5 hover:border-rose-500/20 text-sm font-medium border border-border transition-colors cursor-default">{tag}</span>
                        ))}
                      </div>
                   </div>

                   {/* Database */}
                   <div className="p-8 rounded-[32px] bg-card-hover border border-border hover:border-orange-500/20 transition-all duration-300">
                      <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        Database
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone', 'Supabase', 'Prisma'].map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-xl bg-card text-text-muted hover:text-orange-500 hover:bg-orange-500/5 hover:border-orange-500/20 text-sm font-medium border border-border transition-colors cursor-default">{tag}</span>
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