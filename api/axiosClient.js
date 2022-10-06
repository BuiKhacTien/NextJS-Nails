import axios from "axios";
import Qs from "qs";
import { BASE_API } from "../constants/appSetting";
import { showError } from "../utils/app";
// import store from "../store";
const axiosClient = axios.create({
  baseURL: BASE_API,
  headers: {
    "content-type": "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
  paramsSerializer: (params) => Qs.stringify(params, { skipNulls: true }),
});
axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        localStorage.clear();
        //window.location.href = `${BASE_API}register-login/form1`
        window.location.reload();
      }
      if (error.response.data) {
        const { errors } = error.response.data;
        if (errors)
          for (const [key, value] of Object.entries(errors)) {
            showError(`${key}: ${value}`);
          }
      }
      if (error.response.data.message !== "Ambiguous column name 'weight'.") {
        showError(error.response.data.message);
      }
    } else if (error.request) {
      console.log("ERROR REQUEST", error.request);
    }
    console.log("ERROR JSON", error.toJSON());
    return Promise.reject(error.response);
  }
);

export default axiosClient;
