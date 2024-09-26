import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get("XSRF-TOKEN");
    if (csrfToken && ["post", "put", "delete"].includes(config.method)) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
