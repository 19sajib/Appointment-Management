import React from 'react'
import {Box, Typography, Link} from '@mui/material'
import { useSelector } from 'react-redux'

const Success = () => {
    const user = useSelector((state)=> state.authReducer.authData)
  return (
    <Box textAlign="center" >
        <Typography variant='h5' sx={{color: 'green'}}>
            Your Appointment Booked Successfully..
        </Typography>
        <Link variant='h6' href={`/appoint-data/${user._id}`} sx={{textDecoration: 'none', cursor: 'pointer'}} >
            Check All Your Appointment Here...
        </Link>
    </Box>
  )
}

export default Success