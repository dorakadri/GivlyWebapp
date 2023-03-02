import React, { useMemo } from 'react'
import { createTheme, CssBaseline,ThemeProvider} from '@mui/material'
import {themeSettings} from "./theme"
import {  useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route,  Routes } from 'react-router-dom'
import DashboardComponent from './PagesDashboard/DashboardComponent'
import Layout from './PagesDashboard/Layout'


function DashboardRoutes() {
    const mode= useSelector((state)=>state.dashboard.mode)
    const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
    return (
        <div className='index' >
       <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element ={<Navigate to="/dashboard" replace/>}/>
                <Route path='/dashboard' element ={<DashboardComponent/>}/>
            </Route>
          </Routes>
       
          </ThemeProvider>
          </BrowserRouter>
      </div>
  )
}


export default DashboardRoutes ;
