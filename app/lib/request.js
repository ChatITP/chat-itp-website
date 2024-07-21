import axios from 'axios';

async function request(method, url, data) {
  let response;
  try {
    response = await axios({
      method,
      url,
      data,
      withCredentials: true,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error?.response?.status === 403) {
      let refreshTokenRes;
      try {
        refreshTokenRes = await refreshAccessToken();
      } catch (refreshError) {
        if (
          axios.isAxiosError(refreshError) &&
          (refreshError.response?.status === 401 || refreshError.response?.status === 403)
        ) {
          throw new Error('redirect to login');
        } else {
          throw refreshError;
        }
      }
      try {
        response = await axios({
          method,
          url,
          data,
          withCredentials: true,
        });
      } catch (retryError) {
        throw retryError;
      }
    } else if (axios.isAxiosError(error) && error?.response?.status === 401) {
      throw new Error('redirect to login');
    } else {
      throw error;
    }
  }
  return response;
}

async function refreshAccessToken() {
  return await axios.post('http://localhost:8000/api/user/refresh', null, {
    withCredentials: true,
  });
}

export default request;






