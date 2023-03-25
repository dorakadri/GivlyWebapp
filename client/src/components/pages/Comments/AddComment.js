import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../../ReduxB/slices/comments/commentSlices";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    maxWidth: "sm",
    margin: "auto",
    marginTop: "1rem",
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    minWidth: "6rem",
  },
  loadingButton: {
    minWidth: "6rem",
  },
}));

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postForumId }) => {
  const classes = useStyles();

  //dispatch
  const dispatch = useDispatch();

  //select data from store
  const comment = useSelector((state) => state?.comment);
  const { loading, appErr, serverErr } = comment;

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values) => {
      const data = {
        postForumId,
        description: values?.description,
      };
      //dispatch action
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema,
  });

  return (
    <div className={classes.root}>
      {/* Err msg */}
      <Container className="text-red-500">
        {appErr || serverErr ? (
          <Typography
            variant="h6"
            color="error"
            align="center"
            sx={{ mt: 2, gridColumn: "span 4" }}
          >
            {serverErr} {appErr}{" "}
          </Typography>
        ) : null}
      </Container>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          className={classes.textField}
          variant="outlined"
          id="description"
          name="description"
          label="Add New Comment"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        {loading ? (
          <Button
            className={`${classes.loadingButton}`}
            variant="contained"
            color="default"
            disabled={serverErr}
            startIcon={<CircularProgress size={20} />}
          >
            Loading...
          </Button>
        ) : (
          <Button
            disabled={serverErr}
            className={`${classes.button}`}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddComment;
