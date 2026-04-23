import type { Language } from './translations';

function localeFor(language: Language) {
  return language === 'es' ? 'es-CO' : 'en-US';
}

/** e.g. Mar 2026 / mar 2026 (locale) */
export function formatMonthYear(language: Language, year: number, month: number) {
  return new Date(year, month - 1, 1).toLocaleDateString(localeFor(language), {
    month: 'short',
    year: 'numeric',
  });
}

export function formatMonthRangeToPresent(
  language: Language,
  year: number,
  month: number,
  presentLabel: string,
) {
  return `${formatMonthYear(language, year, month)} — ${presentLabel}`;
}

export function formatMonthRange(
  language: Language,
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number,
) {
  return `${formatMonthYear(language, startYear, startMonth)} — ${formatMonthYear(language, endYear, endMonth)}`;
}
