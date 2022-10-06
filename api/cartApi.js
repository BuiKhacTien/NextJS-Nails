import axiosClient from "./axiosClient";

const cartApi = {
  addCart: (params) => {
    const url = `api/Cart`;
    return axiosClient.post(url, params);
  },
  id: (id) => {
    const url = `api/Cart?cart_id=${id}`;
    return axiosClient.get(url);
  },
  delete: (data) => {
    const url = `api/Cart`;
    return axiosClient.delete(url, { data });
  },
  shippingFee: (id) => {
    const url = `api/Cart/GetShippingFee?cart_id=${id}`;
    return axiosClient.get(url);
  },
  payment: (params) => {
    const url = `api/Order/Payment`;
    return axiosClient.post(url, params);
  },
  paymentMethodId: (id) => {
    const url = `api/Order/${id}/OrderPayment`;
    return axiosClient.get(url);
  },
  paymentAddress: (id) => {
   const url = `api/Order/${id}/OrderInfo`;
   return axiosClient.get(url);
 },
 paymentItems: (id) => {
   const url = `api/Order/${id}/OrderItems`;
   return axiosClient.get(url);
 },
  paymentId: (id) => {
    const url = `api/Order/${id}`;
    return axiosClient.get(url);
  },
  addWishList: (idProduct, feature_id) => {
    const url = `api/WishList/${idProduct}?feature_id=${feature_id}`;
    return axiosClient.post(url);
  },
  checkOut: (params) => {
    const url = `api/Cart/CheckOut`;
    return axiosClient.post(url, params);
  },
  checkOutNotLogin: (params) => {
    const url = `/api/Cart/CheckOutNotLogin`;
    return axiosClient.post(url, params);
  },
};

export default cartApi;
