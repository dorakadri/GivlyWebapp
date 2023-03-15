import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core';

const useStyles = makeStyles({
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#363535',
        color: 'white',
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#e0dbdb',
        },
    },
    tableCell: {
        fontWeight: 'bold',
    },
});

function UserTable() {
    const classes = useStyles();
    const [users, setUsers] = useState([
        {
            id: 1,
            firstName: 'yass',
            lastName: 'yass',
            email: 'yass.yass@esprit.tn',
            profilePhoto: 'https://via.placeholder.com/150',
            role: 'admin',
            associationName: 'Esprit',
            associationAddress: '123 Tunis',
            associationPhone: '7452364',
            isBlocked: false,
            isBanned: false,
            isAccountVerified: true,
        },
        {
            id: 2,
            firstName: 'Eya',
            lastName: 'Eya',
            email: 'eya.eya@esprit.tn',
            profilePhoto: 'https://via.placeholder.com/150',
            role: 'user',
            associationName: 'HAHAHA',
            associationAddress: '75 Rue blbalbala',
            associationPhone: '6783646',
            isBlocked: false,
            isBanned: true,
            isAccountVerified: false,
        },
        {
            id: 3,
            firstName: 'Dorra',
            lastName: 'Dorra',
            email: 'dorra.dorra@esprit.tn',
            profilePhoto: 'https://via.placeholder.com/150',
            role: 'user',
            associationName: 'GGGGGG',
            associationAddress: '645 NNNN',
            associationPhone: '7986531',
            isBlocked: true,
            isBanned: false,
            isAccountVerified: false,
        },
    ]);

   /* useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);*/


    const handleBan = (user) => {
        console.log('yassss ');
    }

    const handleUnban = (user) => {
        console.log('yassss ');

    }

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>First Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Last Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Profile Photo</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Role</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Association Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Association Address</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Association Phone</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Is Blocked</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Is Banned</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Is Account Verified</TableCell>
                        <TableCell className={classes.tableHeader}></TableCell> {/* empty cell for buttons */}




                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className={classes.tableRow}>
                            <TableCell className={classes.tableCell}>{user.firstName}</TableCell>
                            <TableCell className={classes.tableCell}>{user.lastName}</TableCell>
                            <TableCell className={classes.tableCell}>{user.email}</TableCell>
                            <TableCell className={classes.tableCell}>
                                <img src={user.profilePhoto} alt="Profile" style={{ width: 50, borderRadius: '50%' }} />
                            </TableCell>
                            <TableCell className={classes.tableCell}>{user.role}</TableCell>
                            <TableCell className={classes.tableCell}>{user.associationName}</TableCell>
                            <TableCell className={classes.tableCell}>{user.associationAddress}</TableCell>
                            <TableCell className={classes.tableCell}>{user.associationPhone}</TableCell>
                            <TableCell className={classes.tableCell}>{user.isBlocked ? 'Yes' : 'No'}</TableCell>
                            <TableCell className={classes.tableCell}>{user.isBanned ? 'Yes' : 'No'}</TableCell>
                            <TableCell className={classes.tableCell}>{user.isAccountVerified ? 'Yes' : 'No'}</TableCell>
                            <TableCell className={classes.tableCell}>
                                <Button variant="outlined" color="secondary" size="small" onClick={() => handleBan(user)} disabled={user.isBanned}>Ban</Button>
                                <Button variant="outlined" color="primary" size="small" onClick={() => handleUnban(user)} disabled={!user.isBanned}>Unban</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;
