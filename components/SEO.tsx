import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_TWITTER,
} from '../config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string | string[];
  author?: string;
  locale?: string;
  alternateLocales?: string[];
  robots?: string;
  alternates?: Array<{ hrefLang: string; href: string }>;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  section?: string;
  schemaData?: object | object[];
  rssFeed?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  twitterCard = 'summary',
  keywords,
  author = SITE_NAME,
  locale = 'en_US',
  alternateLocales,
  robots,
  alternates,
  publishedTime,
  modifiedTime,
  tags,
  section,
  schemaData,
  rssFeed,
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const metaDescription = description || SITE_DESCRIPTION;
  const url = canonical || 'https://andermendz.dev';
  const robotsContent = noindex
    ? 'noindex, nofollow, noarchive'
    : robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const schemaItems = Array.isArray(schemaData) ? schemaData : schemaData ? [schemaData] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      {keywordContent && <meta name="keywords" content={keywordContent} />}
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="application-name" content={SITE_NAME} />

      <link rel="canonical" href={url} />
      {alternates?.map((alternate) => (
        <link key={`${alternate.hrefLang}-${alternate.href}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
      ))}
      {rssFeed && <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} Blog RSS Feed`} href={rssFeed} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      {alternateLocales?.map((alternateLocale) => (
        <meta key={`og-locale-${alternateLocale}`} property="og:locale:alternate" content={alternateLocale} />
      ))}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:creator" content={SITE_TWITTER} />
      <meta name="twitter:site" content={SITE_TWITTER} />

      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {ogType === 'article' && <meta property="article:author" content={author} />}
      {ogType === 'article' && section && <meta property="article:section" content={section} />}
      {ogType === 'article' && tags && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {schemaItems.map((item, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
