import { useState, useMemo, useCallback } from 'react';
import { DEVICE_TYPES } from '../utils/constants';

export default function useEnergyData(data) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [unit, setUnit] = useState('kwh');
  const [selectedDevices, setSelectedDevices] = useState(Object.keys(DEVICE_TYPES));

  const toggleDevice = useCallback((deviceKey) => {
    setSelectedDevices((prev) => {
      if (prev.includes(deviceKey)) {
        return prev.filter((d) => d !== deviceKey);
      }
      return [...prev, deviceKey];
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const now = new Date();
    let startDate;

    switch (selectedPeriod) {
      case 'day':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        return data;
    }

    // Filter by period and selected devices
    return data
      .filter((record) => new Date(record.timestamp) >= startDate)
      .map((record) => {
        const filteredDevices = {};
        let filteredTotal = 0;

        selectedDevices.forEach((deviceKey) => {
          if (record.devices[deviceKey] !== undefined) {
            filteredDevices[deviceKey] = record.devices[deviceKey];
            filteredTotal += record.devices[deviceKey];
          }
        });

        return {
          ...record,
          devices: filteredDevices,
          total: filteredTotal,
          cost: filteredTotal * record.spotPrice,
        };
      });
  }, [data, selectedPeriod, selectedDevices]);

  const stats = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return {
        totalEnergy: 0,
        totalCost: 0,
        avgPower: 0,
        peakPower: 0,
        avgSpotPrice: 0,
        co2: 0,
      };
    }

    const totalEnergy = filteredData.reduce((sum, record) => sum + record.total, 0);
    const totalCost = filteredData.reduce((sum, record) => sum + record.cost, 0);
    const avgPower = totalEnergy / filteredData.length;
    const peakPower = Math.max(...filteredData.map((r) => r.total));
    const avgSpotPrice =
      filteredData.reduce((sum, record) => sum + record.spotPrice, 0) / filteredData.length;
    const CO2_EMISSION_FACTOR = 0.053; // kg CO2 per kWh (Norwegian grid average)
    const co2 = totalEnergy * CO2_EMISSION_FACTOR;

    return {
      totalEnergy,
      totalCost,
      avgPower,
      peakPower,
      avgSpotPrice,
      co2,
    };
  }, [filteredData]);

  return {
    data: filteredData,
    stats,
    selectedPeriod,
    setSelectedPeriod,
    unit,
    setUnit,
    selectedDevices,
    toggleDevice,
  };
}
