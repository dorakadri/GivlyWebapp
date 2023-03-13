import React from 'react'
import ProfileCrad from './ProfileCrad'
import Navbar from './Navbar'
import Grid from '@mui/material/Grid';
import TabProfile from './TabProfile'
export default function ProfilePage() {
  return (
    <div>
    <Grid container spacing={3}>
  <Grid item xs={12}>
    <Navbar/>
  </Grid>
  <Grid item xs={6}>
  <ProfileCrad/>
  </Grid>
  <Grid item xs={6}>
  <TabProfile/>
  </Grid>
</Grid>
    </div>
  )
}
