import Card from '../components/ui/Card';
import { DEVICE_TYPES } from '../utils/constants';

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-2">Devices</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Overview of all energy-consuming devices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(DEVICE_TYPES).map(([key, device]) => (
          <Card key={key} hover>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg text-gray-900 dark:text-white">{device.label}</h3>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: device.color }}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Avg. Power:</span>
                <span className="font-mono text-gray-900 dark:text-white">{device.avgKw} kW</span>
              </div>
              {device.peakHours && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Peak Hours:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {device.peakHours[0]}:00 - {device.peakHours[device.peakHours.length - 1]}:00
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
