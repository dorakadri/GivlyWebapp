import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/UserInterface/landingcomponent/LandingPage";
import Login from "./components/pages/Login";
import Dashboard from "../src/components/pages/Dashboard/Dashboard";
import Profilesimpleuser from "./components/pages/Navigation/Simpleuser/Profilesimpleuser";
import Register from "./components/pages/Register";
import { useSelector } from "react-redux";
import AdminNavbar from "./components/pages/Navigation/Admin/AdminNavbar";
import PrivateNavbar from "./components/pages/Navigation/Private/PrivateNavbar";
import LoginDesign from "./components/pages/UserInterface/LoginAndRegister/LoginDesign";
import RegisterDesign from "./components/pages/UserInterface/LoginAndRegister/RegisterDesign";
import Signup from "./components/pages/UserInterface/LoginAndRegister/Signup";

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
        <Route
          exact
          path="/profile"
          element={
            <SimpleUserElement Role={Role}>
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
      
              <PrivateNavbar />
            </AssoElement>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function SimpleUserElement({ children, Role }) {
  if (Role === "SimpleUser") {
    return <>{children}</>;
  }  return <Navigate to={"/"}/>;
}

function AdminElement({ children, Role }) {
  if (Role === "Admin") {
    return <>{children}</>;
  } else return <div> u dont have access to this page </div>;
}

function AssoElement({ children, Role }) {
  if (Role === "Association") {
    return <>{children}</>;
  } else return <div> u dont have access to this page </div>;
}
export default App;
