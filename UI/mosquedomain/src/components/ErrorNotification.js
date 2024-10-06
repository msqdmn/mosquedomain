import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorNotification = ({ message }) => {
  return (
    <Snackbar open={Boolean(message)} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorNotification;
