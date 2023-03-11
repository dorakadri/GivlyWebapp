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
import { registerUserAction } from "../../ReduxB/slices/users/usersSlices";
import { Navigate } from "react-router-dom";

const validationSchema = yup.object({
  firstName: yup.string().required("Name is required"),
  lastName: yup.string().required(" Company Name is required"),
  email: yup.string().required("Type is required"),
  bio: yup.string().required("Type is required"),
  password: yup.string().required("Type is required"),
  role: yup.string().required("Type is required"),
});

export default function Register() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    role: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      if (!image) return console.log("fam chay");
      const url = await uploadImage(image);
      console.log(url);
      const v = { ...values, profilePhoto: url };
      dispatch(registerUserAction(v));
    },
    validationSchema: validationSchema,
  });

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "aup1uxxk");
    try {
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dbgphvyf9/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();

      return urlData.url;
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      console.log("wa fot rak");
    } else {
      setImage(file);
    }
  };


  const storeData = useSelector((store) => store?.users);
  const { loading, appErr, serverErr, registered } = storeData;
  if (registered) {
    return <Navigate to="/login" />;
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

            <Typography variant="h6"> firstName :</Typography>
            <TextField
              fullWidth
              sx={{ mt: 2, pb: "1rem" }}
              id="name"
              label=" firstName"
              placeholder="Biodegradable plate set "
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              type="text"
              name="firstName"
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <Typography variant="h6">lastName :</Typography>
            <TextField
              sx={{ mt: 2, pb: "1rem" }}
              fullWidth
              id="outlined-basic"
              label="lastName"
              placeholder="Eastman "
              variant="outlined"
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              name="lastName"
            />
            <Typography variant="h6">email</Typography>
            <TextField
              sx={{ mt: 2, pb: "1rem" }}
              fullWidth
              id="outlined-basic"
              label="email"
              placeholder="Biodegradable  "
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              name="email"
            />

            <Typography variant="h6">password</Typography>
            <TextField
              sx={{ mt: 2, pb: "1rem" }}
              fullWidth
              id="outlined-basic"
              type="password"
              label="password"
              placeholder="passworddegradable  "
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              name="password"
            />
            <Typography variant="h6">bio</Typography>
            <TextField
              sx={{ mt: 2, pb: "1rem" }}
              fullWidth
              id="outlined-basic"
              label="bio"
              placeholder="Biodegradable  "
              variant="outlined"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
              name="bio"
            />

            <Typography variant="h6">role :</Typography>
            <FormControl
              fullWidth
              error={formik.touched.role && Boolean(formik.errors.role)}
              sx={{ mt: 2, pb: "1rem" }}
            >
              <InputLabel id="demo-simple-select-label"> Gift Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.role}
                onBlur={formik.handleBlur}
                label="Gift Type"
                onChange={formik.handleChange}
                name="role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"SimpleUser"}>SimpleUser</MenuItem>
                <MenuItem value={"Association"}>Association</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.role && formik.errors.role}
              </FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid grey",
              borderRadius: "5px",

              p: "1rem",
              height: "100%",
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden type="file" onChange={handleImageChange} />
              <PhotoCamera />
            </IconButton>
            {!image ? (
              <Typography> upload your post image </Typography>
            ) : (
              <Paper style={{ width: 200, height: 200 }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="selected"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Paper>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ pb: "2rem" }}>
          {loading ? (
            <Button
              sx={{ mt: "2rem", width: "100%" }}
              variant="contained"
              size="large"
              color="error"
              disabled
            >
              loading please wait...
            </Button>
          ) : (
            <Button
              sx={{ mt: "2rem", width: "100%" }}
              variant="contained"
              size="large"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sx={{ pb: "2rem" }}>
          {loading ? (
            <Button
              sx={{ mt: "2rem", width: "100%" }}
              variant="contained"
              size="large"
              color="error"
              disabled
            >
              loading please wait...
            </Button>
          ) : (
            <Button
         
              sx={{ mt: "2rem", width: "100%" }}
              variant="contained"
              size="large"
              color="success"
              type="submit"
            >
              Signup with google
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}
