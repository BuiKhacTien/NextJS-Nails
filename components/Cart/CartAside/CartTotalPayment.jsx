import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {  ORDER_ID } from "../../../constants/appSetting";
import cartApi from "../../../api/cartApi";
import CartTotal from "../../common/MiniCart/CartTotal";
import { useTranslation } from "react-i18next";
const CartTotalPayment = () => {
  const {t}= useTranslation()
  const { cart } = useSelector((state) => state.cart);
  const { isLogin } = useSelector((state) => state.user);
  const { isMobile } = useSelector((state) => state.app);
  const router = useRouter();
  const handleRoute = () => {
    const orderId = localStorage.getItem(ORDER_ID);
    const userIdNoAccount = localStorage.getItem("USER_NO_ACCOUNT");
    if (!isLogin && userIdNoAccount) {
      const params = { cart_id: cart.id, userIdNoAccount };
      cartApi.checkOut(params).then((res) => {
        if (res) {
          localStorage.setItem(ORDER_ID, res.orderId);
          return router.push("/form-checkout/payment/card");
        }
      });
    }
    // if (orderId) {
    //   console.log("2");
    //   return router.push("/form-checkout/payment/card");
    // }
    if (isLogin) return router.push("/form-checkout/address-default");
    return router.push("/checkout");
  };
  return (
    <div className="cart-total-payment">
      <CartTotal />
      {!isMobile && (
        <Button onClick={handleRoute} variant="warning">
          {t('Proceed to checkout')}
        </Button>
      )}
    </div>
  );
};

export default CartTotalPayment;
