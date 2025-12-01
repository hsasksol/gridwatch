export default function Toggle({ label, enabled, onChange, className = '' }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
        enabled
          ? 'border-[#47B79F] shadow-sm font-medium' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400'
      } ${className}`}
      style={enabled ? { backgroundColor: 'rgba(71, 183, 159, 0.1)', color: '#47B79F' } : {}}
    >
      <div
        className="w-10 h-5 rounded-full relative border"
        style={{
          backgroundColor: enabled ? '#47B79F' : '#d9f2d5',
          borderColor: enabled ? '#47B79F' : '#d9f2d5',
          transition: 'all 0.2s ease'
        }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
          style={{
            transform: enabled ? 'translateX(20px)' : 'translateX(2px)',
            transition: 'transform 0.2s ease'
          }}
        />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
