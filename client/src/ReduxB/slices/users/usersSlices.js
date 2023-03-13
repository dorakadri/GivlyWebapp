import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";


const resetPasswordAction = createAction("password/reset");

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
  

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        userData,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//logout action 

export const logoutAction = createAsyncThunk(
  '/user/logout',
  async (payload,{rejectWithValue,getState,dispatch})=>{
    try{
      localStorage.removeItem("userInfo");
      
    }catch(error){
      if(!error?.response){
        throw error;
      }
      return rejectWithValue(error?.response?.data);

    }
  }
)

export const passwordResetTokenAction = createAsyncThunk(
  "password/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/forget-password-token`,
        { email },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const passwordResetAction = createAsyncThunk(
  "password/reset",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
 
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/reset-password`,
        { password: user?.password, token: user?.token },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local storge
const userLoginFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem("userInfo"))
: null;


const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth :userLoginFromStorage
   
  },

  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login slice
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {

      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    //PAssword Reset Token 
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordToken = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Password reset
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

        //logout
        builder.addCase(logoutAction.pending, (state, action) => {
          state.loading = false;
          console.log(state);
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
          console.log(state);
          state.userAuth = undefined;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
          console.log(state);
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
          state.loading = false;
          console.log(state);
        });
      },
    });
    

export default usersSlices.reducer;
