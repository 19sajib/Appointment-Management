import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Paper, Box, Grid, Typography, Button} from '@mui/material'
import { getAppointData, cancelAppointment } from '../Actions/AppointAction'

const UserAppoint = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const appointData = useSelector((state)=>state.appointReducer.appointData)
    console.log(appointData)
    React.useEffect(() => {
        dispatch(getAppointData(id))
    }, [])

    if(!appointData) return <h2>Loading...</h2>

  return (
    <Box sx={{ flexGrow: 1, margin: '15px'}} >
      <Grid container spacing={4}>
        {appointData.map((data)=> (
            <Grid item sm={12} md={4} key={data._id}>
            <Paper elevation={4} sx={{padding: '10px'}}>
             <Typography variant='h6'>Patient Name : {data.patientName}</Typography>
             <Typography variant='h6'>Patient Email : {data.patientEmail}</Typography>
             <Typography variant='h6'>Patient Contact No : {data.patientContact}</Typography>
             <Typography variant='h6' sx={{color: 'green'}}>Appointment Time : {data.time} PM</Typography>
             <Typography variant='h6' sx={{color: 'red'}}>Appointment Date : {data.date}</Typography>
             <Box display="flex" justifyContent="space-between" marginTop="10px" >
                <Button size="large" variant="outlined" onClick={()=> dispatch(cancelAppointment(data._id))} disabled={data.isCancelled}>Cancel</Button>
                <Button size="large" variant="outlined" disabled={data.isCancelled}>Reschedule</Button>
             </Box>
             {data.isCancelled && <Typography variant='h6' align="center" sx={{color: 'red', marginTop: '5px'}}>This appointment was cancelled.</Typography>}
            </Paper>
            </Grid>
            ))}
      </Grid>
    </Box>    
  )
}

export default UserAppoint