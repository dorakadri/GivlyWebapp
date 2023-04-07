import React from "react";
import { Container, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";

function Chat() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={8}>
          <MessageForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
