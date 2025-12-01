import { BoltIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const now = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            Energy Monitoring
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{now}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
            <BoltIcon className="w-4 h-4 text-green-600 dark:text-green-400 animate-pulse" />
            <span className="text-sm text-green-700 dark:text-green-400 font-medium">ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
