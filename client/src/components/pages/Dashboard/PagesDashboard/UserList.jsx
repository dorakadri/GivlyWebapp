import { Box, Card, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'
import React from 'react'
import PagesHeaders from '../componentsDashboard/PagesHeaders'



export default function UserList() {
  return (
<Card style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box'}}>
  <PagesHeaders title="USER LIST" subtitle="Review and Manage User Accounts" />
 
</Card>
  )
}
