import { Box, Card, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GiftCard from '../../componentsDashboard/GiftCard'
import PagesHeaders from '../../componentsDashboard/PagesHeaders'
import  myService   from '../../servicedash/Service';


export default function GiftList() {
  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    myService.getGifts().then((response) => {
      setGifts(response.data);
  
    });
  }, []);


  return (
<Box style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box'}}>
  <PagesHeaders title="GIFT LIST" subtitle="Review and Manage gifts " />
  <Grid container spacing={2}>
      {gifts.map((gift) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={gift._id}>
          <GiftCard gift={gift} />
          
        </Grid>
      ))}
    </Grid>

</Box>
  )
}
