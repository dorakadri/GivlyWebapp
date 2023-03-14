import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { passwordResetAction } from "../../../../ReduxB/slices/users/usersSlices";
import imagebg from "../LoginAndRegister/hd.jpg";
const formSchema = Yup.object({
  password: Yup.string().required("Password is required"),
});
export default function ResetPassword() {
  const token =  useParams();
  const navigate=useNavigate();
  const isnonMobile = useMediaQuery("(min-width :600px)");
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      console.log(values)
      const data = {
        password: values?.password,
        token:token?.token,
      };
      console.log(  data);
      dispatch(passwordResetAction(data));
    },
    validationSchema: formSchema,
  });
  const users = useSelector((state) => state?.users);
  const { passwordReset, loading, appErr, serverErr } = users;

  useEffect(() => {
    setTimeout(() => {
      if (passwordReset)  navigate("/login") ;
    }, 5000);
  }, [passwordReset]);

  return (
  
    <Box  sx={{
      background: `url(${imagebg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box
        p="2rem"
        borderRadius="1.5rem"
        width={isNonMobileScreen ? "30%" : "80%"}
        textAlign="center"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(5px)",
          borderRadius: "10px",
          boxShadow:
            "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
    
      {appErr || serverErr ? (
        <h3>
          {serverErr} {appErr}
        </h3>
      ) : null}
      {passwordReset && (
        <Typography>
          Password Reset Successfully. You will be redirected to login in 5
          seconds
        </Typography>
      )}


     
     <form onSubmit={formik.handleSubmit}>
     <Typography variant="body1" color="initial"> Enter Your New Password</Typography>
     <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4,minmax(0,1fr))"
        sx={{ "&>div": { gridColumn: isnonMobile ? undefined : "span 4" } }}
      >
        
      <TextField
          sx={{ gridColumn: "span 4",pb:"1rem" }}
                type="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter new Password"
              />
              </Box>
      {loading ? (
          <Button
            sx={{  width: "100%",   p: "1rem",  mt:"0",
            mb:"2rem", }}
            variant="contained"
            size="large"
            color="error"
            disabled
         
          >
            Loading....
          </Button>
        ) : (
          <Button
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#06A696",
              color: " white",
              border: "none",
              fontWeight: " bold",
              cursor: "pointer",
              mt:"0",
              mb:"2rem",
              p: "1rem",
              textAlign: "center",

              "&:hover": { color: "white", backgroundColor: "#06A696" },
            }}
          >
                Reset Password
          </Button>
        )}
        </form>
        </Box>
        </Box>
  );
}
