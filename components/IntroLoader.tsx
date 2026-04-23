import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSmoothScroll } from './SmoothScroll';
import { useLanguage } from '../i18n/LanguageContext';

const SESSION_KEY = 'intro-loader-seen-v1';

interface IntroLoaderProps {
  onComplete?: () => void;
}

/**
 * Full-screen cinematic intro loader.
 * - Counts 0 → 100 while cycling a stacked word deck.
 * - Curtain clip-path reveal on complete.
 * - Skips on prefers-reduced-motion or repeat visits (session storage).
 */
export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const loaderWords = useMemo(
    () => ['ANDERSON', t('introLoaderDeck1'), t('introLoaderDeck2'), t('introLoaderDeck3')],
    [t, language]
  );

  const footerLabel = useMemo(
    () => t('introLoaderFooter').replace('{year}', String(new Date().getFullYear())),
    [t, language]
  );

  const { stop, start } = useSmoothScroll();

  // Determine upfront if we should show the loader at all.
  const [shouldShow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return false;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') return false;
    } catch {
      /* ignore */
    }
    return true;
  });

  const [hidden, setHidden] = useState(!shouldShow);

  // Lock the page to prevent scroll-jank behind the overlay.
  useEffect(() => {
    if (!shouldShow) {
      onComplete?.();
      return;
    }
    stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
    // We only want this on mount; start/stop are stable enough for this lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow]);

  useGSAP(
    () => {
      if (!shouldShow) return;

      const counter = { value: 0 };
      const wordEls = wordsRef.current?.querySelectorAll<HTMLElement>('[data-word]') ?? [];

      // Stack layout: all words absolutely stacked; each reveals in turn.
      gsap.set(wordEls, { yPercent: 110, opacity: 0 });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(labelRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          try {
            window.sessionStorage.setItem(SESSION_KEY, '1');
          } catch {
            /* ignore */
          }
          start();
          setHidden(true);
          onComplete?.();
        },
      });

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0);

      // Cycle words timed to counter progress.
      wordEls.forEach((el, i) => {
        const at = i * 0.55 + 0.1;
        tl.to(el, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power4.out' }, at);
        if (i < wordEls.length - 1) {
          tl.to(el, { yPercent: -110, opacity: 0, duration: 0.5, ease: 'power3.in' }, at + 0.45);
        }
      });

      // Counter 0 → 100 tween.
      tl.to(
        counter,
        {
          value: 100,
          duration: wordEls.length * 0.55 + 0.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
            }
            if (barRef.current) {
              gsap.set(barRef.current, { scaleX: counter.value / 100 });
            }
          },
        },
        0.1
      );

      // Hold on last word briefly, then curtain reveal.
      tl.to({}, { duration: 0.25 });

      tl.to(
        rootRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.0,
          ease: 'power4.inOut',
        },
        '>'
      );
    },
    { scope: rootRef, dependencies: [shouldShow, language] }
  );

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[300] bg-page text-text-main flex flex-col justify-between p-6 sm:p-10 3xl:p-14 pointer-events-none select-none"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Top label */}
      <div ref={labelRef} className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Anderson Mendoza
        </span>
        <span>{footerLabel}</span>
      </div>

      {/* Stacked word deck */}
      <div className="flex items-end justify-between gap-4">
        <div
          ref={wordsRef}
          className="relative overflow-hidden leading-[0.85] h-[0.85em] w-full"
        >
          {loaderWords.map((word) => (
            <span
              key={word}
              data-word
              className="absolute inset-0 block text-[18vw] sm:text-[15vw] md:text-[12vw] font-black tracking-tighter text-text-main"
            >
              {word}
            </span>
          ))}
        </div>
        <span
          ref={counterRef}
          className="shrink-0 text-sm sm:text-base font-mono tabular-nums font-bold text-text-muted"
        >
          000
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-px w-full bg-border overflow-hidden">
        <div ref={barRef} className="absolute inset-0 bg-text-main origin-left" />
      </div>
    </div>
  );
};
