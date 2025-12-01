import { DEVICE_TYPES } from '../../utils/constants';
import Toggle from '../ui/Toggle';

export default function DeviceFilter({ selectedDevices, onToggleDevice }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 transition-colors text-gray-900 dark:text-white">
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-4">
        Filter Devices
      </h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(DEVICE_TYPES).map(([key, device]) => (
          <Toggle
            key={key}
            label={device.label}
            enabled={selectedDevices.includes(key)}
            onChange={() => onToggleDevice(key)}
          />
        ))}
      </div>
    </div>
  );
}
