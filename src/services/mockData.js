import { DEVICE_TYPES, TARIFFS } from '../utils/constants';

// Constants for consumption calculations
const BASE_CONSUMPTION_FACTOR = 0.3;
const PEAK_CONSUMPTION_MIN = 0.8;
const PEAK_CONSUMPTION_VARIANCE = 0.4;
const OFF_PEAK_MIN = 0.1;
const OFF_PEAK_VARIANCE = 0.3;
const WEEKEND_EV_REDUCTION = 0.7;
const CONSUMPTION_NOISE = 0.5;
const CO2_EMISSION_FACTOR = 0.053; // kg CO2 per kWh (Norwegian grid average)

// Generate realistic consumption pattern for a device
function generateDeviceConsumption(deviceType, hour, dayOfWeek) {
  const device = DEVICE_TYPES[deviceType];
  const isPeakHour = device.peakHours?.includes(hour);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  let consumption = device.avgKw * BASE_CONSUMPTION_FACTOR;

  if (isPeakHour) {
    consumption = device.avgKw * (PEAK_CONSUMPTION_MIN + Math.random() * PEAK_CONSUMPTION_VARIANCE);
  } else {
    consumption = device.avgKw * (OFF_PEAK_MIN + Math.random() * OFF_PEAK_VARIANCE);
  }

  // Weekend patterns
  if (isWeekend && deviceType === 'evCharging') {
    consumption *= WEEKEND_EV_REDUCTION;
  }

  return Math.max(0, consumption + (Math.random() - 0.5) * CONSUMPTION_NOISE);
}

// Calculate spot price (simplified)
function calculateSpotPrice(hour, dayOfWeek) {
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isPeakTime = hour >= 17 && hour <= 21;

  let basePrice = 0.6;

  if (isWeekend) {
    return TARIFFS.energyWeekend + (Math.random() * 0.2 - 0.1);
  }

  if (hour >= 6 && hour < 22) {
    basePrice = TARIFFS.energyDay;
    if (isPeakTime) {
      basePrice += 0.3;
    }
  } else {
    basePrice = TARIFFS.energyNight;
  }

  return basePrice + (Math.random() * 0.15 - 0.075);
}

// Generate 30 days of hourly data
export function generateMockData(days = 30) {
  const data = [];
  const now = new Date();

  for (let d = 0; d < days; d++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - d - 1));

    for (let h = 0; h < 24; h++) {
      const timestamp = new Date(date);
      timestamp.setHours(h, 0, 0, 0);

      const dayOfWeek = timestamp.getDay();
      const devices = {};
      let total = 0;

      // Generate consumption for each device type
      Object.keys(DEVICE_TYPES).forEach((deviceType) => {
        const consumption = generateDeviceConsumption(deviceType, h, dayOfWeek);
        devices[deviceType] = consumption;
        total += consumption;
      });

      const spotPrice = calculateSpotPrice(h, dayOfWeek);
      const cost = total * spotPrice;

      data.push({
        timestamp: timestamp.toISOString(),
        hour: h,
        dayOfWeek,
        devices,
        total,
        spotPrice,
        cost,
      });
    }
  }

  return data;
}

// Get current simulated usage
export function getCurrentUsage(data) {
  if (!data || data.length === 0) return 0;
  return data[data.length - 1].total;
}

// Calculate daily totals
export function getDailyTotals(data) {
  const dailyMap = {};

  data.forEach((record) => {
    const date = new Date(record.timestamp).toISOString().split('T')[0];
    if (!dailyMap[date]) {
      dailyMap[date] = { energy: 0, cost: 0 };
    }
    dailyMap[date].energy += record.total;
    dailyMap[date].cost += record.cost;
  });

  return Object.entries(dailyMap).map(([date, totals]) => ({
    date,
    energy: totals.energy,
    cost: totals.cost,
  }));
}

// Get stream graph data for today
export function getTodayStreamData(data) {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  const todayData = data.filter((record) => {
    const recordDate = new Date(record.timestamp).toISOString().split('T')[0];
    return recordDate === today;
  });

  if (todayData.length === 0) {
    // Use last 24 hours if today has no data
    todayData.push(...data.slice(-24));
  }

  const series = Object.keys(DEVICE_TYPES).map((deviceType) => {
    const device = DEVICE_TYPES[deviceType];
    return {
      name: device.label,
      data: todayData.map((record, index) => [index, record.devices[deviceType]]),
      color: device.color,
    };
  });

  return series;
}

// Get device breakdown for dependency wheel
export function getDeviceBreakdown(data) {
  const totals = {};

  Object.keys(DEVICE_TYPES).forEach((deviceType) => {
    totals[deviceType] = 0;
  });

  data.forEach((record) => {
    Object.keys(record.devices).forEach((deviceType) => {
      totals[deviceType] += record.devices[deviceType];
    });
  });

  const wheelData = Object.entries(totals).map(([deviceType, total]) => {
    const device = DEVICE_TYPES[deviceType];
    return ['Grid', device.label, Math.round(total * 10) / 10];
  });

  return wheelData;
}

// Get cost data for area chart
export function getCostData(data) {
  const daily = getDailyTotals(data);

  let cumulativeCost = 0;
  const costs = [];
  const days = [];

  daily.forEach((day) => {
    cumulativeCost += day.cost;
    costs.push(Math.round(cumulativeCost));
    days.push(new Date(day.date).getDate());
  });

  return { days, costs };
}

// Initialize mock data
export const mockEnergyData = generateMockData(30);
