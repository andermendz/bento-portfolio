import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import BlogApp from './BlogApp.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Check if we're on a blog subdomain OR accessing a local /blog path
const hostname = window.location.hostname;
const pathname = window.location.pathname;
const isBlog = hostname.startsWith('blog.') || pathname.startsWith('/blog');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      {isBlog ? <BlogApp /> : <App />}
    </HelmetProvider>
  </React.StrictMode>
);