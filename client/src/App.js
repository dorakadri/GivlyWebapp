import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landingpage from "./components/pages/Landingpage";
import Login from "./components/pages/Login";

import Profilesimpleuser from "./components/pages/Navigation/Simpleuser/Profilesimpleuser";
import Register from "./components/pages/Register";
import {useSelector} from 'react-redux';
import AdminNavbar from "./components/pages/Navigation/Admin/AdminNavbar";
import PrivateNavbar from "./components/pages/Navigation/Private/PrivateNavbar";

function App() {
  const state = useSelector(state => state?.users)
  const {userAuth}=state;
const isAdmin = userAuth?.isAdmin;
const Role = userAuth?.role;



console.log("lala " + userAuth)
  return (
    <BrowserRouter>
 
      <Routes>
        {/* just badalt landing raja3ha / w loginn rodha login bch maysirch conflit   */}
        <Route exact path="/" element={<Landingpage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={ <SimpleUserElement Role={Role} ><Profilesimpleuser /></SimpleUserElement>} />
        <Route exact path="/admin" element={<AdminElement Role={Role} >   <AdminNavbar /> </AdminElement>} />
        <Route exact path="/association" element={<AssoElement Role={Role} > <PrivateNavbar/> </AssoElement>} />
      </Routes>
    </BrowserRouter>
  );
}


function SimpleUserElement( {children, Role}){
  
  if( Role ==="SimpleUser" ){
    return<>{children}</>
  }
  else  return <div> u dont have access to this page </div>
}

function AdminElement( {children, Role}){
 
  if(Role ==="Admin"){
    return<>{children}</>
  }
  else  return <div> u dont have access to this page  </div>
}

function AssoElement({children, Role}){
 
  if( Role ==="Association"){
    return<>{children}</>
  }
  else  return <div> u dont have access to this page </div>
}
export default App;
