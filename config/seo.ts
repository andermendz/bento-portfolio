export const SITE_URL = 'https://andermendz.dev';
export const BLOG_URL = 'https://blog.andermendz.dev';
export const SITE_NAME = 'Anderson Mendoza';
export const SITE_TITLE = 'Anderson Mendoza | Software Engineer';
export const SITE_DESCRIPTION =
  'Portfolio and blog of Anderson Mendoza, a software engineer and AI product builder from Cartagena, Colombia specializing in React, TypeScript, Node.js, Rust, and LLM-powered applications.';
export const SITE_TWITTER = '@andermendz';
export const SITE_EMAIL = 'andermendz@proton.me';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/profile.png`;
export const DEFAULT_OG_IMAGE_ALT = 'Portrait of Anderson Mendoza, software engineer';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

/** Stable @id used across schemas to link Person entities. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const DEFAULT_KEYWORDS = [
  'Anderson Mendoza',
  'Anderson Mendoza portfolio',
  'software engineer',
  'technical lead',
  'React developer',
  'TypeScript developer',
  'Node.js developer',
  'AI engineer',
  'LLM engineer',
  'software engineer Colombia',
  'Cartagena software engineer',
];

export const BLOG_KEYWORDS = [
  'AI blog',
  'Software engineering blog',
  'LLM engineering notes',
  'context engineering',
  'AI product design',
  'web development',
  'system design',
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

/**
 * Canonical Person schema. Uses a stable `@id` so other schemas can
 * reference it via { "@id": PERSON_ID } instead of duplicating data.
 */
export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    givenName: 'Anderson',
    familyName: 'Mendoza',
    alternateName: 'andermendz',
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    email: `mailto:${SITE_EMAIL}`,
    jobTitle: 'Technical Lead, Full-Stack Engineer, AI Builder',
    description: SITE_DESCRIPTION,
    nationality: { '@type': 'Country', name: 'Colombia' },
    birthPlace: { '@type': 'Place', name: 'Cartagena, Colombia' },
    knowsLanguage: ['en', 'es'],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: { '@type': 'City', name: 'Cartagena, Colombia' },
      skills:
        'React, TypeScript, Node.js, Python, Rust, Tauri, PostgreSQL, MongoDB, Docker, LLM integration, speech-to-text, diffusion models, system design, design engineering',
    },
    worksFor: { '@type': 'Organization', name: 'Visbl', url: 'https://visbl.com' },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Fundación Universitaria Tecnológico Comfenalco',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cartagena',
        addressCountry: 'Colombia',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cartagena',
      addressRegion: 'Bolívar',
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
      'Vite',
      'Python',
      'Rust',
      'Tauri',
      'MongoDB',
      'PostgreSQL',
      'Docker',
      'Large Language Models',
      'Context Engineering',
      'Retrieval-Augmented Generation',
      'Speech-to-text',
      'Diffusion Models',
      'Full-Stack Development',
      'Design Engineering',
      'Accessibility',
      'Motion Design',
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    alternateName: 'Anderson Mendoza Portfolio',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'es'],
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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

/**
 * BlogPosting / Article schema for an individual post. Uses a stable @id
 * that references the canonical URL + `#article` fragment.
 */
export interface ArticleSchemaInput {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  wordCount?: number;
  readingTimeMinutes?: number;
  language: 'en' | 'es';
  section?: string;
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${input.url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    headline: input.title,
    name: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.language === 'es' ? 'es-CO' : 'en-US',
    ...(input.image && {
      image: {
        '@type': 'ImageObject',
        url: input.image.startsWith('http') ? input.image : absoluteUrl(input.image),
        ...(input.imageAlt && { caption: input.imageAlt }),
      },
    }),
    ...(input.keywords && input.keywords.length > 0 && {
      keywords: input.keywords.join(', '),
    }),
    ...(input.wordCount && { wordCount: input.wordCount }),
    ...(input.readingTimeMinutes && {
      timeRequired: `PT${Math.max(1, Math.round(input.readingTimeMinutes))}M`,
    }),
    ...(input.section && { articleSection: input.section }),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

/**
 * FAQ schema — useful on pages answering discrete questions. Accepts an array
 * of {question, answer} pairs and emits a FAQPage JSON-LD object.
 */
export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}
