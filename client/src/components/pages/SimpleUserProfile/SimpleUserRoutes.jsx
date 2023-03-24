import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../SimpleUserProfile/Navbar";
import ProfilePage from "../SimpleUserProfile/ProfilePage";
import SimpleUserProfileEdit from "../SimpleUserProfile/SimpleUserProfileEdit";
import Homepage from "./HomeComponents/Homepage";
import Layout from "./Layout";
import LayoutSidebar from "./HomeComponents/LayoutSidebar";

function SimpleUserRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
       
          <Route element={<LayoutSidebar />}>
          <Route path="/home" element={<Homepage />} />
          </Route>
          <Route
            path="profile/update/:id"
            element={<SimpleUserProfileEdit />}
          />
        </Route>
      </Routes>
    </div>
  );
}
export default SimpleUserRoutes;
