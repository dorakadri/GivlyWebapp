import styled from '@emotion/styled';
import { Grid, Paper } from '@mui/material';
import { Box, height } from '@mui/system';
import React, { useEffect } from 'react'
import Cardswipe from './SwipeCard/Cardswipe';

const StyledBox = styled(Box)({
backgroundColor:"lightblue"
});
export default function Homepage() {
  

  return (
    <StyledBox width="100%" height="100%" p={2}>
   <Grid container spacing={2}  height="100%">
  <Grid item xs={8}>
    <Box width="100%"  height="100%" p={2} sx={{overflow:"hidden",position:"relative"}}>
    <Cardswipe/>
    </Box>
  </Grid>
  <Grid item xs={4}>
    <Box width="100%" p={2}>
      right box
    </Box>
  </Grid>
</Grid>
  </StyledBox>

  )
}
