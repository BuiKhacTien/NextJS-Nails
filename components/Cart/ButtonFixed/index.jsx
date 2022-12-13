import { Button } from "react-bootstrap";
import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ORDER_ID } from "../../../constants/appSetting";
import cartApi from "../../../api/cartApi";
//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//

const Index = () => {
  const {t} = useTranslation()
  const router = useRouter();
  const { cart } = useSelector((state) => state.cart);
  const { isLogin } = useSelector((state) => state.user);
  const handleCheckout = () => {
    const orderId = localStorage.getItem(ORDER_ID);
    const userIdNoAccount = localStorage.getItem("USER_NO_ACCOUNT")
    if (!isLogin && userIdNoAccount) {
      const params = { cart_id: cart.id, userIdNoAccount };
      cartApi.checkOut(params).then((res) => {
        if (res) {
          localStorage.setItem(ORDER_ID, res.orderId);
          return router.push("/form-checkout/payment/card")
        }
      })
    }
    if (orderId) return router.push("/form-checkout/payment/card");
    if (isLogin) return router.push("/form-checkout/address-default")
    return router.push("/checkout")
  };
  const { totalCart = 0 } = cart;
  return (
    <div className="button__fixed">
      <p className="total-price m-0">
        {t('Total')}: <span>${totalCart}</span>
      </p>
      <Button onClick={handleCheckout} variant="secondary">
        Proceed to secure checkout
      </Button>
    </div>
  );
};

export default Index;
