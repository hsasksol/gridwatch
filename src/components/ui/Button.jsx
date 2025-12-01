const variants = {
  primary: 'text-white hover:shadow-lg font-semibold',
  secondary: 'bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold',
  ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium',
  danger: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 hover:bg-red-600 hover:text-white dark:hover:bg-red-700 font-semibold',
};

const primaryStyle = {
  backgroundColor: '#47B79F',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        transition-all duration-200 rounded-lg
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={variant === 'primary' ? primaryStyle : {}}
      {...props}
    >
      {children}
    </button>
  );
}
