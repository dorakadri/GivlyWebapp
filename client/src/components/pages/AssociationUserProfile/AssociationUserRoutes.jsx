import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../SimpleUserProfile/Navbar";
import ProfilePage from "../AssociationUserProfile/ProfilePage";
import AssociationUserProfileEdit from "../AssociationUserProfile/AssociationUserProfileEdit";
import Layout from "./Layout";

function AssociationUserRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="profile/update/:id"
            element={<AssociationUserProfileEdit />}
          />
        </Route>
      </Routes>
    </div>
  );
}
export default AssociationUserRoutes;
