import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Link from '@mui/material/Link'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { allAppointment } from '../Actions/AppointAction'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'patientName',
    numeric: false,
    disablePadding: true,
    label: 'Patient Name',
  },
  {
    id: 'contact',
    numeric: true,
    disablePadding: false,
    label: 'Patient Contact',
  },
  {
    id: 'patientId',
    numeric: true,
    disablePadding: false,
    label: 'Patient ID',
  },
  {
    id: 'appointmentId',
    numeric: true,
    disablePadding: false,
    label: 'Appointment ID',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'isCancelled',
    numeric: false,
    disablePadding: false,
    label: 'Cancelled?',
  },
  {
    id: 'isRescheduled',
    numeric: false,
    disablePadding: false,
    label: 'Rescheduled?',
  },
  {
    id: 'link',
    numeric: false,
    disablePadding: false,
    label: 'View Details',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of Appointments
        </Typography>
        {/* //Search Button Could be Here */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const AdminDashboard = () =>  {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const query = useQuery();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const page = query.get('page') || 1
  console.log(page)
  const [dense, setDense] = React.useState(false);


  React.useEffect(()=> {
    dispatch(allAppointment(page))
  },[dispatch,page])

  const rows = useSelector((state)=>state.appointReducer.appointData)
  const numberOfPages = useSelector((state)=>state.appointReducer.numberOfPages)
  const currentPage = useSelector((state)=>state.appointReducer.currentPage)
  console.log(rows)
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, value) => {
    event.preventDefault()
    console.log(value)
    navigate(`/admin-dashboard?page=${value}`)
  };


  if(!rows) return <h1>Loading...</h1>
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', m: 1, p:1 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => { 
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.patientName}
                      </TableCell>
                      <TableCell align="right">{row.patientContact}</TableCell>
                      <TableCell align="right">{row.patientId}</TableCell>
                      <TableCell align="right">{row._id}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.time}</TableCell>
                      <TableCell align="left">{row.isCancelled ? 'true' : 'false'}</TableCell>
                      <TableCell align="left">{row.isRescheduled ? 'true' : 'false'}</TableCell>
                      <TableCell align="left" component="a" href={`/appoint/${row._id}`}>See More</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
        sx={{justifyContent:"center",
        display:'flex', marginTop: '5px',
        button:{color: 'green'}}}
        color='secondary'
        page={page||currentPage}
        count={numberOfPages}
        onChange={(event, value) => handleChangePage(event,value)}
        size="large"
        variant='outlined'
        hideNextButton={true}
        hidePrevButton={true}
        />
      </Paper>
    </Box>
  );
}


export default AdminDashboard