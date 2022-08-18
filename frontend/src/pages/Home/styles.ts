// Dependencies
import { Theme } from '@mui/material';
import { orange, pink } from '@mui/material/colors';

// Create styles
const styles = {
  header: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: pink['500'],
    boxShadow: theme.shadows[5],
    p: theme.spacing(16, 10)
  }),
  logo: () => ({
    fontWeight: 900,
    textDecoration: 'none',
    color: orange['500']
  }),
  content: (theme: Theme) => ({
    p: theme.spacing(16),
    height: 'calc(100vh - 104px)'
  }),
  filterMenu: (theme: Theme) => ({
    mt: theme.spacing(10)
  }),
  tableContent: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  })
};

export default styles;
