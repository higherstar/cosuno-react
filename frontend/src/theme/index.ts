// Dependencies
import { createTheme, responsiveFontSizes } from '@mui/material';

// Theme config
import typography from './typography';

// Create theme
const theme = responsiveFontSizes(
  createTheme({
    spacing: 1,
    typography
  })
);

// Export theme
export default theme;
