import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  HomeIcon,
  CpuChipIcon,
  ChartBarIcon,
  ArrowsRightLeftIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { to: '/', icon: HomeIcon, label: 'Dashboard' },
  { to: '/devices', icon: CpuChipIcon, label: 'Devices' },
  { to: '/history', icon: ChartBarIcon, label: 'History' },
  { to: '/compare', icon: ArrowsRightLeftIcon, label: 'Compare' },
  { to: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
];

export default function Sidebar({ isOpen = false, onClose = () => {}, renderDesktop = true }) {
  // Prevent background scrolling when mobile sidebar overlay is open
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const prevOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = prevOverflow || '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      {renderDesktop && (
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
      )}

      {/* Mobile overlay sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center gap-3 hover:opacity-90" onClick={onClose}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg" style={{ backgroundColor: '#47B79F' }}>
                  <span className="text-white font-semibold text-xl" aria-hidden="true">⚡</span>
                </div>
                <span className="font-semibold text-xl tracking-wider text-gray-900 dark:text-white">
                  GRID<span style={{ color: '#2d8a77' }}>WATCH</span>
                </span>
              </Link>
              <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-md">
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={onClose}
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
          </div>
        </div>
      )}
    </>
  );
}
