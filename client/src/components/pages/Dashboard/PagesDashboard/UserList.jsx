import React, { useState } from "react";
import PagesHeaders from "../componentsDashboard/PagesHeaders";
import {
  Avatar,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e0dbdb",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#363535",
    color: "white",
    fontWeight: "bold",
  },
}));

export default function UserList() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "yass",
      lastName: "yass",
      email: "yass.yass@esprit.tn",
      profilePhoto: "https://picsum.photos/200/300",
      role: "admin",
      associationName: "Esprit",
      associationAddress: "123 Tunis",
      associationPhone: "7452364",
      isBlocked: false,
      isBanned: false,
      isAccountVerified: true,
    },
    {
      id: 2,
      firstName: "Eya",
      lastName: "Eya",
      email: "eya.eya@esprit.tn",
      profilePhoto: "https://picsum.photos/200/300",
      role: "user",
      associationName: "HAHAHA",
      associationAddress: "75 Rue blbalbala",
      associationPhone: "6783646",
      isBlocked: false,
      isBanned: true,
      isAccountVerified: false,
    },
    {
      id: 3,
      firstName: "Dorra",
      lastName: "Dorra",
      email: "dorra.dorra@esprit.tn",
      profilePhoto: "https://picsum.photos/200/300",
      role: "user",
      associationName: "GGGGGG",
      associationAddress: "645 NNNN",
      associationPhone: "7986531",
      isBlocked: true,
      isBanned: false,
      isAccountVerified: false,
    },
  ]);
  const handleBan = (user) => {
    console.log("yassss ");
  };

  const handleUnban = (user) => {
    console.log("yassss ");
  };
  return (
    <Card style={{ padding: "20px", margin: "20px", boxSizing: "border-box" }}>
      <PagesHeaders
        title="USER LIST"
        subtitle="Review and Manage User Accounts"
      />
      <TableContainer component={Paper} >
        <Table >
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Profile Photo</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Association Name</StyledTableCell>
              <StyledTableCell>Association Address</StyledTableCell>
              <StyledTableCell>Association Phone</StyledTableCell>
              <StyledTableCell>Is Blocked</StyledTableCell>
              <StyledTableCell>Is Banned</StyledTableCell>
              <StyledTableCell>Is Account Verified</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Avatar
                    alt="Profile"
                    src={user.profilePhoto}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.associationName}</TableCell>
                <TableCell>{user.associationAddress}</TableCell>
                <TableCell>{user.associationPhone}</TableCell>
                <TableCell>{user.isBlocked ? "Yes" : "No"}</TableCell>
                <TableCell>{user.isBanned ? "Yes" : "No"}</TableCell>
                <TableCell>{user.isAccountVerified ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleBan(user)}
                    disabled={user.isBanned}
                  >
                    Ban
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleUnban(user)}
                    disabled={!user.isBanned}
                  >
                    Unban
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
