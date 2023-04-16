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


import Chat from "../../../Chat/Chat";
import NotFound from "../../common/NotFound";



const PostsForumList  = lazy(() => import("../postsForum/PostsForumList"));
const Split  = lazy(() => import("./Addposts/Split"));
const AddPost = lazy(() => import("./Addposts/AddPost"));
const Layout = lazy(() => import("./Layout"));
const LayoutSidebar = lazy(() => import("./LayoutSidebar"));
const Homepage = lazy(() => import("./homecomponent/Homepage"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const SimpleUserProfileEdit = lazy(() => import("./SimpleUserProfileEdit"));
const DiyGeneration = lazy(() => import("../Objectrelated/DiyGeneration"));

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
              <Route path="Addpost" element={<Split />} />
              <Route path="forum" element={<PostsForumList />} />
            </Route>
            <Route
              path="profile/update/:id"
              element={<SimpleUserProfileEdit />}
            />
            <Route path="profile" element={<ProfilePage />} />
         
            {/* <Route  path="/forum/posts/:id" element={<PostForumDetails />} /> */}
            <Route  path="chat" element={<Chat />} />
            <Route  path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default SimpleUserRoutes;
