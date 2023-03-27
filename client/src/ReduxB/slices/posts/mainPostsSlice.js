import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const addPostAction = createAsyncThunk(
  "posts/",
  async (post, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/posts/",
        post,
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

export const fetchPostsAction = createAsyncThunk(
  "posts/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(" http://localhost:5000/api/posts");
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const addtowishlistAction = createAsyncThunk(
  "posts/towishlist",
  async ({id, _id}, { rejectWithValue, getState, dispatch }) => {

    try {
   
      const { data } = await axios.post(
        `http://localhost:5000/api/posts/${id}/wishlist`,
        {_id},
      );
      console.log(data)
      return data;
   
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);

export const getpostbyid = createAsyncThunk(
  "getbyid",
  async (id, { rejectWithValue, getState, dispatch }) => {

    try {
   
      const { data } = await axios.get(
        `http://localhost:5000/api/posts/${id}`,
      );
      console.log(data)
      return data;
   
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);

const mainPostsSlice = createSlice({
  name: "mainpost",
  initialState: {},
  extraReducers: (builder) => {
    //fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postLists = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //addtowishlist
    builder.addCase(addtowishlistAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addtowishlistAction.fulfilled, (state, action) => {
      state.Towishlist = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addtowishlistAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //getpostbyid
    builder.addCase(getpostbyid.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getpostbyid.fulfilled, (state, action) => {
      state.onepost = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getpostbyid.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default mainPostsSlice.reducer;
