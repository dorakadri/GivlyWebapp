import { Card } from '@mui/material'
import React from 'react'
import PagesHeaders from '../componentsDashboard/PagesHeaders'

export default function DelivererList() {
  return (
    <Card style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box'}}>
    <PagesHeaders title="DELIVERER LIST" subtitle="Manage Deliverer Profiles And Availability" />
   
  </Card>
  )
}
