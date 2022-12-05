import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  data: null,
  status: 'loading',
};

export const fetchUserAuth = createAsyncThunk('auth/fetchUserAuth', async (params) => {
  const res = await axios.post('/auth/login', params);
  return { ...res.data };
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const res = await axios.get('/auth/me');
  return { ...res.data };
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const res = await axios.post('/auth/signin', params);
  return { ...res.data };
});

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logout(state, action) {
      state.data = null;
      state.status = 'success';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchUserAuth.rejected, (state, action) => {
      state.status = 'error';
      state.data = null;
    });
    builder.addCase(fetchUserAuth.pending, (state, action) => {
      state.status = 'loading';
      state.data = null;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.status = 'error';
      state.data = null;
    });
    builder.addCase(fetchAuthMe.pending, (state, action) => {
      state.status = 'loading';
      state.data = null;
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = 'error';
      state.data = null;
    });
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.status = 'loading';
      state.data = null;
    });
  },
});

export const authDataSelector = (state) => state.auth.data;
export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
