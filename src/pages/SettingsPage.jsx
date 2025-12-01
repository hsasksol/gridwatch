import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { TARIFFS } from '../utils/constants';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-2">Settings</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure tariffs and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-heading text-lg mb-4 text-gray-900 dark:text-white">Energy Tariffs</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Fixed Grid Fee</span>
              <span className="font-mono text-gray-900 dark:text-white">${TARIFFS.fixedGrid}/mo</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Day Rate (06:00-22:00)</span>
              <span className="font-mono text-gray-900 dark:text-white">${TARIFFS.energyDay}/kWh</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Night Rate (22:00-06:00)</span>
              <span className="font-mono text-gray-900 dark:text-white">${TARIFFS.energyNight}/kWh</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Weekend Rate</span>
              <span className="font-mono text-gray-900 dark:text-white">${TARIFFS.energyWeekend}/kWh</span>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="secondary" className="w-full">
              Edit Tariffs
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-heading text-lg mb-4 text-gray-900 dark:text-white">Preferences</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="budget-input" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Budget</label>
              <input
                id="budget-input"
                type="number"
                min="0"
                max="10000"
                step="1"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors"
                placeholder="120"
                aria-describedby="budget-help"
              />
              <span id="budget-help" className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">USD (0-10,000)</span>
            </div>
            <div>
              <label htmlFor="alert-input" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Alert When Usage Exceeds</label>
              <input
                id="alert-input"
                type="number"
                min="0"
                max="50"
                step="0.1"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors"
                placeholder="10"
                aria-describedby="alert-help"
              />
              <span id="alert-help" className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">kW (0-50)</span>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full">Save Settings</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
