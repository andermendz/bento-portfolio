import { Link } from 'react-router-dom';
import { getBlogPosts, getFeaturedBlogPost, type BlogLocale } from '../../content/blog';
import { SEO } from '../../components/SEO';
import { BLOG_KEYWORDS, absoluteUrl, blogAbsoluteUrl, buildBreadcrumbSchema, SITE_NAME } from '../../config/seo';
import { useLanguage } from '../../i18n/LanguageContext';

export function BlogHome() {
  const { language } = useLanguage();
  const blogLocale = language as BlogLocale;
  const isSpanish = blogLocale === 'es';
  const posts = getBlogPosts(blogLocale);
  const featuredPost = getFeaturedBlogPost(blogLocale);
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost?.slug);
  const blogUrl = blogAbsoluteUrl(isSpanish ? '/?lang=es' : '/');
  const blogDescription = isSpanish
    ? 'Notas aplicadas sobre comportamiento de IA, ventanas de contexto, economía de tokens, alucinaciones, modelos de razonamiento y los detalles técnicos detrás de productos reales con IA.'
    : 'Applied notes on AI behavior, context windows, token economics, hallucinations, reasoning models, and the technical details behind real AI products.';
  const blogKeywords = Array.from(new Set([...BLOG_KEYWORDS, ...posts.flatMap((post) => post.tags)]));
  const ui = isSpanish
    ? {
        title: 'Blog de IA',
        siteBlogName: 'Blog de IA',
        readArticle: 'Leer artículo',
        minutesRead: 'min de lectura',
      }
    : {
        title: 'AI Blog',
        siteBlogName: 'AI Blog',
        readArticle: 'Read the article',
        minutesRead: 'min read',
      };
  const articleHref = (slug: string) => (isSpanish ? `/${slug}?lang=es` : `/${slug}`);
  const blogSchemas = [
    {
      '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${SITE_NAME} ${ui.siteBlogName}`,
        description: blogDescription,
        url: blogUrl,
      inLanguage: isSpanish ? 'es' : 'en',
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${ui.title} | ${SITE_NAME}`,
      description: blogDescription,
      url: blogUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: absoluteUrl('/'),
      },
    },
    buildBreadcrumbSchema([
      { name: isSpanish ? 'Inicio' : 'Home', item: absoluteUrl(isSpanish ? '/?lang=es' : '/') },
      { name: isSpanish ? 'Blog' : 'Blog', item: blogUrl },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: blogAbsoluteUrl(isSpanish ? `/${post.slug}?lang=es` : `/${post.slug}`),
        name: post.title,
      })),
    },
  ];

  return (
    <div className="flex flex-col gap-12 pt-8 pb-16 w-full mx-auto">
      <SEO 
        title={ui.title}
        description={blogDescription}
        canonical={blogUrl}
        locale={isSpanish ? 'es_CO' : 'en_US'}
        alternateLocales={isSpanish ? ['en_US'] : ['es_CO']}
        keywords={blogKeywords}
        ogImage={featuredPost?.coverImage ? absoluteUrl(featuredPost.coverImage) : undefined}
        ogImageAlt={featuredPost?.coverAlt}
        twitterCard={featuredPost?.coverImage ? 'summary_large_image' : 'summary'}
        rssFeed={blogAbsoluteUrl('/rss.xml')}
        alternates={[
          { hrefLang: 'en', href: blogAbsoluteUrl('/') },
          { hrefLang: 'es', href: blogAbsoluteUrl('/?lang=es') },
          { hrefLang: 'x-default', href: blogAbsoluteUrl('/') },
        ]}
        schemaData={blogSchemas}
      />
      {featuredPost && (
        <article className="group relative overflow-hidden rounded-[32px] border border-border bg-card/85 p-6 sm:p-8 md:p-10 backdrop-blur-xl transition-colors duration-300 hover:bg-card-hover">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute -right-8 top-8 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-transform duration-500 group-hover:scale-110" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                {featuredPost.kicker && (
                  <span className="rounded-full border border-border bg-card-hover px-3 py-1">{featuredPost.kicker}</span>
                )}
                <time dateTime={featuredPost.date}>
                  {new Date(featuredPost.date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>{featuredPost.readingTimeMinutes} {ui.minutesRead}</span>
              </div>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-text-main sm:text-4xl md:text-5xl">
                <Link to={articleHref(featuredPost.slug)} className="transition-colors hover:text-primary">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-text-muted sm:text-lg">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end lg:max-w-[360px]">
              <div className="flex flex-wrap gap-2">
                {featuredPost.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-card-hover px-3 py-1 text-xs font-medium text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={articleHref(featuredPost.slug)}
                className="inline-flex items-center gap-2 rounded-full bg-text-main px-5 py-3 text-sm font-semibold text-page transition-transform duration-300 hover:-translate-y-0.5"
              >
                {ui.readArticle}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </article>
      )}

      {remainingPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {remainingPosts.map((post) => (
            <article key={post.id} className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-border bg-card/80 p-6 backdrop-blur-xl transition-colors duration-300 hover:bg-card-hover">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-text-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>{post.readingTimeMinutes} {ui.minutesRead}</span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-text-main transition-colors group-hover:text-primary">
                  <Link to={articleHref(post.slug)}>{post.title}</Link>
                </h3>

                <p className="mt-4 text-sm leading-7 text-text-muted">{post.excerpt}</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-card-hover px-3 py-1 text-xs text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
