import { Button } from '@mui/material';
import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../../ReduxB/slices/users/usersSlices";
function AdminNavbar() {

  const navigate = useNavigate();
  
  //logout
  const dispatch = useDispatch();
 function handelLogout (){
    console.log("logout");
    dispatch(logoutAction());
    navigate("/");
 }
  return (
    <div>AdminNavbar
    <h1>admin</h1>
    <Button
    
    onClick={handelLogout}>logout</Button>
    </div>
  )
}

export default AdminNavbar