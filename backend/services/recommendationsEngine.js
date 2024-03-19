// recommendationsEngine.js

const { calculateDailyAverageConsumption, calculatePeakConsumptionTimes } = require('./energyAnalysis');

const generateRecommendations = async () => {
  const dailyAverageConsumption = await calculateDailyAverageConsumption();
  const peakConsumptionTimes = await calculatePeakConsumptionTimes();
  let recommendations = [];

  // Simple example: Generate a recommendation if average daily consumption is above a certain threshold
  for (let day in dailyAverageConsumption) {
    if (dailyAverageConsumption[day] > 500) { // Threshold in kWh
      recommendations.push({
        date: day,
        recommendation: "Consider using energy-saving appliances to reduce daily consumption."
      });
    }
  }

  // Generate recommendations for peak times - e.g., suggest off-peak usage
  peakConsumptionTimes.forEach(peak => {
    recommendations.push({
      timestamp: peak.timestamp,
      recommendation: "High energy consumption noted. If possible, shift usage to off-peak hours."
    });
  });

  return recommendations;
};

module.exports = { generateRecommendations };
