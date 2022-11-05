import React from 'react'
import { Stack, Box, Typography, Paper, Divider, IconButton, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BlockIcon from '@mui/icons-material/Block';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate, useParams } from 'react-router-dom';
import {getSlot} from '../Actions/AppointAction'
import { useDispatch } from 'react-redux';


const timeSlots = [
    "9:00-9:20",
    "9:21-9:40",
    "9:41-10:00",
    "10:01-10:20",
    "10:21-10:40",
    "10:41-11:00",
    "11:01-11:20",
    "11:21-11:40",
    "11:41-12:00"
]

const Slots = () => {

    const user = useSelector((state)=> state.authReducer.authData)
    const loading = useSelector((state)=> state.authReducer.lodaing)
    const dateData = useSelector((state)=> state?.appointReducer?.dateData)
    const {date} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bookData, setBookData] = React.useState({
        "patientId": user._id, 
        "patientName": user.fullName,
        "patientEmail": user.email,
        "patientContact": user.contact,
        "date": date,
        "time": ""
    })

    const handleClick = (e) => {
        e.preventDefault()
        console.log(bookData)
        dispatch(getSlot(bookData, navigate))
    }
  return (
    <Box>
    <Typography variant='h4' align="center" color="secondary">All of the slots of day: {date} Between 9-12 PM.</Typography>
    <Divider variant="middle" />
    <Stack direction="row" flexWrap="wrap" textAlign="center" justifyContent="center" alignItems="start" gap={3} margin="10px">
        {timeSlots.map((ts, id)=> (
            <IconButton key={id} onClick={(e)=>setBookData({...bookData, time:ts})} >
            <Paper elevation={5} key={id} sx={{margin: '7px', padding: '7px', backgroundColor: bookData.time===ts? 'yellow': ''}} >
            <Box sx={{color: 'green', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                 <HealthAndSafetyIcon />
                 <Typography variant='h6'>Time Slot: {ts}</Typography>
            </Box>
            <Box>
                {dateData.map((data)=> (
                   <div key={data._id}> {(data.time===ts && data.isBooked===true)&& 
                    <Box sx={{color: "red", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <BlockIcon/>
                    <Typography variant='h6'>This slot has been taken</Typography>
                    </Box>
                    }</div>
                ))}
            </Box>
            </Paper>
            </IconButton>
            ))}
    </Stack>
    <Box textAlign="center">
    <Typography variant='h6' >Please, select your desired slot and click the button down below to make an appointment.</Typography>
    <Button disabled={loading || !bookData.time} onClick={handleClick} sx={{marginTop: '15px'}}  variant="outlined" size="large">Make An Appointment Now</Button>
    </Box>
    </Box>
  )
}

export default Slots