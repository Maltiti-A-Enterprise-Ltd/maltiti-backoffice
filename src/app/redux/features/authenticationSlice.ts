import {
  ITokens,
  IUserDetails,
} from '@/app/Interfaces/authenticationInterface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { axiosPrivate } from '@/app/utility/axios';
import { serverError, token, user } from '@/app/utility/constants';
import { toast } from 'react-toastify';

type authenticationState = {
  token: ITokens | undefined;
  user: IUserDetails | undefined;
  error: string;
  status: 'idle' | 'fulfilled' | 'pending';
};

const initialState: authenticationState = {
  token: token() || undefined,
  user: user() || undefined,
  error: '',
  status: 'idle',
};

export const login = createAsyncThunk(
  'login',
  async (credentials, { dispatch }) => {
    try {
      const response = await axios.post('/authentication/login', credentials);
      dispatch(updateUser(response.data.user));
      dispatch(
        updateToken({
          access: response.data.access_token,
          refresh: response.data.refresh_token,
        }),
      );
      window.location.href = '/dashboard';
    } catch (err: any) {
      dispatch(setError(err.response.data.message || serverError));
    }
  },
);

export const logout = createAsyncThunk('logout', async (_, { dispatch }) => {
  try {
    const response = await axiosPrivate.post(
      '/authentication/invalidate-token',
    );
    localStorage.clear();
    window.location.reload();
  } catch (err: any) {
    toast.error(err.response.data.error || serverError);
  }
});

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateToken: (state, action) => {
      state.token = {
        access: action.payload.access,
        refresh: action.payload.refresh,
      };
      localStorage.setItem('token', JSON.stringify(state.token));
    },
    refreshTokenUpdate: (state, action) => {
      console.log('Refresh token');
      if (state.token) state.token.access = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, state => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, state => {
        state.status = 'fulfilled';
      })
      .addCase(login.rejected, state => {
        state.status = 'idle';
      });
  },
});

export const { updateUser, setError, updateToken, refreshTokenUpdate } =
  authentication.actions;

export default authentication.reducer;
