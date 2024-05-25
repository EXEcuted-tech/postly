import axios from 'axios';
import config from '../common/config';

const api = axios.create({
  baseURL: config.API,
});

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      
      console.log("Was here");
      if (refreshToken) {
        try {
          const response = await axios.post(`${config.API}/token`, { token: refreshToken });
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);

        } catch (err) {
          console.log('Refresh token is invalid', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          window.location.href = '/';
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
