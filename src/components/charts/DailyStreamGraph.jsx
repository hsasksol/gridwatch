import Highcharts from 'highcharts';
import { Chart, Title, XAxis, YAxis, Legend, Tooltip, PlotOptions, Series } from '@highcharts/react';
import streamgraph from 'highcharts/modules/streamgraph';
import './ChartTheme';

if (typeof streamgraph === 'function') {
  streamgraph(Highcharts);
}

export default function DailyStreamGraph({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
        Usage Today (24 Hours)
      </h3>
      <div className="w-full min-h-[220px] md:min-h-[320px]">
        <Chart
          type="streamgraph"
          styledMode={false}
          chartOptions={{
            chart: { backgroundColor: 'transparent' },
            accessibility: { enabled: true, description: 'Stacked streamgraph showing hourly energy usage for the day' },
          }}
        >
          <Title>Usage Today (24 Hours)</Title>
          <XAxis
            type="linear"
            labels={{ formatter: function() { return this.value + ':00'; } }}
            title={{ text: 'Hour' }}
          />
          <YAxis visible={false} startOnTick={false} endOnTick={false} />
          <Legend enabled={true} />
          <Tooltip shared={true} valueSuffix=" kW" valueDecimals={1} />
          <PlotOptions
            series={{
              label: { minFontSize: 5, maxFontSize: 15, style: { color: 'rgba(255,255,255,0.75)' } }
            }}
          />
          {data && data.map((series, idx) => (
            <Series key={idx} {...series} />
          ))}
        </Chart>
      </div>
    </div>
  );
}
