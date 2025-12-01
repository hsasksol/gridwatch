const variants = {
  default: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  success: 'bg-success/20 text-success border-success/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  danger: 'bg-danger/20 text-danger border-danger/30',
  electric: 'bg-electric/20 text-electric border-electric/30',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium
        border ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
