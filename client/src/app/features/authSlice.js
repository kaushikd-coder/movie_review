import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// get the user from the local Storage;
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: '',
  isLoading: false,
  success: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, ThunkApi) => {
    try {
      const { data } = await axios.post('/auth/register', user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = false;
      state.success = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
