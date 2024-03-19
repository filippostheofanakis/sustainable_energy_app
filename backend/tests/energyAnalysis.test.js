// tests/energyAnalysis.test.js

const {   calculateDailyTotalConsumption,
    calculateDailyAverageConsumption,
    calculatePeakConsumptionTimes, } = require('../services/energyAnalysis');
const EnergyUsage = require('../models/EnergyUsage');

// Mock data to simulate the EnergyUsage model's response
const mockData = [
    { timestamp: new Date('2024-03-19'), consumption: 100, device: 'Device A' },
    { timestamp: new Date('2024-03-19'), consumption: 200, device: 'Device B' },
    { timestamp: new Date('2024-03-20'), consumption: 150, device: 'Device C' },
    { timestamp: new Date('2024-03-20'), consumption: 300, device: 'Device D' }, // Added for peak times
  ];
  
  // Mock the find method of EnergyUsage model
  jest.mock('../models/EnergyUsage', () => ({
    find: jest.fn().mockImplementation(() => Promise.resolve([
      { timestamp: new Date('2024-03-19'), consumption: 100, device: 'Device A' },
      { timestamp: new Date('2024-03-19'), consumption: 200, device: 'Device B' },
      { timestamp: new Date('2024-03-20'), consumption: 150, device: 'Device C' },
      { timestamp: new Date('2024-03-20'), consumption: 300, device: 'Device D' }, // Ensure this is included
    ])),
  }));
  

  describe('Energy Analysis Tests', () => {
    test('calculateDailyTotalConsumption calculates total consumption correctly', async () => {
      const dailyTotalConsumption = await calculateDailyTotalConsumption();
      expect(dailyTotalConsumption['2024-03-19']).toEqual(300);
      expect(dailyTotalConsumption['2024-03-20']).toEqual(450);
    });
  
    test('calculateDailyAverageConsumption calculates average consumption correctly', async () => {
      const dailyAverageConsumption = await calculateDailyAverageConsumption();
      expect(dailyAverageConsumption['2024-03-19']).toEqual(150); // Average for 2024-03-19
      expect(dailyAverageConsumption['2024-03-20']).toEqual(225); // Average for 2024-03-20
    });
  
    test('calculatePeakConsumptionTimes identifies peak consumption times correctly', async () => {
      const peakConsumptionTimes = await calculatePeakConsumptionTimes();
      expect(peakConsumptionTimes[0].consumption).toEqual(300); // Highest consumption record
      expect(peakConsumptionTimes[0].device).toEqual('Device D'); // Device with highest consumption
    });
  });