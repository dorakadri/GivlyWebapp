import React, { useEffect, useState } from "react";
import PagesHeaders from "../componentsDashboard/PagesHeaders";
import {
  Avatar,
  Button,
  Card,
  Pagination,
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
import myService from "../servicedash/Service";
import { useSelector } from "react-redux";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {

    backgroundColor: theme.palette.mode === 'dark' ?   '#363535' :"#e0dbdb",
 
  },

}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
  
  
    fontWeight: 'bold',
  },
}));

export default function UserList() {
  const [users, setUsers] = useState([]);
  const store = useSelector( state => state?.users.userAuth.token
    );
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
  useEffect(() => {
    myService.getalluser(store).then((users) => {
      console.log(users);
      setUsers(users.data);
    });
  }, []);

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
            {users.slice(startIndex, endIndex).map((user) => (
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
                    color="error"
                    size="small"
                    onClick={() => handleBan(user)}
                    disabled={user.isBanned}
                  >
                    Ban
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
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
        <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        count={Math.ceil(users.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
      />
      </TableContainer>
    </Card>
  );
}
