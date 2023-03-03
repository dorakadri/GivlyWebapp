import React, { lazy, Suspense, useMemo } from "react";
import {
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/system";

const DashboardComponent = lazy(() =>
  import("./PagesDashboard/DashboardComponent")
);
const Layout = lazy(() => import("./PagesDashboard/Layout"));
const UserList = lazy(() => import("./PagesDashboard/UserList"));

const DelivererList = lazy(() => import("./PagesDashboard/DelivererList"));
const AddDeliverer = lazy(() => import("./PagesDashboard/AddDeliverer"));
const GiftList = lazy(() => import("./PagesDashboard/Gift/GiftList"));
const AddGift = lazy(() => import("./PagesDashboard/Gift/AddGift"));
const GiftUpdate = lazy(() => import("./PagesDashboard/Gift/GiftUpdate"));

function DashboardRoutes() {
  const mode = useSelector((state) => state.dashboard.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="index">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<DashboardComponent />} />
                <Route path="/userslist" element={<UserList />} />
                <Route path="/delivererlist" element={<DelivererList />} />
                <Route path="/adddeliverer" element={<AddDeliverer />} />
                <Route path="/giftlist" element={<GiftList />} />
                <Route path="/giftlist/update/:id" element={<GiftUpdate />} />
                <Route path="/addgift" element={<AddGift />} />
              </Route>
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default DashboardRoutes;
