import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '../../components/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function BlogLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-page text-text-main font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-3xl mx-auto py-8 px-6 flex justify-between items-center z-10">
        <Link to="/" className="text-2xl font-bold tracking-tight text-text-main hover:opacity-80 transition-opacity">
          My Blog
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">
            Home
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-card border border-border text-text-main hover:bg-card-hover transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-3xl mx-auto px-6 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-3xl mx-auto py-12 px-6 mt-16 border-t border-border/50 text-center text-text-muted text-sm">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}