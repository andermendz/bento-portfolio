import { isValidElement, useMemo, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPost, type BlogLocale } from '../../content/blog';
import { SEO } from '../../components/SEO';
import { absoluteUrl, blogAbsoluteUrl, buildBreadcrumbSchema, SITE_NAME } from '../../config/seo';
import { useLanguage } from '../../i18n/LanguageContext';

interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }

  return '';
}

function extractToc(content: string): TocItem[] {
  const matches = content.matchAll(/^(##)\s+(.+)$/gm);

  return Array.from(matches).map((match) => {
    const depth = 2;
    const text = match[2].trim();

    return {
      id: slugifyHeading(text),
      text,
      depth,
    };
  });
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const blogLocale = language as BlogLocale;
  const isSpanish = blogLocale === 'es';
  const post = slug ? getBlogPost(slug, blogLocale) : undefined;
  const toc = useMemo(() => (post ? extractToc(post.content) : []), [post]);
  const ui = isSpanish
    ? {
        notFoundTitle: 'Artículo no encontrado',
        notFoundDescription: 'El artículo que buscas no existe.',
        returnToBlog: 'Volver al blog',
        onThisPage: 'En esta página',
        summaryNote: 'Este artículo se enfoca en la mecánica que da forma a productos reales con LLMs: presupuesto de tokens, calidad del retrieval, límites de ejecución y control de respuestas.',
        section: 'Ingeniería de IA',
        minutesRead: 'min de lectura',
      }
    : {
        notFoundTitle: 'Post Not Found',
        notFoundDescription: "The article you're looking for doesn't exist.",
        returnToBlog: 'Return to Blog',
        onThisPage: 'On this page',
        summaryNote: 'This post focuses on the mechanics that shape real LLM products: token budgets, retrieval quality, execution boundaries, and response control.',
        section: 'AI Engineering',
        minutesRead: 'min read',
      };

  const markdownComponents = useMemo<Components>(() => ({
    h2: ({ children, ...props }) => {
      const text = extractText(children);
      const id = slugifyHeading(text);
      return <h2 id={id} className="mt-16 scroll-mt-24 text-2xl font-black tracking-tight text-text-main sm:text-3xl" {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const text = extractText(children);
      const id = slugifyHeading(text);
      return <h3 id={id} className="mt-12 scroll-mt-24 text-xl font-bold tracking-tight text-text-main sm:text-2xl" {...props}>{children}</h3>;
    },
    p: ({ ...props }) => <p className="text-[17px] leading-8 text-text-muted" {...props} />,
    strong: ({ ...props }) => <strong className="font-semibold text-text-main" {...props} />,
    a: ({ href, ...props }) => (
      <a
        href={href}
        className="font-medium text-text-main underline decoration-border underline-offset-4 transition-colors hover:text-primary"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        {...props}
      />
    ),
    ul: ({ ...props }) => <ul className="my-8 space-y-3 pl-6 text-[17px] leading-8 text-text-muted marker:text-primary" {...props} />,
    ol: ({ ...props }) => <ol className="my-8 space-y-3 pl-6 text-[17px] leading-8 text-text-muted marker:font-semibold marker:text-primary" {...props} />,
    li: ({ ...props }) => <li className="pl-1" {...props} />,
    blockquote: ({ ...props }) => (
      <blockquote className="my-10 rounded-[28px] border border-border bg-card/75 px-6 py-5 text-lg leading-8 text-text-main backdrop-blur-xl" {...props} />
    ),
    hr: ({ ...props }) => <hr className="my-12 border-border/80" {...props} />,
    table: ({ ...props }) => (
      <div className="not-prose my-10 overflow-x-auto rounded-[24px] border border-border bg-card/70 backdrop-blur-xl">
        <table className="min-w-full border-collapse text-left text-sm text-text-muted" {...props} />
      </div>
    ),
    thead: ({ ...props }) => <thead className="bg-card-hover/80 text-text-main" {...props} />,
    th: ({ ...props }) => <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]" {...props} />,
    td: ({ ...props }) => <td className="border-t border-border px-4 py-3 align-top leading-7" {...props} />,
    code: ({ className, children, ...props }) => {
      const isInline = !className;

      if (isInline) {
        return (
          <code className="rounded-md border border-border bg-card-hover px-1.5 py-0.5 font-mono text-[0.9em] text-text-main" {...props}>
            {children}
          </code>
        );
      }

      return (
        <code className="font-mono text-sm leading-7 text-slate-100" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ ...props }) => (
      <pre
        className="not-prose my-10 overflow-x-auto rounded-[28px] border border-white/10 bg-[#0f1117] px-5 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:px-6 sm:py-6"
        {...props}
      />
    ),
  }), []);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <SEO title={ui.notFoundTitle} description={ui.notFoundDescription} noindex />
        <h1 className="text-4xl font-bold mb-4 text-text-main">{ui.notFoundTitle}</h1>
        <p className="text-text-muted mb-8">{ui.notFoundDescription}</p>
        <Link to={isSpanish ? '/?lang=es' : '/'} className="px-6 py-3 bg-primary text-primary-fg rounded-full font-medium hover:opacity-90 transition-opacity">
          {ui.returnToBlog}
        </Link>
      </div>
    );
  }

  const articleUrl = blogAbsoluteUrl(isSpanish ? `/${post.slug}?lang=es` : `/${post.slug}`);
  const articleImage = post.coverImage ? absoluteUrl(post.coverImage) : absoluteUrl('/profile.png');
  const articleSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      alternativeHeadline: post.seoTitle,
      description: post.excerpt,
      image: articleImage,
      url: articleUrl,
      mainEntityOfPage: articleUrl,
      inLanguage: isSpanish ? 'es' : 'en',
      isAccessibleForFree: true,
      articleSection: ui.section,
      keywords: post.tags.join(', '),
      wordCount: post.wordCount,
      timeRequired: `PT${post.readingTimeMinutes}M`,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: {
        '@type': 'Person',
        name: SITE_NAME,
        url: absoluteUrl('/'),
      },
      publisher: {
        '@type': 'Person',
        name: SITE_NAME,
        url: absoluteUrl('/'),
      },
      about: post.tags.map((tag) => ({
        '@type': 'Thing',
        name: tag,
      })),
    },
    buildBreadcrumbSchema([
      { name: isSpanish ? 'Inicio' : 'Home', item: absoluteUrl(isSpanish ? '/?lang=es' : '/') },
      { name: 'Blog', item: blogAbsoluteUrl(isSpanish ? '/?lang=es' : '/') },
      { name: post.title, item: articleUrl },
    ]),
  ];

  return (
    <article className="w-full py-12 md:py-16">
      <SEO 
        title={post.seoTitle ?? post.title}
        description={post.excerpt}
        ogType="article"
        ogImage={articleImage}
        ogImageAlt={post.coverAlt}
        locale={isSpanish ? 'es_CO' : 'en_US'}
        alternateLocales={isSpanish ? ['en_US'] : ['es_CO']}
        publishedTime={post.date}
        modifiedTime={post.updated ?? post.date}
        tags={post.tags}
        section={ui.section}
        keywords={post.tags}
        twitterCard={post.coverImage ? 'summary_large_image' : 'summary'}
        canonical={articleUrl}
        alternates={[
          ...(post.translationUrls.en ? [{ hrefLang: 'en', href: blogAbsoluteUrl(post.translationUrls.en) }] : []),
          ...(post.translationUrls.es ? [{ hrefLang: 'es', href: blogAbsoluteUrl(post.translationUrls.es) }] : []),
          { hrefLang: 'x-default', href: blogAbsoluteUrl(post.translationUrls.en ?? `/${post.slug}`) },
        ]}
        schemaData={articleSchemas}
      />
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <header className="relative overflow-hidden rounded-[32px] border border-border bg-card/80 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
            <div className="absolute -right-10 top-8 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                {post.kicker && <span className="rounded-full border border-border bg-card-hover px-3 py-1">{post.kicker}</span>}
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>{post.readingTimeMinutes} {ui.minutesRead}</span>
                {post.updated && <span>{isSpanish ? 'Actualizado' : 'Updated'} {new Date(post.updated).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-text-main sm:text-5xl md:text-6xl">
                {post.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted sm:text-xl">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-card-hover px-3 py-1 text-xs font-medium text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div className="mt-10 rounded-[32px] border border-border bg-card/65 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 backdrop-blur-xl">
            <div className="prose prose-lg max-w-none break-words dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24 rounded-[28px] border border-border bg-card/75 p-6 backdrop-blur-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">{ui.onThisPage}</p>
            <nav className="mt-5">
              <ul className="space-y-3 text-sm leading-6 text-text-muted">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="transition-colors hover:text-text-main">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 border-t border-border pt-6 text-sm leading-7 text-text-muted">
              <p>{ui.summaryNote}</p>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
