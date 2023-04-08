import React, { useContext, useEffect } from "react";
//import { Col, ListGroup, Row } from "react-bootstrap";
import {
  List,
  ListItem,
  ListItemText,
  Badge,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import {
  addNotifications,
  resetNotifications,
} from "../ReduxB/slices/users/usersSlices";
function Sidebar() {
  const user = useSelector((state) => state.users);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    console.log(room);
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
  }
  

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);

    console.log(payload);
  });

  function getRooms() {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }
  console.log(rooms);
  function orderIds(id1, id2) {
    console.log(id1 + " " + id2);

    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user.userAuth._id, member._id);
    console.log(roomId);
    joinRoom(roomId, false);
  }
  // design

  const useStyles = makeStyles((theme) => ({
    memberStatusImg: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    memberStatus: {
      marginBottom: 0,
      position: "relative",
    },
    sidebarOnlineStatus: {
      color: "green",
      fontSize: "11px",
      position: "absolute",
      zIndex: 99,
      bottom: 0,
      left: "12px",
    },
    sidebarOfflineStatus: {
      color: "#e3b505",
      fontSize: "11px",
      position: "absolute",
      zIndex: 99,
      bottom: 0,
      left: "12px",
    },
  }));

  const classes = useStyles();

  if (!user) {
    return <></>;
  }
  return (
    <>
      <Typography variant="h5" noWrap style={{ color: "orange" }} gutterBottom>
        <br></br>
        Available Rooms
      </Typography>
      <List>
        {rooms?.map((room, idx) => (
          <ListItem
            key={idx}
            onClick={() => joinRoom(room)}
            button
            selected={room === currentRoom}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ListItemText primary={room} />
            {currentRoom !== room && (
              <Badge color="primary" badgeContent={user?.newMessages[room]}>
                &nbsp;
              </Badge>
            )}
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" noWrap style={{ color: "orange" }} gutterBottom>
        Members
      </Typography>
      <List>
        {members?.map((member) => (
          <ListItem
            key={member._id}
            button
            disabled={member._id === user?.userAuth._id}
            onClick={() => handlePrivateMemberMsg(member)}
            selected={privateMemberMsg?._id === member?._id}
            sx={{ cursor: "pointer" }}
          >
            <div className={classes.memberStatus}>
              <Avatar
                src={member.profilePhoto}
                className={classes.memberStatusImg}
              />
              {member.status === "online" ? (
                <Avatar
                  className={classes.sidebarOnlineStatus}
                  style={{ backgroundColor: "#4CAF50", width: 20, height: 20 }}
                >
                  o
                </Avatar>
              ) : (
                <Avatar
                  className={classes.sidebarOfflineStatus}
                  style={{ backgroundColor: "#A9A9A9", width: 20, height: 20 }}
                >
                  o
                </Avatar>
              )}
            </div>
            <ListItemText
              primary={
                <>
                  {member.firstName}
                  {member._id === user?.userAuth._id && <p>you</p>}
                  {member.status === "offline" && <p>offline</p>}
                  {member.status === "online" && <p>online</p>}
                </>
              }
            />
            <Badge
              color="primary"
              badgeContent={
                user?.newMessages[orderIds(user.userAuth._id, member?._id)]
              }
              sx={{ marginLeft: "auto" }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
export default Sidebar;
