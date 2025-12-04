import Highcharts from 'highcharts';
import { Chart } from '@highcharts/react';
import sankey from 'highcharts/modules/sankey';
import dependencyWheel from 'highcharts/modules/dependency-wheel';
import { useTheme } from '../../context/ThemeContext';
import './ChartTheme';

if (typeof sankey === 'function') {
  sankey(Highcharts);
}
if (typeof dependencyWheel === 'function') {
  dependencyWheel(Highcharts);
}

export default function DeviceBreakdownWheel({ data }) {
  const { isDark } = useTheme();
  const textColor = isDark ? '#ffffff' : '#111827';
  
  // Filter out invalid data
  const validData = (data || []).filter(item => 
    item && 
    Array.isArray(item) && 
    item.length === 3 && 
    item[0] && 
    item[1] && 
    typeof item[2] === 'number' &&
    item[2] > 0
  );

  if (validData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
        <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
          Usage by Device
        </h3>
        <div className="flex items-center justify-center h-[380px] text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }
  
  const options = {
    chart: { backgroundColor: 'transparent' },
    title: { text: undefined },
    accessibility: { enabled: true },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.from} → {point.to}: <b>{point.weight:.1f} kWh</b>',
      valueDecimals: 1
    },
    series: [{
      keys: ['from', 'to', 'weight'],
      data: validData,
      type: 'dependencywheel',
      name: 'Usage',
      dataLabels: { enabled: false },
      size: '95%'
    }]
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
        Usage by Device
      </h3>
      <div className="w-full min-h-[240px] md:min-h-[380px]">
        <Chart highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
