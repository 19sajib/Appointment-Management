import React from 'react'

import {Stack, Typography, TextField, Box, Button} from '@mui/material'
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import { getDate } from '../Actions/AppointAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const today = new Date();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state)=> state?.authReducer?.authData)

  const [value, setValue] = React.useState(dayjs(today));

  const handleDate = (e) => {
    e.preventDefault();

    !user && navigate('/auth')

    const date = value.format('YYYY-MM-DD')
    dispatch(getDate({"date": date}))

    navigate(`/take-slot/${date}`)
    
  }

  return (
    <Stack sx={{display: 'flex', flexDirection: 'column'}}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <div>
      <Typography variant='h5' color="primary">
         Wanna Book An Appointment?
      </Typography>
      <Typography variant='h5' color="primary" >
         Please, Select Your Desired Date & Click Find Slot Button!
      </Typography>
        </div>
        <div>
      <LocalizationProvider elevation={6} dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        disablePast
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onAccept={handleDate}
        renderInput={(params) => <TextField {...params} />}
        componentsProps={{
          actionBar: {
            actions: ['cancelaccept'],
          },
        }}
        />
        <Button variant="outlined" size="large" sx={{float: 'right'}} onClick={handleDate}>Find Slots</Button>
      </LocalizationProvider>
        </div>
        </Box>
    </Stack>
  )
}

export default Home