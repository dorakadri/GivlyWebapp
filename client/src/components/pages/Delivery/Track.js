import { Step, StepLabel, Stepper } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const steps = [
  'New',
  'Transit',
  'Delivered',
];
export default function Track() {

  const [step,setStep]=useState();
  
  const detail = useSelector((state)=>state?.delivery)
  console.log(detail.getOne?.state);
useEffect(() => {
  if(detail.getOne?.state === 'New'){
    setStep(0)
   }else if(detail.getOne?.state === 'Transit'){
    setStep(1)
   }else if(detail.getOne?.state === 'Delivered') {
    setStep(2)
   }
}, [detail])

  return (
    <Box >
    <Stepper activeStep={step} alternativeLabel>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
</Box>
  )
}
