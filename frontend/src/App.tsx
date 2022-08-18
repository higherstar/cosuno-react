// Dependencies
import React from 'react';
import { ThemeProvider } from '@mui/material';

// App routes
import AppRouter from './router';

// Theme
import theme from './theme';

// Styles
import './App.css';

// Create app
const App = () => {
  // Return app
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

// Export app
export default App;
