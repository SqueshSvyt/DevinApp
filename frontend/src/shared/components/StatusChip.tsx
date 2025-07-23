import React from 'react';
import { Chip } from '@mui/material';
import { getStatusColor } from '../utils';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Chip
      label={getStatusLabel(status)}
      size={size}
      sx={{
        backgroundColor: getStatusColor(status),
        color: 'white',
        fontWeight: 'medium',
      }}
    />
  );
};

export default StatusChip;
