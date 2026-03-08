import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../content/blog';

export function BlogHome() {
  return (
    <div className="flex flex-col gap-12 pt-8 pb-16 w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-text-main">
          Writing
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          Thoughts, learnings, and tutorials about frontend development, design, and building products.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="group relative flex flex-col items-start justify-between bg-card hover:bg-card-hover border border-border rounded-2xl p-6 transition-colors duration-200">
            <div className="flex items-center gap-x-4 text-xs mb-4">
              <time dateTime={post.date} className="text-text-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary hover:bg-primary/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-xl font-semibold leading-6 text-text-main group-hover:text-primary transition-colors">
                <Link to={`/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-text-muted">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read article &rarr;
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}