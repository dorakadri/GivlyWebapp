import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { userProfileAction } from '../../../ReduxB/slices/users/usersSlices'
import Navbar from './Navbar'
export default function Layout() {
    const store = useSelector((state) => state?.users) 
    console.log(store.userAuth._id)
    const dispatch = useDispatch()
  
    useEffect( () => {
    dispatch(userProfileAction(store.userAuth._id))
    },
    [store.userAuth._id,dispatch]
    )
  const { profile } = store 
  console.log(profile);
  return (
    <Box>
    <Box flexGrow={1}>
    <Navbar profileurl={profile?.profilePhoto}/>
    <Outlet/>
</Box>
</Box>
  )
}
