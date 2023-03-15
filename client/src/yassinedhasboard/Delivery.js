import React from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import { Block, CheckCircle, Delete, Edit } from "@material-ui/icons";
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHeader: {
        backgroundColor: "#f0f0f0",
    },
    available: {
        color: "green",
    },
    unavailable: {
        color: "red",
    },
});

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

export default function DeliveryTable() {
    const classes = useStyles();
    /* const [rows, setRows] = useState([]);

     useEffect(() => {
         fetch('/data')
             .then(response => response.json())
             .then(data => setRows(data));
     }, []);*/

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="delivery table">
                <TableHead>
                    <TableRow className={classes.tableHeader}>
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
                                    <CheckCircle className={classes.available} />
                                ) : (
                                    <Block className={classes.unavailable} />
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
    );
}