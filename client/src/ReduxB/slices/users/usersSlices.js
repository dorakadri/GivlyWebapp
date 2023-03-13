import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";


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
//Block User
export const banUserAction = createAsyncThunk(
  "user/block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/ban-user/${id}`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//unBlock User
export const unbanUserAction = createAsyncThunk(
  "user/unblock",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/unban-user/${id}`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
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
    //Block user
    builder.addCase(banUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(banUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.block = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(banUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //unBlock user
    builder.addCase(unbanUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unbanUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unblock = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unbanUserAction.rejected, (state, action) => {
      console.log(action.payload);
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
