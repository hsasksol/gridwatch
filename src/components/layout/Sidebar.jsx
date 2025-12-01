import { NavLink, Link } from 'react-router-dom';
import {
  HomeIcon,
  CpuChipIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { to: '/', icon: HomeIcon, label: 'Dashboard' },
  { to: '/devices', icon: CpuChipIcon, label: 'Devices' },
  { to: '/history', icon: ChartBarIcon, label: 'History' },
  { to: '/compare', icon: ArrowsRightLeftIcon, label: 'Compare' },
  { to: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside 
      className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen p-4 transition-colors"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-4 py-6 mb-6 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg" style={{ backgroundColor: '#47B79F' }}>
          <span className="text-white font-semibold text-xl" aria-hidden="true">⚡</span>
        </div>
        <span className="font-semibold text-xl tracking-wider text-gray-900 dark:text-white">
          GRID<span style={{ color: '#2d8a77' }}>WATCH</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border-l-2
              ${isActive
                ? 'shadow-sm font-medium border-transparent'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent'}
            `}
            style={({ isActive }) => isActive ? { backgroundColor: 'rgba(45, 138, 119, 0.1)', color: '#2d8a77', borderLeftColor: '#2d8a77', borderLeftWidth: '2px' } : {}}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
