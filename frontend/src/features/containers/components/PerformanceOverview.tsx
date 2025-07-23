import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Container } from '../../../shared/types/containers';
import { usePerformanceMetrics } from '../../../shared/hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceOverviewProps {
  containers: Container[];
  onTypeFilter: (type: string) => void;
}

export const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  onTypeFilter,
}) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('week');
  const { metrics } = usePerformanceMetrics(selectedType);

  const handleTypeClick = (type: string) => {
    const newType = selectedType === type ? '' : type;
    setSelectedType(newType);
    onTypeFilter(newType);
  };

  const getChartData = (data: number[], color: string) => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (!metrics) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Performance Overview</Typography>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={(_, value) => value && setTimeRange(value)}
          size="small"
        >
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="quarter">Quarter</ToggleButton>
          <ToggleButton value="year">Year</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              cursor: 'pointer',
              border: selectedType === 'physical' ? '2px solid #1976d2' : '1px solid #e0e0e0',
            }}
            onClick={() => handleTypeClick('physical')}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Physical Containers</Typography>
                <Chip label={`${metrics.physical.count}`} color="primary" size="small" />
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    YIELD
                  </Typography>
                  <Typography variant="body2">
                    AVG {metrics.physical.avg_yield}KG
                  </Typography>
                  <Typography variant="body2">
                    TOTAL {metrics.physical.total_yield}KG
                  </Typography>
                  <Box sx={{ height: 60, mt: 1 }}>
                    <Bar
                      data={getChartData(metrics.physical.yield_data, '#4caf50')}
                      options={chartOptions}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    SPACE UTILIZATION
                  </Typography>
                  <Typography variant="body2">
                    AVG {metrics.physical.avg_utilization}%
                  </Typography>
                  <Box sx={{ height: 60, mt: 1 }}>
                    <Bar
                      data={getChartData(metrics.physical.utilization_data, '#2196f3')}
                      options={chartOptions}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              cursor: 'pointer',
              border: selectedType === 'virtual' ? '2px solid #1976d2' : '1px solid #e0e0e0',
            }}
            onClick={() => handleTypeClick('virtual')}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Virtual Containers</Typography>
                <Chip label={`${metrics.virtual.count}`} color="secondary" size="small" />
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    YIELD
                  </Typography>
                  <Typography variant="body2">
                    AVG {metrics.virtual.avg_yield}KG
                  </Typography>
                  <Typography variant="body2">
                    TOTAL {metrics.virtual.total_yield}KG
                  </Typography>
                  <Box sx={{ height: 60, mt: 1 }}>
                    <Bar
                      data={getChartData(metrics.virtual.yield_data, '#4caf50')}
                      options={chartOptions}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    SPACE UTILIZATION
                  </Typography>
                  <Typography variant="body2">
                    AVG {metrics.virtual.avg_utilization}%
                  </Typography>
                  <Box sx={{ height: 60, mt: 1 }}>
                    <Bar
                      data={getChartData(metrics.virtual.utilization_data, '#2196f3')}
                      options={chartOptions}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
