import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landingpage from "./components/pages/Landingpage";
import Login from "./components/pages/Login";
import Profilesimpleuser from "./components/pages/Profilesimpleuser";
import Register from "./components/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profilesimpleuser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
