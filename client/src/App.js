import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./components/pages/UserInterface/landingcomponent/LandingPage";

import Dashboard from "../src/components/pages/Dashboard/Dashboard";

import { useSelector } from "react-redux";
import LoginDesign from "./components/pages/UserInterface/LoginAndRegister/LoginDesign";
import Signup from "./components/pages/UserInterface/LoginAndRegister/Signup";
import { useEffect } from "react";
import SimpleUserProfile from "./components/pages/SimpleUserProfile/SimpleUserProfile";
import AssociationUserProfile from "./components/pages/AssociationUserProfile/AssociationUserProfile"
import AccountVerifed from "./components/pages/Navigation/Alerts/AccountVerifed";
import ResetPasswordForm from "./components/pages/UserInterface/Passwordmanagment/ResetPasswordForm";
import ResetPassword from "./components/pages/UserInterface/Passwordmanagment/ResetPassword";
import NotFound from "./components/common/NotFound";
function App() {
  const state = useSelector((state) => state?.users);
  const { userAuth } = state;
  const Role = userAuth?.role;

  
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="*" element={<NotFound/>} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/login" element={<LoginDesign />} />
        <Route
          exact
          path="/user/*"
          element={
            <SimpleUserElement Role={Role}>
              <SimpleUserProfile />
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
          path="/association/*"
          element={
            <AssoElement Role={Role}>
                <AssociationUserProfile />
            </AssoElement>
          }
        />
        <Route
          path="/verify-account/:token"
          element={userAuth ? <AccountVerifed /> : <Navigate to="/login" />}
        />
      
        <Route
          exact
          path="/password-reset-token"
          element={<ResetPasswordForm />}
        />
        <Route
          exact
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        {userAuth && (
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
        )}
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
