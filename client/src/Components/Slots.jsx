import React from 'react'
import { Stack, Box, Typography, Paper, Divider, IconButton, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BlockIcon from '@mui/icons-material/Block';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate, useParams } from 'react-router-dom';
import {getSlot, rescheduleAppointment} from '../Actions/AppointAction'
import { useDispatch } from 'react-redux';
import Loading from './Loading'

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

const Slots = ({dateData, date, time}) => {

    const user = useSelector((state)=> state.authReducer.authData)
    const loading = useSelector((state)=> state.authReducer.lodaing)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dateTime, setDateTime] = React.useState({
        "date": date,
        "time": time
    })

    const handleClick = (e) => {
        e.preventDefault()
        console.log(dateTime)
        dispatch(rescheduleAppointment(id, dateTime))
    }
    if(loading) return <Loading />

  return (
    <Box>
    <Typography variant='h4' align="center" color="secondary">All of the slots of day: {date} Between 9-12 PM.</Typography>
    <Divider variant="middle" />
    <Stack direction="row" flexWrap="wrap" textAlign="center" justifyContent="center" alignItems="start" gap={1} margin="10px">
        {timeSlots.map((ts, id)=> (
            <IconButton key={id} onClick={(e)=>setDateTime({...dateTime, time:ts})} >
            <Paper elevation={5} key={id} sx={{margin: '7px', padding: '7px', backgroundColor: dateTime.time===ts? 'yellow': ''}} >
            <Box sx={{color: 'green', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                 <HealthAndSafetyIcon />
                 <Typography variant='h6'>Time Slot: {ts}</Typography>
            </Box>
            <Box>
                {dateData?.map((data)=> (
                   <div key={data._id}> {(data?.time===ts && data?.isBooked===true)&&
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
    <Typography variant='h6' >Select your desired slot and click the button down below to to reschedule your appointment.</Typography>
    <Button onClick={handleClick} sx={{marginTop: '15px'}} disabled={!dateTime.time || loading || !date} variant="outlined" size="large">Reschedule Your Appointment</Button>
    </Box>
    </Box>
  )
}

export default Slots