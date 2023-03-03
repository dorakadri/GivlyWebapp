import React, { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import * as yup from "yup"
import {
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
import { Box } from "@mui/system";
import { PhotoCamera } from "@mui/icons-material";
const validationSchema=yup.object({
  name: yup.string().required("Name is required"),
  company: yup.string().required(" Company Name is required"),
  type: yup.string().required("Type is required"),
  giftPhoto: "",
  giftType:  yup.string().required("Type is required"),
})

export default function FormGift() {
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
 
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setImage(selectedFile);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      type: "",
      giftPhoto: "",
      giftType: "",
    },
    onSubmit:(values)=>{
      console.log(values)
    },
    validationSchema:validationSchema
  });

  return (
    <form   onSubmit={formik.handleSubmit}  style={{ display: 'flex' }}>
     
     <Grid container spacing={3}>
    <Grid item xs={12} sm={6}  >
      <Box  sx={{gap:3}}  >
 
      <Typography variant="h6"  >
          Name : 
        </Typography>
        <TextField
   fullWidth
                     sx={{mt:2 ,pb:"1rem"}}
          id="name"
          label="Name"
          placeholder="Biodegradable plate set "
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          name="name"
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          
        />
           <Typography variant="h6" >
           Company Name : 
        </Typography>
        <TextField
                      sx={{mt:2 ,pb:"1rem"}}
         fullWidth
          id="outlined-basic"
          label="Company Name"
          placeholder="Eastman "
          variant="outlined"
          value={formik.values.company}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}
          name="company"
        />
          <Typography variant="h6" >
           Type : 
        </Typography>
        <TextField
           sx={{mt:2 ,pb:"1rem"}}
         fullWidth
          id="outlined-basic"
          label="Type"
          placeholder="Biodegradable  "
          variant="outlined"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
          name="type"
        />
   
   <Typography variant="h6" >
   Gift Type : 
        </Typography>
        <FormControl fullWidth error={formik.touched.giftType && Boolean(formik.errors.giftType)}      sx={{mt:2 ,pb:"1rem"}}>
          <InputLabel id="demo-simple-select-label" > Gift Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.giftType}
            onBlur={formik.handleBlur}
            label="Gift Type"
            onChange={formik.handleChange}
       
            
            name="giftType"
          >
            <MenuItem value="">
            <em>None</em>
          </MenuItem>
            <MenuItem value={"luxurious"}>luxurious</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Basic"}>Basic</MenuItem>
          </Select>
          <FormHelperText>
  {formik.touched.giftType && formik.errors.giftType}
</FormHelperText>
         

        </FormControl>
  
        </Box>
    </Grid>

    <Grid item xs={12} sm={6}>
    <Box 
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid red',
    borderRadius: '5px',
    p: '1rem',
    height: '100%',
  }}
  border={`1px solid red`}
  borderRadius="5px"
  p="1rem"
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
    <Typography> upload the gift image image </Typography>
  ) : (
    <Paper style={{ width: 200, height: 200 }}>
      <img
        src={URL.createObjectURL(image)}
        alt="selected"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
      />
    </Paper>
  )}
</Box>

      </Grid>
      <Grid item xs={12} sx={{pb:"2rem"}} >
    
    <Button sx={{mt:"2rem" , width: '100%'}} variant="contained" size="large"  color="success" type="submit">
      Submit
    </Button>

</Grid>

   
      </Grid>

    </form>
  );
}
