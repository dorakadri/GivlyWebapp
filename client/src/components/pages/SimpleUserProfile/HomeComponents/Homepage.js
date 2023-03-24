import styled from '@emotion/styled';
import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import Cardswipe from './SwipeCard/Cardswipe';

const StyledBox = styled(Box)({
backgroundColor:"lightblue"
});
export default function Homepage() {
  

  return (
    <StyledBox width="100%" p={2}>
   <Grid container spacing={2}>
  <Grid item xs={8}>
    <Box width="100%" p={2}>
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
