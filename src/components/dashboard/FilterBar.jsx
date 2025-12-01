import Select from '../ui/Select';
import Button from '../ui/Button';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const PERIOD_OPTIONS = [
  { value: 'day', label: 'Last 24 hours' },
  { value: 'week', label: 'Last week' },
  { value: 'month', label: 'Last month' },
  { value: 'all', label: 'All time' },
];

const UNIT_OPTIONS = [
  { value: 'kwh', label: 'kWh' },
  { value: 'usd', label: 'USD' },
  { value: 'co2', label: 'CO₂' },
];

export default function FilterBar({
  period,
  onPeriodChange,
  unit,
  onUnitChange,
  onRefresh,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 transition-colors text-gray-900 dark:text-white">
      <div className="flex flex-wrap items-center gap-4">
        <Select
          label="Period"
          value={period}
          onChange={onPeriodChange}
          options={PERIOD_OPTIONS}
        />
        
        <Select
          label="Unit"
          value={unit}
          onChange={onUnitChange}
          options={UNIT_OPTIONS}
        />

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Actions
          </label>
          <Button
            variant="secondary"
            onClick={onRefresh}
            className="flex items-center gap-2"
            aria-label="Refresh energy data"
          >
            <ArrowPathIcon className="w-4 h-4" aria-hidden="true" />
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
}
