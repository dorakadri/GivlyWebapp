import styled from '@emotion/styled';
import { Grid, Paper } from '@mui/material';
import { Box, height } from '@mui/system';
import React, { useEffect } from 'react'
import Matches from './matches/Matches';

import Cardswipe from './SwipeCard/Cardswipe';

const StyledBox = styled(Box)({
backgroundColor:"lightblue"
});
export default function Homepage() {
  

  return (

   <Grid container spacing={2} sx={{m:0,pr:"2rem"}}  height="100%">
  <Grid item xs={7}>
    <Box width="100%"  height="100%" sx={{overflow:"hidden",position:"relative"}}>
    <Cardswipe/>
    </Box>
  </Grid>
  <Grid item xs={5}>
   
      <Matches/>
    
  </Grid>
</Grid>


  )
}
