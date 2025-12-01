import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import streamgraph from 'highcharts/modules/streamgraph';
import './ChartTheme';

if (typeof streamgraph === 'function') {
  streamgraph(Highcharts);
}

export default function DailyStreamGraph({ data }) {
  const options = {
    chart: {
      type: 'streamgraph',
      height: 320,
      backgroundColor: 'transparent',
    },
    title: null,
    xAxis: {
      type: 'linear',
      labels: {
        formatter: function () {
          return this.value + ':00';
        },
      },
      title: {
        text: 'Hour',
      },
    },
    yAxis: {
      visible: false,
      startOnTick: false,
      endOnTick: false,
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        label: {
          minFontSize: 5,
          maxFontSize: 15,
          style: {
            color: 'rgba(255,255,255,0.75)',
          },
        },
      },
    },
    series: data,
    tooltip: {
      shared: true,
      valueSuffix: ' kW',
      valueDecimals: 1,
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
        Usage Today (24 Hours)
      </h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
