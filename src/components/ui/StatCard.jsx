const variants = {
  default: 'text-gray-900 dark:text-white',
  success: 'text-green-700 dark:text-green-400',
  warning: 'text-orange-700 dark:text-orange-400',
  danger: 'text-red-700 dark:text-red-400',
  brand: '',
};

const brandStyle = {
  color: '#2d8a77',
};

export default function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  variant = 'default',
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-brand-500 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">
          {label}
        </span>
        {Icon && <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
      </div>
      <div className="flex items-baseline gap-1">
        <span 
          className={`font-mono text-3xl font-semibold ${variants[variant]}`}
          style={variant === 'brand' ? brandStyle : {}}
        >
          {value}
        </span>
        {unit && <span className="text-gray-600 dark:text-gray-400 text-sm">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div
          className={`mt-2 text-sm ${
            trend > 0 ? 'text-red-600 dark:text-red-400' : trend < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {trend > 0 ? '↑' : trend < 0 ? '↓' : '='} {Math.abs(trend)}% vs last week
        </div>
      )}
    </div>
  );
}
