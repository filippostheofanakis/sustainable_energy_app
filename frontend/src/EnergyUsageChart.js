//frontend/EnergyUsageChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns'; // make sure this is installed
import { Paper, Typography } from '@material-ui/core';


const EnergyUsageChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && data && data.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: 'line', // Change to 'line' or other types as needed
                data: {
                    labels: data.map(d => new Date(d.timestamp)),
                    datasets: [{
                        label: 'Energy Consumption',
                        data: data.map(d => d.consumption),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute',
                                tooltipFormat: 'MMM dd, yyyy HH:mm',
                                displayFormats: {
                                    minute: 'HH:mm'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Consumption (kWh)'
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]); // Only re-run the effect if new data comes in

    return (
        <Paper elevation={3}>
          <Typography variant="h6" align="center" style={{ padding: '16px 0' }}>
            Energy Consumption Over Time
          </Typography>
          <canvas
    ref={chartRef} />
    </Paper>
    );
    };
    
    export default EnergyUsageChart;