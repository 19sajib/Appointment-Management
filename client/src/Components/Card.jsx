import React from 'react'
import { Paper, Typography} from '@mui/material'

const Card = ({data}) => {
  
    if(!data) return <h1>Loading...</h1>

  return (
    <Paper elevation={4} sx={{padding: '10px', margin: 'auto',}}>
     <Typography variant='h6'>Patient Name : {data.patientName}</Typography>
     <Typography variant='h6'>Patient Email : {data.patientEmail}</Typography>
     <Typography variant='h6'>Patient Contact No : {data.patientContact}</Typography>
     <Typography variant='h6' sx={{color: 'green'}}>Appointment Time : {data.time} PM</Typography>
     <Typography variant='h6' sx={{color: 'red'}}>Appointment Date : {data.date}</Typography>
     {data.isCancelled && <Typography variant='h6' align="center" sx={{color: 'red', marginTop: '5px'}}>This appointment was cancelled.</Typography>}
    </Paper>
  )
}

export default Card