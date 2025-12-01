export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-colors
        text-gray-900 dark:text-white
        ${hover ? 'hover:border-brand-500 hover:shadow-lg cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
