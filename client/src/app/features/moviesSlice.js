import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isError: '',
  isLoading: false,
  success: false,
};

export const fetchMoviesData = createAsyncThunk(
  'fetch/movies',
  async (_, ThunkApi) => {
    try {
      const { data } = await axios('/movies', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);
export const fetchSingleMovie = createAsyncThunk(
  'fetch/movies',
  async (id, ThunkApi) => {
    try {
      const { data } = await axios(`/movies/${id}`);

      return data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createMovie = createAsyncThunk(
  'add/movies',
  async (usr, ThunkApi) => {
    try {
      const { data } = await axios.post('/movies/create', usr, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'delete/movie',
  async (id, ThunkApi) => {
    try {
      const { data } = await axios.delete(`/movies/${id}`);

      return data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);
export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMoviesData.pending]: (state) => {
      state.isLoading = false;
    },
    [fetchMoviesData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
      state.isError = false;
      state.success = true;
    },
    [fetchMoviesData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.movies = [];
    },
    // [fetchSingleMovie.pending]: (state) => {
    //   state.isLoading = false;
    // },
    // [fetchSingleMovie.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.movies = action.payload;
    //   state.isError = false;
    //   state.success = true;
    // },
    // [fetchSingleMovie.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.payload;
    //   state.movies = [];
    // },
  },
});

export default moviesSlice.reducer;
