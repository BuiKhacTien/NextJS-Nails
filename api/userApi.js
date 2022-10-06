import axiosClient from "./axiosClient";
import qs from "qs";
const userApi = {
  forgotPassword: (params) => {
    const url = `/api/User/ForgotPassword`;
    return axiosClient.post(url, params);
  },
  changePassword: (params) => {
    const url = `/api/User/ChangePassword`;
    return axiosClient.post(url, params);
  },
  login: (params) => {
    const url = "api/Login";
    return axiosClient.post(url, params);
  },
  loginSocial: (token) => {
    const url = "api/Login/LoginByFacebook";
    return axiosClient.post(url, JSON.stringify(token));
  },
  register: (params) => {
    const url = "api/SignUp";
    return axiosClient.post(url, params);
  },
  ordersHistory: (params) => {
    const query = qs.stringify(params, { skipNull: true });
    const url = `api/Order/OrdersHistory/?${query}`;
    return axiosClient.get(url);
  },
  info: () => {
    const url = `api/User`;
    return axiosClient.get(url);
  },
  update: (params) => {
    const url = `api/User/UpdateProfile`;
    return axiosClient.post(url, params);
  },
  twoFA: () => {
    const url = `api/TwoFA`;
    return axiosClient.get(url);
  },
  defaultShippingAddress: () => {
    const url = `api/User/GetDefaultShipAddress`;
    return axiosClient.get(url);
  },
  shippingAddress: () => {
    const url = `api/User/GetListShipAddress`;
    return axiosClient.get(url);
  },
  addAddress: (params) => {
    const url = `api/User/AddListShipAddress`;
    return axiosClient.post(url, params);
  },
  updateAddress: (params) => {
    const url = `api/User/UpdateListShipAddress`;
    return axiosClient.put(url, params);
  },
  defaultAddress: (id) => {
    const url = `api/User/ChangeDefaultShipAddress/${id}`;
    return axiosClient.put(url);
  },
  deleteAddress: (id) => {
    const url = `api/User/DeleteShipAddress/${id}`;
    return axiosClient.delete(url);
  },
  upAvatar: (files) => {
    const formData = new FormData();
    formData.append("files", files);
    const url = `api/User/UploadAvatar`;
    return axiosClient.post(url, formData);
  },
  updatePassword: (params) => {
    const url = `api/User/ChangePassword`;
    return axiosClient.post(url, params);
  },
  getRewardHistory: () => {
    const url = `api/User/getRewardHistory`;
    return axiosClient.get(url);
  },
};

export default userApi;
