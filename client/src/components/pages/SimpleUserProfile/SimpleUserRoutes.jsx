import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";


const ProfilePage = lazy(() => import("../SimpleUserProfile/ProfilePage"));
const SimpleUserProfileEdit = lazy(() => import("../SimpleUserProfile/SimpleUserProfileEdit"));
const Homepage = lazy(() => import("./HomeComponents/Homepage"));
const Layout = lazy(() => import("./Layout"));
const LayoutSidebar = lazy(() => import("./HomeComponents/LayoutSidebar"));
const DiyGeneration = lazy(() => import("./ObjectRelated/DiyGeneration"));
const AddPost = lazy(() => import("./Addposts/AddPost"));

function SimpleUserRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<LayoutSidebar />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/diygeneration" element={<DiyGeneration />} />
          </Route>
          <Route path="profile/update/:id" element={<SimpleUserProfileEdit />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="Addpost" element={<AddPost/>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default SimpleUserRoutes;
