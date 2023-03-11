import React from "react";
import * as yup from "yup";
import { Field, Form, Formik, useFormik } from "formik";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

const validationSchema = yup.object({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required(" password is required"),
});
export default function Loginform() {
  const isnonMobile = useMediaQuery("(min-width :600px)");
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
      
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4,minmax(0,1fr))"
        sx={{ "&>div": { gridColumn: isnonMobile ? undefined : "span 4" } }}
      >
        <Typography variant="h6"> email :</Typography>
        <TextField
          sx={{ gridColumn: "span 4" }}
          id="name"
          label=" email"
          placeholder="exemple@gmail.com "
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
          sx={{ gridColumn: "span 4" }}
          type="password"
          id="outlined-basic"
          label="password"
          placeholder="password "
          variant="outlined"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          name="password"
        />
      </Box>
      <Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            backgroundColor: "#06A696",
  color:" white",
  border: "none",
  fontWeight:" bold",
  cursor: "pointer",
            m: "2rem 0",
            p: "1rem",
    
            "&:hover": { color: "black" , backgroundColor: "#06A696" },
          }}
        >
          LOGIN
        </Button>
        <Typography
          sx={{
            textDecoration: "underline",
            color: "black",
            "&:hover": {
              cursor: "pointer",
              color: "green",
            },
          }}
        >
          Don't have an account? Sign Up here
        </Typography>
        <Typography
          sx={{
            textDecoration: "underline",
            color: "black",
            "&:hover": {
              cursor: "pointer",
              color: "green",
            },
          }}
        >
          forget password
        </Typography>
      </Box>
    </form>
  );
}
