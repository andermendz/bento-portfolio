export const SITE_URL = 'https://andermendz.dev';
export const BLOG_URL = 'https://blog.andermendz.dev';
export const SITE_NAME = 'Anderson Mendoza';
export const SITE_TITLE = 'Anderson Mendoza | Software Engineer';
export const SITE_DESCRIPTION = 'Portfolio and blog of Anderson Mendoza, a software engineer from Cartagena, Colombia specializing in React, TypeScript, Node.js, and AI-powered applications.';
export const SITE_TWITTER = '@andermendz';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/profile.png`;
export const DEFAULT_OG_IMAGE_ALT = 'Portrait of Anderson Mendoza, software engineer';

export const DEFAULT_KEYWORDS = [
  'Anderson Mendoza',
  'Anderson Mendoza portfolio',
  'software engineer',
  'technical lead',
  'React developer',
  'TypeScript developer',
  'Node.js developer',
  'AI engineer',
  'software engineer Colombia',
  'Cartagena software engineer',
];

export const BLOG_KEYWORDS = [
  'AI blog',
  'Software Engineering blog',
  'web development',
  'LLM notes',
];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function blogAbsoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BLOG_URL}${normalizedPath}`;
}

export function getLocale(language: 'en' | 'es' = 'en') {
  return language === 'es' ? 'es_CO' : 'en_US';
}

export function buildBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anderson Mendoza',
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    jobTitle: 'Software Engineer',
    description: SITE_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cartagena',
      addressCountry: 'Colombia',
    },
    sameAs: [
      'https://github.com/andermendz',
      'https://linkedin.com/in/andermendz',
      'https://x.com/andermendz',
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'Node.js',
      'Next.js',
      'LLMs',
      'AI Engineering',
      'System Design',
      'MongoDB',
      'PostgreSQL',
      'Python',
      'Framer Motion',
    ],
  };
}

export function buildJobPostingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Software Engineer',
    description: SITE_DESCRIPTION,
    datePosted: '2024-01-01',
    validThrough: '2026-12-31',
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cartagena',
        addressCountry: 'Colombia',
      },
    },
    skills: DEFAULT_KEYWORDS.join(', '),
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'Anderson Mendoza Portfolio',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: ['en', 'es'],
  };
}
