import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./components/pages/UserInterface/landingcomponent/LandingPage";

import Dashboard from "../src/components/pages/Dashboard/Dashboard";
import Profilesimpleuser from "./components/pages/Navigation/Simpleuser/Profilesimpleuser";

import { useSelector } from "react-redux";

import PrivateNavbar from "./components/pages/Navigation/Private/PrivateNavbar";
import LoginDesign from "./components/pages/UserInterface/LoginAndRegister/LoginDesign";

import Signup from "./components/pages/UserInterface/LoginAndRegister/Signup";
import { useEffect } from "react";
import ResetPasswordForm from "./components/pages/UserInterface/Passwordmanagment/ResetPasswordForm";
import ResetPassword from "./components/pages/UserInterface/Passwordmanagment/ResetPassword";

function App() {
  const state = useSelector((state) => state?.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  const Role = userAuth?.role;

  console.log("lala " + userAuth);
  return (
    <BrowserRouter>
      <Routes>
     
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/login" element={<LoginDesign />} />
        <Route exact path="/password-reset-token" element={<ResetPasswordForm />} />
        <Route exact path="/reset-password/:token" element={<ResetPassword/>} />
        {userAuth && <Route exact path="/reset-password/:token" element={<ResetPassword/>} />}
        <Route
          exact
          path="/profile"
          element={
            <SimpleUserElement Role={Role}>
                {/* hne biich tet7at the  profile page mte3 simple user */}
              <Profilesimpleuser />
            </SimpleUserElement>
          }
        />
        <Route
          exact
          path="/admin/*"
          element={
            <AdminElement Role={Role}>
       
              <Dashboard />
            </AdminElement>
          }
        />
        <Route
          exact
          path="/association"
          element={
            <AssoElement Role={Role}>
      {/* hne biich tet7at the Assotiation profile page */}
              <PrivateNavbar />
            </AssoElement>
          }
        />
       
      </Routes>
    </BrowserRouter>
  );
}

function SimpleUserElement({ children, Role }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (Role !== "SimpleUser") {
      navigate(-1);
    }
  }, [navigate, Role]);

  return Role === "SimpleUser" ? <>{children}</> : null;
}

function AdminElement({ children, Role }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (Role !== "Admin") {
      navigate(-1);
    }
  }, [navigate, Role]);

  return Role === "Admin" ? <>{children}</> : null;
}

function AssoElement({ children, Role }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (Role !== "Association") {
      navigate(-1);
    }
  }, [navigate, Role]);

  return Role === "Association" ? <>{children}</> : null;
}
export default App;
