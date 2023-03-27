import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField'
import { Button, Card, CardContent, CardActions, Typography, CardActionArea, CardMedia, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { diyGenerationAction } from '../../../../ReduxB/slices/IA/diySlice';

export default function DiyGeneration() {
const [object,setObject] =useState();
  const dispatch = useDispatch();

function handlechange (e){
//  console.log(e.target.value)
setObject(e.target.value)

}

function handleclick() {
  dispatch(diyGenerationAction(object))
 // console.log(object)
}



  const diys = useSelector((state) => state.diy);
  const { diylist, loading, appErr, serverErr } = diys;
  console.log(diylist);
  return (
    <Box>
    <TextField
      id="diy"
      label="diy"
      onChange={handlechange}
      
    />
    <Button onClick={handleclick}>generate</Button>

<Grid container spacing={2}>
      {diylist && diylist.map((d,i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={d.img_url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {d.title}
          </Typography>
 
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={d.link} target="_blank" rel='noreferrer'>
          take a look
        </Button>
      </CardActions>
    </Card>
          
  </Grid>
      ))}
        </Grid>
    </Box>
  )
}
