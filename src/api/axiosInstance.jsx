import axios from "axios";
import Cookies from "js-cookie";
import {
  BACKEND_URL,
  CSRF_TOKEN_COOKIE_NAME,
  CSRF_TOKEN_HEADER_NAME,
} from "../constants/constants";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get(CSRF_TOKEN_COOKIE_NAME);
    if (csrfToken && ["post", "put", "delete"].includes(config.method)) {
      config.headers[CSRF_TOKEN_HEADER_NAME] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
