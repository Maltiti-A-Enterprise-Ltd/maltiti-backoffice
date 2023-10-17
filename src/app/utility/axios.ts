import axios from 'axios';
import { store } from '@/app/redux/store';
import {
  clearTokens,
  refreshTokenUpdate,
} from '@/app/redux/features/authenticationSlice';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.interceptors.request.use(
  config => {
    if (!config.headers['Authorization']) {
      const token = store?.getState().authentication.token;
      config.headers['Authorization'] = `Bearer ${token?.access}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  response => response,

  async error => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refreshToken();
      prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  const token = store.getState().authentication.token;
  const refresh = token?.refresh;
  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/refresh-token/`,
      { refresh_token: refresh },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.refresh}`,
        },
      },
    );
    if (token) {
      token['access'] = response?.data?.access_token;
    }
    store.dispatch(refreshTokenUpdate(response.data.access_token));
    localStorage.setItem('token', JSON.stringify(token));
    return response.data.access_token;
  } catch (error) {
    localStorage.clear();
    store.dispatch(clearTokens());
    window.location.href = '/';
  }
};
