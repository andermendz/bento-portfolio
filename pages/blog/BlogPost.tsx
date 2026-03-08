import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPost } from '../../content/blog';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-text-main">Post Not Found</h1>
        <p className="text-text-muted mb-8">The article you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-primary-fg rounded-full font-medium hover:opacity-90 transition-opacity">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full max-w-2xl mx-auto py-12 md:py-16">
      <header className="mb-10 md:mb-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-8 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to articles
        </Link>
        
        <div className="flex items-center gap-x-4 text-sm mb-6 text-text-muted">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-border/50 text-text-main rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-main mb-6 leading-[1.15]">
          {post.title}
        </h1>
        
        <p className="text-xl text-text-muted leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert prose-p:text-text-muted prose-headings:text-text-main prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none break-words mt-12 border-t border-border/50 pt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}