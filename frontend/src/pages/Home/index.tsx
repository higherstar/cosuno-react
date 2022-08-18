// Dependencies
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  ListItem,
  OutlinedInput,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { FilterAlt, Search } from '@mui/icons-material';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Apis
import { CompaniesApi } from '../../apis';

// Global Constants
import { ROUTES } from '../../constants';

// Styles
import styles from './styles';

// Interfaces
interface ICompany {
  name: string;
  logo: string;
  specialities: string[];
  city: string;
}

// Constants
const filterOptions = [
  {
    name: 'Excavation'
  },
  {
    name: 'Plumbing'
  },
  {
    name: 'Electrical'
  }
];

// Export Home Page
export const HomePage: FC = () => {
  // States
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contains, setContains] = useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  const fetchData = () => {
    setIsLoading(true);
    CompaniesApi.readAll({
      searchKey,
      contains,
      skip: page * rowsPerPage,
      take: rowsPerPage
    })
      .then((res) => {
        setCompanies(res.companies);
        setTotalPage(res.pagination.totalPage);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // Close filter menu handler
  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  // Open filter menu handler
  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Search handler
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSearchKey(event.currentTarget.value);
  };

  // Filter change handler
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newContains = [...contains];
    if (event.currentTarget.checked) {
      newContains = [...newContains, event.currentTarget.value];
    } else {
      newContains = newContains.filter((s) => s !== event.currentTarget.value);
    }

    setContains(newContains);
    setPage(0);
  };

  // Change page handler
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Change rows per page handler
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // On searchKey, contains, page, rowsPerPage changed
  useEffect(() => {
    fetchData();
  }, [searchKey, contains, page, rowsPerPage]);

  // On mounted
  useEffect(() => {
    fetchData();
  }, []);

  // Return Home Page
  return (
    <>
      <Box sx={styles.header}>
        <Typography variant="h4" sx={styles.logo} component={Link} to={ROUTES.HOME}>
          Cosuno
        </Typography>
      </Box>
      <Box sx={styles.content} component={PerfectScrollbar}>
        <Card>
          <CardHeader
            title="Companies"
            action={
              <Stack direction="row" spacing={16}>
                <OutlinedInput
                  size="small"
                  value={searchKey}
                  placeholder="Search..."
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                  onChange={handleSearch}
                />
                <Button variant="contained" disableElevation endIcon={<FilterAlt />} onClick={handleOpenFilterMenu}>
                  Filter
                </Button>
                <Popover
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  sx={styles.filterMenu}
                  onClose={handleCloseFilterMenu}
                >
                  {filterOptions.map(({ name }, index) => (
                    <ListItem key={index}>
                      <FormControlLabel
                        label={name}
                        control={<Checkbox color="secondary" value={name} onChange={handleFilterChange} checked={contains.includes(name)} />}
                      />
                    </ListItem>
                  ))}
                </Popover>
              </Stack>
            }
          />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Logo</TableCell>
                  <TableCell>Specialities</TableCell>
                  <TableCell>City</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Box sx={styles.tableContent}>
                        <CircularProgress />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : companies.length > 0 ?
                  companies.map(({ name, logo, specialities, city }, index) => (
                    <TableRow key={index}>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        <Avatar src={logo} alt="Logo">
                          L
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        {specialities?.map((speciality, index) => (
                          <Chip key={index} label={speciality} sx={{ mr: 4 }} />
                        ))}
                      </TableCell>
                      <TableCell>{city}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Box sx={styles.tableContent}>
                          <Typography>There is no data to display</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
            <TablePagination
              page={page}
              count={totalPage}
              component="div"
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
