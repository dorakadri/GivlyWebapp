import React from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as yup from "yup";
import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    form: {
        backgroundColor: "#cfe4e7",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "0 auto",
    },
    title: {

        color: "#070707",
        marginBottom: "24px",
        textAlign: "center",
    },
    fieldset: {
        border: "none",
    },
    button: {
        marginTop: "24px",
        backgroundColor: "#28a745",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#218838",
        },
    },
    formControl: {
        minWidth: "100%",
    },
    select: {
        "& .MuiSelect-select:focus": {
            backgroundColor: "#FFFFFF",
        },
    },
    label: {
        color: "#333333",
        "&.Mui-focused": {
            color: "#333333",
        },
    },
});

const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    isAvailable: yup.boolean().required("Availability is required"),
    phone: yup.string().required("Phone number is required"),
});

export default function AddDelivery() {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            isAvailable: true,
            phone: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema: validationSchema,
    });

    return (
        <Box className={classes.form}>
            <Typography variant="h5" className={classes.title}>Add Delivery</Typography>
            <form onSubmit={formik.handleSubmit}>
                <fieldset className={classes.fieldset}>
                    <Stack gap={3}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            type="text"
                            name="firstName"
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <FormControl fullWidth error={formik.touched.isAvailable && Boolean(formik.errors.isAvailable)}>
                            <InputLabel id="isAvailableLabel"> Availability </InputLabel>
                            <Select
                                labelId="isAvailableLabel"
                                id="isAvailable"
                                value={formik.values.isAvailable}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="isAvailable"
                            >
                                <MenuItem value={true}>Available</MenuItem>
                                <MenuItem value={false}>Not Available</MenuItem>
                            </Select>
                            <FormHelperText>{formik.touched.isAvailable && formik.errors.isAvailable}</FormHelperText>
                        </FormControl>
                        <TextField
                            id="phone"
                            label="Phone Number"
                            variant="outlined"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            type="text"
                            name="phone"
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <Button/* onClick={() => } */className={classes.button} variant="contained" /*color="primary"*/ type="submit">Submit</Button>
                    </Stack>
                </fieldset>
            </form>
        </Box>
    );
}
