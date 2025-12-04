import Highcharts from 'highcharts';
import { Chart, XAxis, Tooltip } from '@highcharts/react';
import streamgraph from 'highcharts/modules/streamgraph';
import './ChartTheme';

if (typeof streamgraph === 'function') {
  streamgraph(Highcharts);
}

export default function DailyStreamGraph({ data }) {
  const chartProps = {
    chart: { type: 'streamgraph', backgroundColor: 'transparent' },
    title: undefined,
    accessibility: { enabled: true, description: 'Stacked streamgraph showing hourly energy usage for the day' },
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
        Usage Today (24 Hours)
      </h3>
        <div className="w-full min-h-[220px] md:min-h-[320px]">
        <Chart highcharts={Highcharts} {...chartProps}>
          <XAxis type="linear" title={{ text: 'Hour' }} labels={{ formatter() { return this.value + ':00'; } }} />
          <Tooltip shared={true} valueSuffix=" kW" valueDecimals={1} />
          {Array.isArray(data) && data.map((series, idx) => (
            <Chart.Series key={series.name || idx} {...series} />
          ))}
        </Chart>
      </div>
    </div>
  );
}
