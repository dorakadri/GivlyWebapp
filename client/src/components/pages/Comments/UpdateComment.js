import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCommentAction,
  fetchCommentAction,
} from "../../../ReduxB/slices/comments/commentSlices";
import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
// Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const UpdateComment = ({

}) => {
      const { id } = useParams();
  // Dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch comment
  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [dispatch, id]);

  // Select comment from store
  const comment = useSelector((state) => state?.comment);
  const { commentDetails, isUpdate } = comment;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: (values) => {
      const data = {
        id,
        description: values?.description,
      };
      // Dispatch action
      dispatch(updateCommentAction(data));
    },
    validationSchema: formSchema,
  });

  // Redirect
  if (isUpdate) return navigate("/forum");

  return (
    <Box
      sx={{
        height: "96vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextareaAutosize
            onBlur={formik.handleBlur("description")}
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            aria-label="description"
            placeholder="Add New comment"
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              border: "2px solid",
              borderColor: "gray.300",
              borderRadius: "4px",
              padding: "12px",
              fontSize: "16px",
              minWidth: "300px",
              minHeight: "200px",
              resize: "none",
              mr: "2",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "indigo.600",
              color: "white",
              "&:hover": {
                backgroundColor: "indigo.700",
              },
            }}
          >
            Submit
          </Button>
        </form>
        <Typography sx={{ color: "red.400", mt: 2, mb: 2 }}>
          {formik.touched.description && formik.errors.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default UpdateComment;
