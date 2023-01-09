import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CART_ID, ORDER_ID } from "../../constants/appSetting";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../api/cartApi";
import ModalSuccess from "../../components/common/ModalSuccess";
import dynamic from "next/dynamic";
const GoogleSurveyScript = dynamic(() => import("next/script"), { ssr: false });

function Index() {
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [surveyOption, setSurveyOption] = useState({
    order_id: 0,
    deliveryDate: "2025-12-30",
    email: "buikhactien@gmail.com",
  });

  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const handleClicks = () => {
    let orderID = 0;
    const cartID = localStorage.getItem("CART_ID")
    const params = {
      cart_id: cartID,
      userIdNoAccount: null,
    };
    cartApi
      .checkOut(params)
      .then((res) => {
        if (res) {
          localStorage.setItem(ORDER_ID, res.orderId);
          orderID = res.orderId;
        }
      })
      .then(() => {
        if (orderID > 0) {
          cartApi.paymentId(orderID).then((res) => {
            console.log("paymentId", res);
            if (res) {
              const date = new Date(res.orderDate);
              date.setDate(date.getDate() + 3);
              const formattedDate = date.toISOString().slice(0, 10);
              setSurveyOption({
                email: user.email,
                deliveryDate: formattedDate,
                order_id: orderID,
              });
            }
          });
        }
      });
    setShowModalSuccess(true);
  };
  console.log("test surveyOption", surveyOption)
  const handleOk = () => {
    router.push("/my-account/your-order");
  };

  return (
    <div>
      <h1 onClick={handleClicks} style={{ cursor: "pointer" }}>
        Test
      </h1>
      <ModalSuccess
        ok={handleOk}
        show={showModalSuccess}
        setShow={setShowModalSuccess}
        surveyOption={surveyOption}
      />
    </div>
  );
}

export default Index;
