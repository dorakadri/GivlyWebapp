import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { verifyAccountAction } from '../../../../ReduxB/slices/accountVerification/accVerificationSlices';




export default function AccountVerifed() {

   // console.log(props);
const token = useParams();
    const dispatch = useDispatch();
    //verify account
    useEffect(() => {
        console.log(token.token)
      dispatch(verifyAccountAction(token.token));
    }, [dispatch, token]);



    //store
    const accountVerification = useSelector(state => state.accountVerification);
    const { loading, appErr, serverErr, isVerified, verified} =  accountVerification;
   
   
    const navigate = useNavigate();
  if (isVerified){
    setTimeout(()=>{
return navigate('/login');
    },300)

  }
  return (
    <div>
        

        {<h1>Account Verified successfully</h1>}
        
    <Link to="/profile">
     <Button variant="contained" color="primary">
        Go to Profile
      </Button>
    </Link>



    </div>
    
  );
}
