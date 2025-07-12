import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (page) => {
  console.log(page)
  const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], page: 1, totalPages: 2, loading: false },
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload.data];
        state.totalPages = action.payload.total_pages;
        state.page += 1;
        state.loading = false;
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;