export const DEVICE_TYPES = {
  heating: {
    label: 'Heating',
    color: '#22577a',
    avgKw: 2.5,
    peakHours: [6, 7, 8, 17, 18, 19, 20, 21],
  },
  waterHeater: {
    label: 'Water Heater',
    color: '#38a3a5',
    avgKw: 2.0,
    peakHours: [6, 7, 8, 18, 19, 20],
  },
  evCharging: {
    label: 'EV Charging',
    color: '#57cc99',
    avgKw: 7.0,
    peakHours: [22, 23, 0, 1, 2, 3, 4, 5],
  },
  appliances: {
    label: 'Appliances',
    color: '#80ed99',
    avgKw: 1.0,
    peakHours: [7, 8, 12, 18, 19, 20],
  },
  lighting: {
    label: 'Lighting',
    color: '#c7f9cc',
    avgKw: 0.3,
    peakHours: [6, 7, 17, 18, 19, 20, 21, 22],
  },
  electronics: {
    label: 'Electronics',
    color: '#4cb4b1',
    avgKw: 0.5,
    peakHours: [17, 18, 19, 20, 21, 22, 23],
  },
  other: {
    label: 'Other',
    color: '#d9f2d5',
    avgKw: 0.3,
  },
};

export const TARIFFS = {
  fixedGrid: 5, // USD/month (converted from 49 NOK)
  variableGrid: 0.005, // USD/kWh (converted from 0.05 NOK)
  energyDay: 0.08, // USD/kWh 06:00-22:00 (converted from 0.8 NOK)
  energyNight: 0.05, // USD/kWh 22:00-06:00 (converted from 0.5 NOK)
  energyWeekend: 0.055, // USD/kWh (converted from 0.55 NOK)
};

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
