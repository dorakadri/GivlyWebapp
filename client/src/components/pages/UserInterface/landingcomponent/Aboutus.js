import styled from "@emotion/styled";
import { Button, Grid, Typography } from "@mui/material";
import { Box, display, Stack, width } from "@mui/system";
import Spline from "@splinetool/react-spline";
import React, { Suspense } from "react";

const StyledBox = styled(Box)({
  height: "100vh",
  scrollSnapAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@media only screen and (max-width:771px)": {
    height: "200vh",
    paddingTop: "400px"
  },

});


const Right = styled(Box)({
  flex: "3",

  height: "100%",
  width: "100%",


  "@media only screen and (max-width: 758px)": {
    flex: "1",
  },
});
const Left = styled(Box)({
  flex: 2,
  display: "flex",
  paddingLeft:"5rem",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px", // reduce the gap between items
  "@media only screen and (max-width: 758px)" :{
    flex: 1,
    alignItems: "center",
    textAlign:"center",
    paddingLeft:"0",
 
  }
});
const Section = styled(Box)({
  height: "100vh",
 marginInline:"",
  scrollSnapAlign: "center",
  display: "flex",
  justifyContent: "space-between",
  paddingX: "4rem", // reduce the padding on the sides

  // Add styles for smaller screens
  "@media only screen and (max-width: 768px)": {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
 
  },
});

export default function Aboutus() {
  return (
    <StyledBox>
      <Section>
        <Left  >
          <Typography variant="h2" sx={{ fontSize: "clamp(3rem, 6vw, 6rem)",  }}>
            {" "}
            ABOUT US{" "}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "500" }}>
            {" "}
            Who we are{" "}
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            magnam eos recusandae! Porro eum officia aliquam mollitia deserunt.
            Cumque obcaecati officia consequuntur, placeat nobis ipsa optio
            quibusdam? Alias, commodi reiciendis!
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "500" }}>
            {" "}
            What we Do{" "}
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            magnam eos recusandae! Porro eum officia aliquam mollitia deserunt.
            Cumque obcaecati officia consequuntur, placeat nobis ipsa optio
            quibusdam? Alias, commodi reiciendis!
          </Typography>
        </Left>

        <Right>
     

        <Spline scene="https://prod.spline.design/TABIk2vBmHUsMcg0/scene.splinecode" />

        </Right>
      </Section>
    </StyledBox>
  );
}
