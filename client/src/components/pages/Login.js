import React, { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import * as yup from "yup";
import { Field, Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../ReduxB/slices/users/usersSlices";
import { Navigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string().required("email is required"),
  password: yup.string().required(" password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
      console.log(values);
    },
    validationSchema: validationSchema,
  });




  //redirect

  const store = useSelector( state => state?.users);
  console.log(store); 
  const {userAuth, loading ,serverErr, appErr} = store;
  
  
  if(userAuth){
  
  return <Navigate to="/profile" />;
  }


  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ gap: 3 }}>


          {appErr || serverErr ? (
              <Typography variant="h6">
                {serverErr} {appErr}{" "}
              </Typography>
            ) : null}

            <Typography variant="h6"> email :</Typography>
            <TextField
              fullWidth
              sx={{ mt: 2, pb: "1rem" }}
              id="name"
              label=" email"
              placeholder="Biodegradable plate set "
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="text"
              name="email"
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Typography variant="h6">password :</Typography>
            <TextField
              sx={{ mt: 2, pb: "1rem" }}
              fullWidth
              id="outlined-basic"
              label="password"
              placeholder="Eastman "
              variant="outlined"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              name="password"
            />
          </Box>

          {loading ? <Button
            sx={{ mt: "2rem", width: "100%" }}
            variant="contained"
            size="large"
            color="error"
            disabled
          >
            Loading....
          </Button>:<Button
            sx={{ mt: "2rem", width: "100%" }}
            variant="contained"
            size="large"
            color="success"
            type="submit"
          >
            Login
          </Button>}
        </Grid>
      </Grid>
    </form>
  );
}
