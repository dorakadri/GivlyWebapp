import styled from '@emotion/styled'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/system'
import React, { lazy, Suspense } from 'react'
import imagebg from './images/green3.jpg'
import NavbarLandingpage from './NavbarLandingpage'
import Spline from '@splinetool/react-spline';

const StyledBox = styled(Box)({
  height: '100vh',
  paddingInline:"4rem",
  scrollSnapType: 'y',
  scrollBehavior: 'smooth',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {display: "none"},
  color:'white',
  background: `url(${imagebg})`,
  backgroundSize: 'cover',
  willChange: 'transform', 
});

const Givlyapp = lazy(() => import('./Givlyapp'));
const Aboutus = lazy(() => import('./Aboutus'));
const Ourpartner = lazy(() => import('./Ourpartner'));
const Contactus = lazy(() => import('./Contactus'));

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <StyledBox>
     
    <NavbarLandingpage />
      <Givlyapp />
        <Aboutus />
        <Ourpartner />
        <Contactus />
   
    </StyledBox>
    </Suspense>
  )
}
