import Highcharts from 'highcharts';
import { Chart, XAxis, YAxis, Tooltip } from '@highcharts/react';
import './ChartTheme';

export default function CostAreaChart({ data, budget }) {
  const options = {
    chart: {
      type: 'areaspline',
      height: null,
      width: null,
      backgroundColor: 'transparent',
    },
    const chartProps = {
      chart: { type: 'areaspline', backgroundColor: 'transparent' },
      title: undefined,
      accessibility: { enabled: true, description: 'Area spline showing monthly costs with optional budget line' },
    };

    const seriesProps = { name: 'Cost', data: data.costs };
    const yAxisProps = {
      title: { text: 'USD' },
      plotLines: budget
        ? [
            {
              value: budget,
              color: '#22577a',
              dashStyle: 'Dash',
              width: 2,
              label: { text: `Budget: $${budget}`, style: { color: '#22577a' } },
            },
          ]
        : [],
    };
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
        Cost This Month
      </h3>
      <div className="flex items-center justify-center">
        <div className="w-full" style={{ maxWidth: '90%' }}>
            <div className="w-full min-h-[200px] md:min-h-[320px]">
              <Chart highcharts={Highcharts} {...chartProps}>
                <XAxis categories={data.days} title={{ text: 'Day' }} />
                <YAxis {...yAxisProps} />
                <Tooltip valueSuffix=" USD" valueDecimals={0} />
                <Chart.Series {...seriesProps} />
              </Chart>
            </div>
        </div>
      </div>
    </div>
  );
}
