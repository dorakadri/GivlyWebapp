import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { passwordResetAction } from "../../../../ReduxB/slices/users/usersSlices";

const formSchema = Yup.object({
  password: Yup.string().required("Password is required"),
});
export default function ResetPassword() {
  const token =  useParams();
  const navigate=useNavigate();
 
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
  
    <div>
      ResetPassword
      {appErr || serverErr ? (
        <h3>
          {serverErr} {appErr}
        </h3>
      ) : null}
      {passwordReset && (
        <Typography>
          Password Reset Successfully. You will be redirected to login with 5
          seconds
        </Typography>
      )}


      <Typography variant="body1" color="initial"> Enter Your New Password</Typography>
     <form onSubmit={formik.handleSubmit}>
      <TextField
                type="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter new Password"
              />
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
    </div>
  );
}
