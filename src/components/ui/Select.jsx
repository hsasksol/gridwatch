export default function Select({ label, value, onChange, options, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 pr-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 transition-colors cursor-pointer min-w-[160px]"
        style={{ '--focus-color': '#47B79F' }}
        onFocus={(e) => { e.target.style.borderColor = '#47B79F'; e.target.style.boxShadow = '0 0 0 3px rgba(71, 183, 159, 0.2)'; }}
        onBlur={(e) => { e.target.style.borderColor = ''; e.target.style.boxShadow = ''; }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
