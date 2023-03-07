import { Block, CheckCircle, Delete, Edit } from '@mui/icons-material'
import { Card, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React from 'react'
import PagesHeaders from '../componentsDashboard/PagesHeaders'
const rows = [
  {
      id: 1,
      firstName: "yass",
      isAvailable: true,
      phone: "12345678",
  },
  {
      id: 2,
      firstName: "yass",
      isAvailable: false,
      phone: "98765432",
  },
  {
      id: 3,
      firstName: "yass",
      isAvailable: true,
      phone: "46789531",
  },
];
export default function DelivererList() {
  return (
    <Card style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box'}}>
    <PagesHeaders title="DELIVERER LIST" subtitle="Manage Deliverer Profiles And Availability" />
    <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} aria-label="delivery table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f0f0f0"}}>
                        <TableCell>First Name</TableCell>
                        <TableCell align="center">Availability</TableCell>
                        <TableCell align="center">Phone Number</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell align="center">
                                {row.isAvailable ? (
                                    <CheckCircle  sx={{color: "green"}} />
                                ) : (
                                    <Block   sx={{color: "red"}} />
                                )}
                            </TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">

                                {/*<Tooltip title="Block">
                                    <IconButton>
                                        <Block />
                                    </IconButton>
                                </Tooltip>*/}


                               {/* <Tooltip title="Unblock">
                                    <IconButton>
                                        <CheckCircle />
                                    </IconButton>
                                </Tooltip>*/}

                                <Tooltip title="Modify">
                                    <IconButton /*onClick={() => }*/>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <IconButton /*onClick={() => }*/>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
  </Card>
  )
}
