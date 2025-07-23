import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  error: string;
  title?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, title = 'Error', onRetry }) => {
  return (
    <Alert severity="error" action={onRetry && (
      <button onClick={onRetry}>Retry</button>
    )}>
      <AlertTitle>{title}</AlertTitle>
      {error}
    </Alert>
  );
};

export default ErrorMessage;
