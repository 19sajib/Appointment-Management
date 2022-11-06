import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Box, Typography, Button} from '@mui/material'
import { cancelAppointment, singleAppointment } from '../Actions/AppointAction'

const SingleAppoint = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const data = useSelector((state)=>state.appointReducer.singleData)
    const user = useSelector((state)=> state.authReducer.authData)
    const loading = useSelector((state)=> state.authReducer.lodaing)

    React.useEffect(()=>{
        dispatch(singleAppointment(id))
    },[])

    
    if(loading)return <h1>loading...</h1>
    if(!data) return <h1>No data found...</h1>

  return (
    <Paper elevation={4} sx={{padding: '10px', margin: 'auto', width: '50%',}}>
     <Typography variant='h6'>Patient Name : {data.patientName}</Typography>
     <Typography variant='h6'>Patient Email : {data.patientEmail}</Typography>
     <Typography variant='h6'>Patient Contact No : {data.patientContact}</Typography>
     <Typography variant='h6' sx={{color: 'green'}}>Appointment Time : {data.time} PM</Typography>
     <Typography variant='h6' sx={{color: 'red'}}>Appointment Date : {data.date}</Typography>
     <Box display="flex" justifyContent="space-between" marginTop="10px" >
        <Button size="large" variant="outlined" onClick={()=> dispatch(cancelAppointment(data._id))} disabled={data.isCancelled || loading}>Cancel</Button>
        <Button size="large" variant="outlined" onClick={()=> navigate(`/reschedule/${data._id}`)} disabled={data.isCancelled || loading}>Reschedule</Button>
     </Box>
     {data.isCancelled && <Typography variant='h6' align="center" sx={{color: 'red', marginTop: '5px'}}>This appointment was cancelled.</Typography>}
    </Paper>
  )
}

export default SingleAppoint