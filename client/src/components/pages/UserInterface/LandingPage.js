import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import FlexBetween from '../../common/FlexBetween'
import Navbar from './landingcomponent/Navbar'

export default function LandingPage() {
  return (
    <div>
      <Navbar/>
      <FlexBetween p="1rem" >
       <Stack sx={{flex: 1 ,gap:2,  }}>
        <Typography variant='h4' fontWeight="bold"> ABOUT US</Typography>
        <Typography variant='body1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, quod explicabo fuga sapiente assumenda repellat. Animi nihil, odit et suscipit deserunt laboriosam deleniti omnis fuga labore consectetur atque dolores perspiciatis.</Typography>
        <Button sx={{   justifyContent: "flex-start"}} >CLick here</Button>
       </Stack>
       <Stack sx={{mx:'10rem',flex:1   }}>
       <Card sx={{ minWidth: 275 }}>

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          ffdf
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
       </Stack>
      </FlexBetween>
    </div>
  )
}
