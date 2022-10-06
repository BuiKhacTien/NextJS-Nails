import cartApi from "../../api/cartApi";
const paramsCart = (cart, item) => {
  const { id, feature_Id } = item;
  if (cart.id) {
    const { productCartModels } = cart;
    const indexInCart = productCartModels.findIndex(
      (existingItem) =>
        existingItem.id === id && existingItem.feature_Id === feature_Id
    );
    if (indexInCart !== -1) {
      productCartModels[indexInCart] = item;
    } else {
      // qty revise to 1
      productCartModels.push({ ...item, quantity: 1 });
    }
    const params = productCartModels.map((item) => formCart(item, cart.id));
    // add qty for item
    return params;
  }
  return [formCart(item)];
};
export const formCart = (item, cart_id = null) => {
  const { feature_Id, id, quantity = 1 } = item;
  return {
    cart_id,
    feature_id: feature_Id,
    product_id: id,
    quantity,
  };
};
export const addToCart = (cart, item) => {
  const params = paramsCart(cart, item);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      cartApi
        .addCart(params)
        .then((res) => {
          if (res) {
            dispatch({ type: "cart/addCart", payload: res });
            dispatch({ type: "app/openCartMini", payload: true });
            dispatch(getShippingFee(res.id));
            resolve(res);
          }
        })
        .catch((e) => reject(e));
    });
  };
};
export const getShippingFee = (cartId) => (dispatch) => {
  dispatch({ type: "cart/loading", payload: true });
  return new Promise((resolve, _) => {
    cartApi.shippingFee(cartId).then((res) => {
      if (res) {
        dispatch({ type: "cart/shippingFee", payload: res.result });
        dispatch({ type: "cart/checkShipping", payload: false });
        dispatch({ type: "cart/loading", payload: false });
        resolve(res.result);
      }
    });
  });
};

