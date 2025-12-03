import React, { Suspense, useState } from 'react';
import { BoltIcon, FireIcon, CurrencyDollarIcon, CloudIcon } from '@heroicons/react/24/outline';
import StatCard from '../components/ui/StatCard';
import FilterBar from '../components/dashboard/FilterBar';
import DeviceFilter from '../components/dashboard/DeviceFilter';
const CurrentUsageGauge = React.lazy(() => import('../components/charts/CurrentUsageGauge'));
const DailyStreamGraph = React.lazy(() => import('../components/charts/DailyStreamGraph'));
const DeviceBreakdownWheel = React.lazy(() => import('../components/charts/DeviceBreakdownWheel'));
const CostAreaChart = React.lazy(() => import('../components/charts/CostAreaChart'));
import useEnergyData from '../hooks/useEnergyData';
import {
  mockEnergyData,
  getCurrentUsage,
  getTodayStreamData,
  getDeviceBreakdown,
  getCostData,
  generateMockData,
} from '../services/mockData';
import { formatNumber } from '../utils/formatters';

export default function DashboardPage() {
  const [data, setData] = useState(mockEnergyData);
  
  const {
    data: filteredData,
    stats,
    selectedPeriod,
    setSelectedPeriod,
    unit,
    setUnit,
    selectedDevices,
    toggleDevice,
  } = useEnergyData(data);

  const handleRefresh = () => {
    setData(generateMockData(30));
  };

  const currentUsage = getCurrentUsage(filteredData);
  const streamData = getTodayStreamData(filteredData);
  const wheelData = getDeviceBreakdown(filteredData);
  const costData = getCostData(filteredData);

  // Calculate value based on unit
  const getDisplayValue = (type) => {
    switch (unit) {
      case 'usd':
        return type === 'total' ? formatNumber(stats.totalCost, 0) : formatNumber(stats.totalCost / filteredData.length, 1);
      case 'co2':
        return type === 'total' ? formatNumber(stats.co2, 1) : formatNumber(stats.co2 / filteredData.length, 2);
      default: // kwh
        return type === 'total' ? formatNumber(stats.totalEnergy, 0) : formatNumber(stats.avgPower, 1);
    }
  };

  const getUnit = () => {
    switch (unit) {
      case 'usd':
        return 'USD';
      case 'co2':
        return 'kg CO₂';
      default: // kwh
        return 'kWh';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <FilterBar
        period={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        unit={unit}
        onUnitChange={setUnit}
        onRefresh={handleRefresh}
      />

      {/* Device Filter */}
      <DeviceFilter
        selectedDevices={selectedDevices}
        onToggleDevice={toggleDevice}
      />

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Current Usage"
          value={formatNumber(currentUsage, 1)}
          unit="kW"
          icon={BoltIcon}
          variant="brand"
        />
        <StatCard
          label={selectedPeriod === 'day' ? 'Today' : 'Total'}
          value={getDisplayValue('total')}
          unit={getUnit()}
          icon={unit === 'co2' ? CloudIcon : FireIcon}
        />
        <StatCard
          label="Average"
          value={getDisplayValue('avg')}
          unit={getUnit()}
          icon={CurrencyDollarIcon}
        />
        <StatCard
          label="Peak Load"
          value={formatNumber(stats.peakPower, 1)}
          unit="kW"
          icon={BoltIcon}
          variant="warning"
        />
      </div>

      {/* Main Charts (lazy-loaded) */}
      <Suspense fallback={<div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="col-span-1"><div className="bg-white dark:bg-gray-800 rounded-xl p-4 h-48 animate-pulse"/></div><div className="col-span-2"><div className="bg-white dark:bg-gray-800 rounded-xl p-4 h-48 animate-pulse"/></div></div>}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CurrentUsageGauge value={currentUsage} max={15} />
          </div>
          <div className="lg:col-span-2">
            <DailyStreamGraph data={streamData} />
          </div>
        </div>
      </Suspense>

      {/* Secondary Charts (lazy-loaded) */}
      <Suspense fallback={<div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="bg-white dark:bg-gray-800 rounded-xl p-4 h-48 animate-pulse"/><div className="bg-white dark:bg-gray-800 rounded-xl p-4 h-48 animate-pulse"/></div>}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeviceBreakdownWheel data={wheelData} />
          <CostAreaChart data={costData} budget={1200} />
        </div>
      </Suspense>
    </div>
  );
}
