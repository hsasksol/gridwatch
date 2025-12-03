import { BoltIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

export default function Header({ onToggleSidebar }) {
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
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Small mobile logo */}
          <div className="md:hidden flex items-center">
            <div className="w-9 h-9 rounded-md flex items-center justify-center shadow-lg" style={{ backgroundColor: '#47B79F' }}>
              <span className="text-white font-semibold text-lg" aria-hidden="true">⚡</span>
            </div>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden touch-target"
            aria-label="Open menu"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="min-w-0 flex-1 hidden md:block">
            <h1 className="text-lg sm:text-2xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wide truncate">
              Energy Monitoring
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono truncate">{now}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-target"
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
