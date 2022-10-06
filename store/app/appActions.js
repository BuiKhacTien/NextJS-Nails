
const pathCheckout = {
  CHECKOUT_LOGIN: "/form-checkout/address-default",
  CHECKOUT_NOT_LOGIN: "/checkout",
  PAYMENT: "/form-checkout/payment/card",
  ORDERS: "/my-account/your-order",
  CART: "/cart",
  HOME: "/",
};
export const nextStepCheckout = (stepCheckout) => {
  return (dispatch, getState) => {
    //const { stepCheckout } = getState().app;
    const { isLogin } = getState().user;
    return new Promise((resolve, _) => {
      if (isLogin) {
        if (stepCheckout === 0) {
          dispatch({ type: "app/nextStepCheckout", payload: 1 });
          resolve({ nextPath: pathCheckout.CHECKOUT_LOGIN });
        }
        if (stepCheckout === 1) {
          dispatch({ type: "app/nextStepCheckout", payload: 2 });
          resolve({ nextPath: pathCheckout.PAYMENT });
        }
        if (stepCheckout === 2) {
          dispatch({ type: "app/nextStepCheckout", payload: 0 });
          resolve({ nextPath: pathCheckout.ORDERS });
        }
      } else {
        if (stepCheckout === 0) {
          dispatch({ type: "app/nextStepCheckout", payload: 1 });
          resolve({ nextPath: pathCheckout.CHECKOUT_NOT_LOGIN });
        }
        if (stepCheckout === 1) {
          dispatch({ type: "app/nextStepCheckout", payload: 2 });
          resolve({ nextPath: pathCheckout.CART });
        }
        if (stepCheckout === 2) {
          dispatch({ type: "app/nextStepCheckout", payload: 3 });
          resolve({ nextPath: pathCheckout.PAYMENT });
        }
        if (stepCheckout === 3) {
          dispatch({ type: "app/nextStepCheckout", payload: 0 });
          resolve({ nextPath: pathCheckout.HOME });
        }
      }
    });
  };
};
