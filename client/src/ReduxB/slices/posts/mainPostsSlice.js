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
        const { data } = await axios.get(
         " http://localhost:5000/api/posts"
        );
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error);
      }
    }
  );

  const mainPostsSlice=createSlice({
    name:"mainpost",
    initialState: {},
    extraReducers: builder => {
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
  }

  })


  
export default mainPostsSlice.reducer;

