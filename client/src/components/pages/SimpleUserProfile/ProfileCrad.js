import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Typography from "@mui/material/Typography";

import { Box, Stack } from "@mui/system";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userProfileAction } from "../../../ReduxB/slices/users/usersSlices";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfileCrad({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  console.log(data);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 150, height: 150 }}
            src={data?.profilePhoto}
            onClick={(e) => setOpen(true)}
          ></Avatar>
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {data?.firstName} {data?.lastName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EmailOutlinedIcon />
            <Typography variant="body2" color="text.secondary">
              {data?.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MilitaryTechOutlinedIcon />
            <Typography variant="body2" color="text.secondary">
              Rank
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CardGiftcardOutlinedIcon />
            <Typography variant="body2" color="text.secondary">
              Gifts{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PostAddOutlinedIcon />
            <Typography variant="body2" color="text.secondary">
              Posts
            </Typography>
          </Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#06A696",
              color: " white",
              border: "none",
              fontWeight: " bold",
              cursor: "pointer",
              mt: "0",
              mb: "2rem",
              p: "1rem",
              textAlign: "center",

              "&:hover": { color: "white", backgroundColor: "#06A696" },
            }}
            onClick={() => navigate(`./update/${data?._id}`)}
          >
            edit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
