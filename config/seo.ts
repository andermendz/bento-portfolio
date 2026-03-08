export const SITE_URL = 'https://andermendz.dev';
export const SITE_NAME = 'Anderson Mendoza';
export const SITE_TITLE = 'Anderson Mendoza | Full-Stack Engineer, AI Builder, and Technical Lead';
export const SITE_DESCRIPTION = 'Portfolio and blog of Anderson Mendoza, a full-stack engineer and AI product builder from Cartagena, Colombia specializing in React, TypeScript, Node.js, and LLM-powered applications.';
export const SITE_TWITTER = '@andermendz';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/profile.png`;
export const DEFAULT_OG_IMAGE_ALT = 'Portrait of Anderson Mendoza, full-stack engineer and AI builder';

export const DEFAULT_KEYWORDS = [
  'Anderson Mendoza',
  'Anderson Mendoza portfolio',
  'full-stack engineer',
  'AI engineer',
  'technical lead',
  'React developer',
  'TypeScript developer',
  'Node.js developer',
  'LLM engineer',
  'AI product builder',
  'software engineer Colombia',
  'Cartagena software engineer',
];

export const BLOG_KEYWORDS = [
  'AI blog',
  'LLM blog',
  'AI engineering notes',
  'context windows',
  'tokens',
  'hallucinations',
  'reasoning models',
  'multimodal AI',
];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
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
    jobTitle: 'Full-Stack Engineer and AI Builder',
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
      'AI Product Engineering',
      'Retrieval-Augmented Generation',
      'System Design',
      'MongoDB',
      'PostgreSQL',
    ],
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
