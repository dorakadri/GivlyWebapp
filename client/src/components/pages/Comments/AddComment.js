import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../../ReduxB/slices/postsForum/postForumSlices";
import { TextField, Button, CircularProgress } from "@material-ui/core";

// Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postForumId }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Select data from store
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
      // Dispatch action
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema,
  });

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Error message */}
      {serverErr || appErr ? (
        <h2 className="text-red-400 pb-2">
          {serverErr} {appErr}
        </h2>
      ) : null}
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <TextField
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          id="text"
          placeholder="Add New comment"
          variant="outlined"
          margin="normal"
          fullWidth
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        {loading ? (
          <Button
            disabled
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<CircularProgress size={20} color="inherit" />}
            className="ml-2"
          >
            Loading please wait...
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            className="ml-2"
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddComment;
