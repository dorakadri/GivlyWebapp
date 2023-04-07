import styled from '@emotion/styled';
import { Box, Grid, Paper } from '@mui/material';

import React, { useEffect } from 'react'

import Matches from './matches/Matches';

import Cardswipe from './swipeCard/Cardswipe';


export default function Homepage() {
  

  return (

   <Grid container spacing={2} sx={{m:0,pr:"2rem"}}  >
  

  <Grid item xs={7} sx={{mt:0}} >
    <Box width="100%"  height="100%" sx={{overflow:"hidden",position:"relative",mt:0}}>

   <Cardswipe/> 
    </Box>
  </Grid>
  <Grid item xs={5}>
   
      <Matches/>
    
  </Grid>
</Grid>


  )
}
