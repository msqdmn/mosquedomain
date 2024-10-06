import React, { createContext, useContext, useState } from 'react';
import ErrorNotification from './ErrorNotification';

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const triggerError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  };

  return (
    <ErrorContext.Provider value={{ error, triggerError }}>
      {children}
      {error && <ErrorNotification message={error} />}
    </ErrorContext.Provider>
  );
};
