import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  color = 'primary',
  icon
}) => {
  return (
    <Card sx={{ height: '100%', minHeight: 120 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 2 }}>
        {icon && (
          <Box sx={{ mb: 1, color: `${color}.main` }}>
            {icon}
          </Box>
        )}
        <Typography variant="h4" component="div" color={`${color}.main`} fontWeight="bold">
          {value}
          {unit && (
            <Typography component="span" variant="h6" color="text.secondary">
              {unit}
            </Typography>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};
