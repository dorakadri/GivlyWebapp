
import { Route, Routes } from "react-router-dom";

import {
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";
import { Suspense, lazy, useMemo } from "react";

import { themeSettingsall } from "../../../theme";
import { useSelector } from "react-redux";

const AddPost = lazy(() => import("./Addposts/AddPost"));
const Layout = lazy(() => import("./Layout"));
const LayoutSidebar = lazy(() => import("./LayoutSidebar"));
const Homepage = lazy(() => import("./homecomponent/Homepage"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const SimpleUserProfileEdit = lazy(() => import("./SimpleUserProfileEdit"));
const DiyGeneration = lazy(() => import("./objectRelated/DiyGeneration"));

function SimpleUserRoutes() {
  
const mode = useSelector((state) => state.globaltheme.mode);
const theme = useMemo(() => createTheme(themeSettingsall(mode)), [mode]);
  return (

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
          <Route path="/" element={<LayoutSidebar />}>
            <Route path="home" element={<Homepage />} />
            <Route path="diygeneration" element={<DiyGeneration />} />
          </Route>
          <Route path="profile/update/:id" element={<SimpleUserProfileEdit />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="Addpost" element={<AddPost/>} />
        </Route>
      </Routes>

      </Suspense>
      </ThemeProvider>
  
  );
}

export default SimpleUserRoutes;
