import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import FlexBetween from "../../common/FlexBetween";

import Navbar from "./landingcomponent/Navbar";

export default function LandingPage() {
  return (
    <Box sx={{ px: "3rem" }}>
      <Navbar />
      <FlexBetween p="1rem">
        <Stack sx={{ flex: 1, gap: 2, maxWidth: "40%" }}>
          <Typography variant="h4" fontWeight="bold">
            ABOUT US
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
            quod explicabo fuga sapiente assumenda repellat. Animi nihil, odit
            et suscipit deserunt laboriosam deleniti omnis fuga labore
            consectetur atque dolores perspiciatis.
          </Typography>
          <Button sx={{ justifyContent: "flex-start" }}>CLick here</Button>
        </Stack>
        <Card
          sx={{
            p: 8,
            background: "#EDEEF0",
            borderRadius: "20px",
            border: "1px solid rgba(184, 167, 167, 0.33)",
            boxShadow: " 0px 50px 77px -1px rgba(0, 0, 0, 0.25)",
            backgroundColor: "#f8f9fa",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "white",
                px: "1rem",
                py: "0.5rem",
                borderRadius: "30px",
                backgroundColor: "#06A696",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#38BC73",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Card>
      </FlexBetween>
    </Box>
  );
}
