import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:8000" });

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
