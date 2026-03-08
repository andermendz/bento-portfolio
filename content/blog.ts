export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
}

export const BLOG_POSTS: BlogPostSummary[] = [
  {
    id: '1',
    slug: 'my-first-post',
    title: 'Welcome to My New Blog',
    excerpt: 'This is the first post on my new blog. Exploring modern web development and design.',
    date: '2026-03-08',
    tags: ['Welcome', 'Updates'],
  },
  {
    id: '2',
    slug: 'building-a-portfolio',
    title: 'Building a Portfolio with Vite and Tailwind',
    excerpt: 'A deep dive into how I built my portfolio using Vite, React, and Tailwind CSS.',
    date: '2026-03-01',
    tags: ['React', 'Tailwind', 'Vite'],
  },
  {
    id: '3',
    slug: 'the-future-of-frontend',
    title: 'The Future of Frontend Development',
    excerpt: 'My thoughts on where frontend development is heading in the next few years.',
    date: '2026-02-15',
    tags: ['Frontend', 'Opinion'],
  }
];

export const getBlogPost = (slug: string): BlogPostDetail | undefined => {
  const summary = BLOG_POSTS.find(post => post.slug === slug);
  if (!summary) return undefined;

  // Returning dummy markdown content
  return {
    ...summary,
    content: `
# ${summary.title}

Published on **${summary.date}**

Welcome to my blog post about **${summary.title}**. This is a placeholder for the actual markdown content.

## Introduction

In this post, we will explore the concepts behind the topic. As frontend developers, we are constantly learning new tools and frameworks. 

Here is an example of some code:

\`\`\`tsx
import React from 'react';

export function Example() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <p>Hello World!</p>
    </div>
  );
}
\`\`\`

## Deep Dive

Let's dive deeper into the implementation details. Building robust applications requires a good understanding of the underlying architecture.

* First point to consider
* Second point to consider
* Third point is always the charm

### A sub-heading

And finally, some concluding thoughts. Thanks for reading!
    `
  };
};