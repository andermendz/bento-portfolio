import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatMonthRange, formatMonthRangeToPresent } from '../../i18n/experienceDates';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  company: string;
  roleKey: 'technicalLead' | 'softwareDeveloper' | 'fullStackDev';
  periodKind: 'visblCurrent' | 'visblRange' | 'yearsOnly';
  year: string;
  descKey: 'visblDesc' | 'visblPrevDesc' | 'comfenalcoDesc';
  current?: boolean;
}

const TIMELINE: TimelineEntry[] = [
  {
    company: 'visbl',
    roleKey: 'technicalLead',
    periodKind: 'visblCurrent',
    year: '2026',
    descKey: 'visblDesc',
    current: true,
  },
  {
    company: 'visbl',
    roleKey: 'softwareDeveloper',
    periodKind: 'visblRange',
    year: '2025',
    descKey: 'visblPrevDesc',
  },
  {
    company: 'Comfenalco',
    roleKey: 'fullStackDev',
    periodKind: 'yearsOnly',
    year: '2023',
    descKey: 'comfenalcoDesc',
  },
];

export const TimelineChapter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const periodLabel = (entry: TimelineEntry) => {
    if (entry.periodKind === 'visblCurrent') {
      return formatMonthRangeToPresent(language, 2026, 3, t('present'));
    }
    if (entry.periodKind === 'visblRange') {
      return formatMonthRange(language, 2025, 3, 2026, 3);
    }
    return '2023 — 2024';
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Heading reveal.
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });

        // Per-entry reveal.
        const entries = trackRef.current?.querySelectorAll<HTMLElement>('[data-tl-entry]') ?? [];
        entries.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // Progress line grows as the track scrolls past.
        if (progressRef.current && trackRef.current) {
          gsap.set(progressRef.current, { scaleY: 0, transformOrigin: '50% 0%' });
          gsap.to(progressRef.current, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: true,
            },
          });
        }
      });
    },
    { scope: rootRef, dependencies: [language] }
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full px-5 sm:px-10 lg:px-16 3xl:px-24 py-24 sm:py-32"
      aria-label={t('workExperience')}
    >
      <div ref={headingRef} className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto mb-12 sm:mb-16">
        <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3">
          03 — {t('experienceTitle')}
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter">
          {t('workExperience')}
          <br />
          <span className="text-text-muted/25">{t('workExperienceDesc')}</span>
        </h2>
      </div>

      <div className="max-w-[1320px] 3xl:max-w-[1500px] mx-auto">
        <div ref={trackRef} className="relative pl-10 sm:pl-16 md:pl-24">
          {/* Static spine */}
          <div className="absolute left-3 sm:left-6 md:left-10 top-2 bottom-2 w-px bg-border" />
          {/* Animated progress */}
          <div
            ref={progressRef}
            className="absolute left-3 sm:left-6 md:left-10 top-2 bottom-2 w-px bg-text-main"
          />

          <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
            {TIMELINE.map((entry, i) => (
              <article
                key={`${entry.company}-${entry.roleKey}-${i}`}
                data-tl-entry
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-10 sm:-left-16 md:-left-24 top-0 flex items-center gap-4">
                  <div
                    className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 ${
                      entry.current
                        ? 'border-text-main bg-page shadow-[0_0_0_4px_var(--bg-page)]'
                        : 'border-border bg-page shadow-[0_0_0_4px_var(--bg-page)]'
                    }`}
                  >
                    {entry.current && (
                      <span className="h-2 w-2 rounded-full bg-text-main" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-10 items-start">
                  <div className="flex md:flex-col md:gap-1 items-baseline md:items-start gap-3">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-text-main leading-none">
                      {entry.year}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      {periodLabel(entry)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-card-hover border border-border flex items-center justify-center text-text-main">
                        <Building2 size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-2xl sm:text-3xl font-black tracking-tight text-text-main">
                        {entry.company}
                      </span>
                      {entry.current && (
                        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-main bg-card-hover border border-border px-3 py-1 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {t('present')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main">
                      {t(entry.roleKey)}
                    </h3>

                    <p className="text-sm sm:text-base text-text-muted font-medium leading-relaxed max-w-2xl">
                      {t(entry.descKey)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
