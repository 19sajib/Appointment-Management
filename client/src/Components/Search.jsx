import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchAppointmentData } from '../Actions/AppointAction';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const Search = () => {

    const [open, setOpen] = React.useState(false);
    const [searchType, setSearchType] = React.useState({searchType:""});
    const query = useQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = React.useState('');
  
    const handleChange = (event) => {
        setSearchType({searchType:[event.target.value]});
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    };

    const searchAppointment = (e, reason) => {
        console.log({search, searchType})
        if (search.trim()) {
          dispatch(searchAppointmentData(search,searchType));
          navigate(`/admin-dashboard/search?searchQuery=${search || 'none'}`);
        } else {
            navigate(`/admin-dashboard?page=1`)
        }
        if (reason !== 'backdropClick') {
            setOpen(false);
          }
      };
    
      const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchAppointment();
        }
      };

      const handleClear = (e, reason) => {
        setSearch('')
        setSearchType('')
        navigate(`/admin-dashboard?page=1`)
        if (reason !== 'backdropClick') {
            setOpen(false);
          }
      }


  return (
    <div>
      <Button onClick={handleClickOpen}>For Search Click Here</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Search By</InputLabel>
              <Select
                native
                value={searchType.searchType}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value="patientName"> Patient Name</option>
                <option value="patientContact">Patient Contact</option>
                <option value="patientId">Patient ID</option>
                <option value="_id">Appointment ID</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField 
                    id="outlined-basic" label="Wirte Your Search" variant="outlined"
                    value={search} 
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearch(e.target.value)}
                    />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={searchAppointment}>Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Search