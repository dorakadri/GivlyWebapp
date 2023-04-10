import { Box, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Maps from './Maps'
import Track from './Track'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deliverygetOneAction } from '../../../ReduxB/slices/delivery/deliverysSlices'

export default function DetailsDelivery() {
 
const dispatch =useDispatch()
const params=useParams()

  useEffect(() => {
 
    dispatch(deliverygetOneAction(params.id))

  },[params.id,dispatch])
  
  const detail = useSelector((state)=>state?.delivery?.getOne)
console.log(detail)
  
  return (

<Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
      <Maps/>
        </Grid>
        <Grid item xs={6}>
        <Track  />
        </Grid>
        
      </Grid>
    </Box>
    


   
        
   
  )
}
