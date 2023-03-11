import { Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Loginform from './Loginform'

export default function Login() {
    const isNonMobileScreen=useMediaQuery("(min-width:1000px)")
  return (
    <Box  >
    <Box width="100%" p="1rem 6%" textAlign ="center">
    <Typography  fontWeight="bold" fontSize="32px" color="primary">
      Welcome back 
    </Typography>
    </Box>

    <Box width={isNonMobileScreen ? "50%" :"93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" textAlign ="center">
 
    <Loginform/>
    </Box>
    
  </Box>
  )
}
