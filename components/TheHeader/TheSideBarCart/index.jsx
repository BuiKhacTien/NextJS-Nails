import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "react-bootstrap/Button";
import Drawer from "../../common/Drawer";
import MiniCart from "../../common/MiniCart";
import { ORDER_ID } from "../../../constants/appSetting";
//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//

const Index = () => {
  const router = useRouter()
  const {t} = useTranslation();
  const { openCartMini } = useSelector((state) => state.app);
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const setOpen = (v) => {
    dispatch({ type: "app/openCartMini", payload: v });
  };
  const handleRoutePay = () => {
    const orderId = localStorage.getItem(ORDER_ID);
    dispatch({ type: "app/openCartMini", payload: false });
    if (orderId) return router.push("/form-checkout/payment/card");
    if (isLogin) return router.push("/form-checkout/address-default");
    return router.push("/checkout");
  };
  return (
    <Drawer open={openCartMini} setOpen={setOpen} anchor="right">
      <MiniCart />
      <div>
        <Button
          onClick={handleRoutePay}
          variant="warning"
          className="btn__payNow"
        >
          {t('Pay Now')}
        </Button>
      </div>
    </Drawer>
  );
};

export default Index;
