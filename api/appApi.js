import axiosClient from "./axiosClient";

const appApi = {
   background: () => {
      const url = `api/Home/Slide`
      return axiosClient.get(url)
   },
   contactUs: () => {
      const url = `api/AboutUs/contactus`
      return axiosClient.get(url)
   },
   shippingReturn: () => {
      const url = `api/AboutUs/shippingreturns`
      return axiosClient.get(url)
   },
   company: () => {
      const url = `api/AboutUs/companyinfo`
      return axiosClient.get(url)
   },
   resource: () => {
      const url = `api/ResourceCenter`
      return axiosClient.get(url)
   },
   contact: () => {
      const url = `api/AboutUs/contactus`
      return axiosClient.get(url)
   },
   brands: () => {
      const url = `api/Product/listproductbrand`
      return axiosClient.get(url)
   },
   numWishList: () => {
      const url = `api/WishList/GetNumOfItems`
      return axiosClient.get(url)
   },
   sendMailInviteFriends: (params) => {
      const url = `/api/User/SendMailInviteFriends`
      return axiosClient.post(url, params)
   },
   footerComment: (params) => {
      const url = `api/Home/AddFooterComment`
      return axiosClient.post(url, params)
   }
};

export default appApi;
