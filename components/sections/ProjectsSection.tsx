import React from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="p-6 sm:p-8 md:p-12 lg:p-14 min-h-full">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary/70 mb-3">{t('projectsTriggerDesc')}</h1>
          <h2 id="section-title-projects" className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main mb-3 sm:mb-4 tracking-tight">
            {t('projectsTriggerTitle')}
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-3xl leading-relaxed">
            {t('projectsHeroDesc').replace(/<\/?highlight>/g, '')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              id: '1',
              titleKey: 'project1Title',
              descKey: 'project1Desc',
              tags: ['Next.js', 'Gemini AI', 'Tailwind'],
              link: '#',
              repo: '#',
            },
            {
              id: '2',
              titleKey: 'project2Title',
              descKey: 'project2Desc',
              tags: ['React', 'Node.js', 'PostgreSQL'],
              link: '#',
              repo: '#',
            },
            {
              id: '3',
              titleKey: 'project3Title',
              descKey: 'project3Desc',
              tags: ['D3.js', 'WebSockets', 'TypeScript'],
              link: '#',
              repo: '#',
            },
          ].map((project) => (
            <article
              key={project.id}
              className="rounded-[24px] sm:rounded-[30px] border border-border bg-card-hover/70 p-5 sm:p-6 flex flex-col gap-5 hover:border-primary/20 transition-all"
            >
              <div className="aspect-video rounded-2xl border border-border bg-card/40 flex items-center justify-center text-text-muted">
                <Code2 size={34} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-text-main mb-2 tracking-tight">{t(project.titleKey as any)}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{t(project.descKey as any)}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-text-muted px-2.5 py-1 rounded border border-border uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-5 pt-1">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-text-main hover:opacity-70 flex items-center gap-2 transition-opacity uppercase tracking-wider"
                >
                  <ExternalLink size={14} />
                  {t('liveDemo')}
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-text-muted hover:text-text-main flex items-center gap-2 transition-colors uppercase tracking-wider"
                >
                  <Github size={14} />
                  {t('sourceCode')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
