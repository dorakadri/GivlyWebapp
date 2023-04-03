import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userProfileAction } from "../../../ReduxB/slices/users/usersSlices";
import AccountVerificationAlertWarning from "../Navigation/Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../Navigation/Alerts/AccountVerificationSuccessAlert";
import Finalnavbar from "./Finalnavbar";
import img from "./mm.jpg";

import { Box } from "@mui/material";
import styled from "@emotion/styled";
export default function Layout() {
  const store = useSelector((state) => state?.users);
  console.log(store.userAuth._id);
  const dispatch = useDispatch();
  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  const { profile, userAuth } = store;

  useEffect(() => {
    dispatch(userProfileAction(userAuth._id));
  }, [userAuth._id, dispatch]);
  const BlurredContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `url('https://e1.pxfuel.com/desktop-wallpaper/135/606/desktop-wallpaper-huawei-nova-8-pro-bubble-circle-white-background-purple-blue-stock-aesthetic-abstract-circle.jpg')`,
      backgroundSize: 'cover',
      filter: 'blur(10px)',
      zIndex: -1,
    },
  }));
  return (
    <Box
      display={"flex"}
    
    >
      <Box flexGrow={1} sx={{
        position: 'relative',
       // overflow: 'hidden',

        height: '100vh',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `url('https://img.freepik.com/free-vector/winter-blue-pink-gradient-background-vector_53876-117276.jpg?w=2000')`,
          backgroundSize: 'cover',
          filter: 'blur(10px)',
          zIndex: -1,
        },
      }} >
        <Finalnavbar profileurl={profile?.profilePhoto} />

        {userAuth && !userAuth.isAccountVerified && (
          <AccountVerificationAlertWarning />
        )}
        {loading && <h2 className="text-center">Loading please wait...</h2>}
        {token && <AccountVerificationSuccessAlert />}
        {appErr || serverErr ? (
          <h2 className="text-center text-red-500">
            {serverErr} {appErr}
          </h2>
        ) : null}
        <Outlet />
      </Box>
    </Box>
  );
}
