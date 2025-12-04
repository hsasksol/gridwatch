import Highcharts from 'highcharts';
import { Chart, Title, XAxis, YAxis, Legend, Tooltip, PlotOptions, Series } from '@highcharts/react';
import './ChartTheme';

export default function CostAreaChart({ data, budget }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
      <h3 className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium mb-2">
        Cost This Month
      </h3>
      <div className="flex items-center justify-center">
        <div className="w-full" style={{ maxWidth: '90%' }}>
          <div className="w-full min-h-[200px] md:min-h-[320px]">
            <Chart
              type="areaspline"
              styledMode={false}
              chartOptions={{
                chart: { backgroundColor: 'transparent' },
                accessibility: { enabled: true, description: 'Area spline showing monthly costs with optional budget line' },
              }}
            >
              <Title>Cost This Month</Title>
              <XAxis categories={data.days} title={{ text: 'Day' }} />
              <YAxis
                title={{ text: 'USD' }}
                plotLines={budget
                  ? [{
                      value: budget,
                      color: '#22577a',
                      dashStyle: 'Dash',
                      width: 2,
                      label: { text: `Budget: $${budget}`, style: { color: '#22577a' } }
                    }]
                  : []
                }
              />
              <Legend enabled={false} />
              <Tooltip valueSuffix=" USD" valueDecimals={0} />
              <PlotOptions
                areaspline={{
                  fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [[0, 'rgba(87, 204, 153, 0.4)'], [1, 'rgba(87, 204, 153, 0.05)']]
                  },
                  lineColor: '#57cc99',
                  lineWidth: 2,
                  marker: { fillColor: '#57cc99', lineColor: '#ffffff', lineWidth: 2, radius: 4 }
                }}
              />
              <Series name="Cost" data={data.costs} />
            </Chart>
          </div>
        </div>
      </div>
    </div>
  );
}
