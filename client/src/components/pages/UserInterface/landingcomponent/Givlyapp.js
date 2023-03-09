import styled from "@emotion/styled";
import { Button, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import NavbarLandingpage from "./NavbarLandingpage";

const StyledBox = styled(Box)({
  height: "75vh",
  scrollSnapAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",


});

const Section = styled(Box)({
   


  padding: "0 2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  gap:"2rem",
  textAlign: "center",
  '& > *': {
    margin: "1rem 0",
  },
  
  "@media only screen and (max-width:  610px)": {

    paddingTop: "20px"
  },
});

const Title = styled(Typography)({
  fontWeight: "700",
  fontSize: "clamp(3rem, 6vw, 6rem)", 
});

export default function Givlyapp() {
  return (
    <StyledBox>

      <Section>
        <Title variant="h1">
          The place for anyone from anywhere to donate anything
        </Title>
        <Typography variant="body1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          nam vero eligendi. Distinctio error, magnam eum quam a earum tempora
          laudantium ea. Cumque eius labore culpa commodi odit iste? Error.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{zIndex:"99999"}}
        >
         <Button
              sx={{

                color: "black",
                px: "1rem",
                py: "0.5rem",
                borderRadius: "8px",
                backgroundColor: "white",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#38BC73",
                },
                width: "150px", // set the width of the button
       
              }}
            >Sign up </Button>
         <Button
              sx={{
                color: "white",
                px: "1rem",
                py: "0.5rem",
                borderRadius: "8px",
                border: "1px solid white",
                
                "&:hover": {
                   outline: "2px solid white",
                },
                width: "150px",  
              }}
            >Login</Button>
        </Stack>
      </Section>
    </StyledBox>
  );
}
