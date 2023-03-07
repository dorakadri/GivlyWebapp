import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../src/components/pages/Dashboard/Dashboard";
import LandingPage from "./components/pages/UserInterface/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
