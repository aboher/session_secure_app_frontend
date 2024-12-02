import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../constants/urlConstants";
import {
  CSRF_TOKEN_COOKIE_NAME,
  CSRF_TOKEN_HEADER_NAME,
} from "../constants/otherConstants";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get(CSRF_TOKEN_COOKIE_NAME);
    console.log("document.cookie: ", document.cookie);
    console.log("CSRF Token: ", csrfToken);
    if (csrfToken && ["post", "put", "patch", "delete"].includes(config.method)) {
      config.headers[CSRF_TOKEN_HEADER_NAME] = csrfToken;
      console.log("CSRF Token was added!")
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
