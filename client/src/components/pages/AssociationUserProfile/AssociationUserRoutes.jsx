import React from "react";
import { Route, Routes } from "react-router-dom";

import ProfilePage from "../AssociationUserProfile/ProfilePage";
import AssociationUserProfileEdit from "../AssociationUserProfile/AssociationUserProfileEdit";
import Layout from "./Layout";
import PostsForumList from "../postsForum/PostsForumList";
import PostForumDetails from "../postsForum/PostForumDetails";
import CreatePostForum from "../postsForum/CreatePostForum";
import UpdatePostForum from "../postsForum/UpdatePostForum";
import Chat from "../../../Chat/Chat";
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
          <Route path="/forum" element={<PostsForumList />} />
          <Route exact path="/posts/:id" element={<PostForumDetails />} /> 
          <Route exact path="/createpost" element={<CreatePostForum />} />
          <Route
            exact
            path="/update-post/:id"
            element={
            
                <UpdatePostForum />
                
          
            }
          />
          
          <Route
            exact
            path="/chat"
            element={
             
                <Chat />
       
            }
          />
      
        </Route>
      </Routes>
    </div>
  );
}
export default AssociationUserRoutes;
