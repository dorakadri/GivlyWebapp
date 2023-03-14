import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { passwordResetTokenAction } from '../../../../ReduxB/slices/users/usersSlices';
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
  });

export default function ResetPasswordForm() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
          email: "",
        },
        onSubmit: values => {
          //dispath the action
          dispatch(passwordResetTokenAction(values?.email));
        },
        validationSchema: formSchema,
      });
      const users = useSelector(state => state?.users);
      const { passwordToken, loading, appErr, serverErr } = users;
      console.log(passwordToken)
  return (
    <div>
      <Typography>ResetPasswordForm</Typography>  
      {appErr || serverErr ? (
            <Typography>
              {serverErr} {appErr}
            </Typography>
          ) : null}
      {passwordToken && (
            <Typography>
              Email is successfully sent to your email. Verify it within 10
              minutes.
            </Typography>
          )}
       <form   onSubmit={formik.handleSubmit}>
      <TextField
          sx={{ gridColumn: "span 4" }}
          id="name"
          label=" email"
          placeholder="exemple@gmail.com "
          variant="filled"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="text"
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
  )
}
