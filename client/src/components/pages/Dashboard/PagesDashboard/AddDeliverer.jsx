import { Card } from '@mui/material'
import React from 'react'
import PagesHeaders from '../componentsDashboard/PagesHeaders'

export default function AddDeliverer() {
  return (
    <Card style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box'}}>
  <PagesHeaders title="ADD DELIVERER" subtitle="Add a New Delivery Partner to Your Network" />
 
</Card>
  )
}
