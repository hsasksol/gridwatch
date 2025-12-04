import Highcharts from 'highcharts';
import { Chart } from '@highcharts/react';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import { useTheme } from '../../context/ThemeContext';
import './ChartTheme';

if (typeof HighchartsMore === 'function') {
  HighchartsMore(Highcharts);
}
if (typeof SolidGauge === 'function') {
  SolidGauge(Highcharts);
}

export default function CurrentUsageGauge({ value = 0, max = 15 }) {
  const { isDark } = useTheme();
  const textColor = isDark ? '#fff' : '#111827';
  const labelColor = isDark ? '#8892a0' : '#6b7280';
  const bgColor = isDark ? '#1a4d5e' : '#e5e7eb';
  
  const options = {
    chart: { type: 'solidgauge', backgroundColor: 'transparent' },
    title: { text: undefined },
    pane: {
      center: ['50%', '60%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: bgColor,
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
        borderWidth: 0,
      },
    },
    accessibility: { enabled: true, description: 'Solid gauge showing current power usage' },
    yAxis: {
      min: 0,
      max: max,
      stops: [[0.2, '#c7f9cc'], [0.5, '#57cc99'], [0.8, '#38a3a5'], [1, '#22577a']],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 0,
      labels: { enabled: false }
    },
    plotOptions: {
      solidgauge: {
        innerRadius: '60%',
        dataLabels: { y: -30, borderWidth: 0, useHTML: true }
      }
    },
    tooltip: { valueSuffix: ' kW', valueDecimals: 1 },
    series: [{
      name: 'Power',
      data: [value],
      dataLabels: {
        format: `<span style="font-size:32px;font-family:Outfit, sans-serif;color:${textColor}">{y:.1f}</span><br/><span style="font-size:14px;font-family:Outfit, sans-serif;color:${labelColor}">kW</span>`,
        borderWidth: 0,
        y: -20,
      }
    }]
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
        Current Usage
      </h3>
      <div className="w-full min-h-[200px] md:min-h-[280px]">
        <Chart highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
