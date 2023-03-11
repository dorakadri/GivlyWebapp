import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../src/components/pages/Dashboard/Dashboard";
import LandingPage from "./components/pages/UserInterface/landingcomponent/LandingPage";
import Login from "./components/pages/UserInterface/LoginAndRegister/Login";
import Register from "./components/pages/UserInterface/LoginAndRegister/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
