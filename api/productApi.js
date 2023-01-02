import axiosClient from "./axiosClient";

const productApi = {
  listHome: () => {
    const url = `api/Product/listhomeproduct`;
    return axiosClient.get(url);
  },

  flashSale: () => {
    const url = `api/Product/flashsale?pageIndex=1&pageSize=2`;
    return axiosClient.get(url);
  },
  numWishList: () => {
    const url = `api/WishList/GetNumOfItems`;
    return axiosClient.get(url);
  },
  wishList: () => {
    const url = `api/WishList?pageIndex=1&pageSize=20`;
    return axiosClient.get(url);
  },
  lastOrdered: () => {
    const url = `api/Order/LastOrdered`;
    return axiosClient.get(url);
  },
  lastView: () => {
    const url = `api/ListView/lastview`;
    return axiosClient.get(url);
  },
  latest: () => {
    const url = `api/Product/latest?pageIndex=1&pageSize=3`;
    return axiosClient.get(url);
  },
  related: (id, size) => {
    const url = `api/Product/related?id=${id}&num_of_items=${size}`;
    return axiosClient.get(url);
  },
  featureVideo: () => {
    const url = `api/Product/featurevideo`;
    return axiosClient.get(url);
  },
  catalog: () => {
    const url = `api/Catalog`;
    return axiosClient.get(url);
  },
  catalogProduct: (alias) => {
    const url = `api/Catalog/${alias}/Product`;
    return axiosClient.get(url);
  },
  dealsCenterSiteMap: () => {
    const url = `api/DealsCenter`;
    return axiosClient.get(url);
  },
  dealsCenter: (alias = "") => {
    const url = alias ? `api/DealsCenter/${alias}/Product` : `api/DealsCenter`;
    return axiosClient.get(url);
  },
  bestSeller: () => {
    const url = `api/DealsCenter/Best-Seller/Product`;
    return axiosClient.get(url);
  },
  categories: (type, subType) => {
    const url = subType ? `api/${type}/${subType}/Product` : `api/${type}`;
    return axiosClient.get(url);
  },
  resourceCenter: () => {
    const url = `api/ResourceCenter`;
    return axiosClient.get(url);
  },
  catalogId: (slug) => {
    const url = `api/Catalog/${slug}/Product`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `api/Product/search`;
    return axiosClient.post(url, params);
  },
  info: (id, featureId = 0) => {
    if (!id) return;
    const url = `api/Product/${id}?feature_id=${featureId}`;
    return axiosClient.get(url);
  },
  productViewMore: (id) => {
    const url = `api/Product/${id}`;
    return axiosClient.get(url);
  },
  getComment: (id, featureId) => {
    if(featureId == 0) {
      const url = `api/Product/${id}/comments`;
      return axiosClient.get(url);
    } else {
      const url = `api/Product/${id}/comments?feature_id=${featureId}`;
      return axiosClient.get(url);
    }
  },
  addComment: (params) => {
    const url = `api/Product/comment`;
    return axiosClient.post(url, params);
  },
  commentTotal: (id) => {
    const url = `api/Product/${id}/commenttotal`;
    return axiosClient.get(url);
  },
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("files", file);
    const url = `api/Upload`;
    return axiosClient.post(url, formData);
  },
  allReviews: (id) => {
    const url = `api/Product/${id}/reviews`;
    return axiosClient.get(url);
  },
  addReview: (params) => {
    const url = `api/Product/review`;
    return axiosClient.post(url, params);
  },
  reviewTotal: (id) => {
    const url = `api/Product/${id}/reviewtotal`;
    return axiosClient.get(url);
  },
  like: (id, featureId) => {
    const feature = featureId ? `?feature_id=${featureId}` : "";
    const url = `/api/Product/${id}/Like${feature}`;
    return axiosClient.post(url);
  },
  viewed: (id, featureId) => {
    if (!id) return;
    const feature = featureId ? `?feature_id=${featureId}` : "";
    const url = `/api/Product/${id}/View${feature}`;
    return axiosClient.post(url);
  },
  shareSuccess: (id, featureId) => {
    const url = `api/Product/${id}/sharefb?feature_id=${featureId}&result=1`;
    return axiosClient.post(url);
  },
  shareError: (id, featureId) => {
    const url = `api/Product/${id}/sharefb?feature_id=${featureId}&result=2`;
    return axiosClient.post(url);
  },
  addWatching: (id, featureId) => {
    const url = `api/Product/${id}/AddWatching?feature_id=${featureId}`;
    return axiosClient.post(url);
  },
  removeWatching: (id, featureId) => {
    if (!id) return;
    const url = `api/Product/${id}/RemoveWatching?feature_id=${featureId}`;
    return axiosClient.post(url);
  },
  redeemReward: (cartId, reward) => {
    const url = `api/Cart/RedeemReward?cart_id=${cartId}&reward=${reward}`;
    return axiosClient.get(url);
  },
};
export default productApi;
