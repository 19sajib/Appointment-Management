import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { singleAppointment, getDate } from '../Actions/AppointAction'
import Card from '../Components/Card'
import Slots from '../Components/Slots'

const RescheduleAppoint = () => {

    const {id} = useParams()
    const dispatch = useDispatch()

    const data = useSelector((state)=>state.appointReducer.singleData)
    const dateData = useSelector((state)=> state.appointReducer.dateData)

    console.log(data.date)
    console.log(id)
    React.useEffect(()=>{
        dispatch(singleAppointment(id))
    },[])
    React.useEffect(()=>{
        dispatch(getDate({"date":data.date}))
    },[data.date])

  return (
    <div>
    
    <Grid container spacing={4} sx={{marginTop: '10px'}}>
            <Grid item sm={12} md={4}>
                 <Card data={data}/>
            </Grid>
            <Grid item md={8}>
                 <Slots dateData={dateData} date={data.date} time={data.time}/>
            </Grid>
    </Grid>
    </div>
  )
}

export default RescheduleAppoint