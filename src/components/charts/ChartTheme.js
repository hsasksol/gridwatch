import Highcharts from 'highcharts';
import accessibility from 'highcharts/modules/accessibility';

// Initialize accessibility module
if (typeof accessibility === 'function') {
  accessibility(Highcharts);
}

// Function to get theme-aware colors
export const getChartTheme = (isDark = true) => {
  const colors = ['#22577a', '#38a3a5', '#57cc99', '#80ed99', '#c7f9cc', '#163f58', '#4cb4b1', '#d9f2d5'];
  
  if (isDark) {
    return {
      colors,
      chart: {
        backgroundColor: 'transparent',
        style: { fontFamily: '"Outfit", sans-serif' },
      },
      title: {
        style: { color: '#ffffff', fontWeight: '600' },
      },
      subtitle: {
        style: { color: '#9ca3af' },
      },
      xAxis: {
        lineColor: '#374151',
        tickColor: '#374151',
        labels: { style: { color: '#9ca3af' } },
        title: { style: { color: '#9ca3af' } },
        gridLineColor: '#1f2937',
      },
      yAxis: {
        lineColor: '#374151',
        tickColor: '#374151',
        labels: { style: { color: '#9ca3af' } },
        title: { style: { color: '#9ca3af' } },
        gridLineColor: '#1f2937',
      },
      legend: {
        itemStyle: { color: '#9ca3af', fontWeight: '400' },
        itemHoverStyle: { color: '#465fff' },
        itemHiddenStyle: { color: '#4b5563' },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        borderColor: '#374151',
        borderRadius: 8,
        style: { color: '#ffffff' },
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            color: '#ffffff',
            style: { fontSize: '11px', textOutline: 'none' },
          },
        },
      },
      credits: { enabled: false },
      accessibility: {
        enabled: true,
        keyboardNavigation: {
          enabled: true
        }
      },
    };
  } else {
    return {
      colors,
      chart: {
        backgroundColor: 'transparent',
        style: { fontFamily: '"Outfit", sans-serif' },
      },
      title: {
        style: { color: '#111827', fontWeight: '600' },
      },
      subtitle: {
        style: { color: '#6b7280' },
      },
      xAxis: {
        lineColor: '#d1d5db',
        tickColor: '#d1d5db',
        labels: { style: { color: '#6b7280' } },
        title: { style: { color: '#6b7280' } },
        gridLineColor: '#e5e7eb',
      },
      yAxis: {
        lineColor: '#d1d5db',
        tickColor: '#d1d5db',
        labels: { style: { color: '#6b7280' } },
        title: { style: { color: '#6b7280' } },
        gridLineColor: '#e5e7eb',
      },
      legend: {
        itemStyle: { color: '#6b7280', fontWeight: '400' },
        itemHoverStyle: { color: '#465fff' },
        itemHiddenStyle: { color: '#9ca3af' },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#d1d5db',
        borderRadius: 8,
        style: { color: '#111827' },
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            color: '#111827',
            style: { fontSize: '11px', textOutline: 'none' },
          },
        },
      },
      credits: { enabled: false },
      accessibility: {
        enabled: true,
        keyboardNavigation: {
          enabled: true
        }
      },
    };
  }
};

// Set default theme (light mode)
Highcharts.setOptions(getChartTheme(false));

export default Highcharts;
