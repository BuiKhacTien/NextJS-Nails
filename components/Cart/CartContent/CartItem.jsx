import React, { useState, useEffect } from "react";
import { BASE_IMG } from "../../../constants/appSetting";
import ButtonQtyCart from "../../common/ButtonQtyCart";
import ButtonDeleteCart from "../../common/ButtonDeleteCart";
import Button from "react-bootstrap/Button";
import { showSuccess } from "../../../utils/app";
import { useRouter } from "next/router";
//

import cartApi from "../../../api/cartApi";
//
//

const CartItem = ({ data = {} }) => {
  const {
    fullName,
    mainImage,
    id,
    feature_Id,
    priceDiscount = 0,
    price = 0,
    group_Sale_Price = 0,
    slug_Name,
  } = data;
  const {t}  = useTranslation()
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const addWishList = () => {
    setLoading(true);
    cartApi
      .addWishList(id, feature_Id)
      .then((res) => {
        showSuccess(t("Add wish list success"));
        setLoading(false);
      })
      .catch((e) => {
        if (e.status && e.status === "NOT_LOGIN") {
          router.push("/login-register");
        }
        setLoading(false);
      });
  };
  const showPrice = group_Sale_Price > 0 ? group_Sale_Price : priceDiscount > 0 ? priceDiscount : price;

  return (
    <div className="cart-item">
      <div className="row">
        <div className="col-3 align-self-center">
          <img
            onClick={() =>
              router.push(`/details/${slug_Name.replace('%', '').replace("/", "").replace("+", "")}/${id}/${feature_Id}`)
            }
            className="cart-item__img"
            src={BASE_IMG + mainImage}
            alt="cart-item"
          />
        </div>
        <div className="col-7">
          <p
            onClick={() =>
              router.push(`/details/${slug_Name.replace('%', '').replace("/", "").replace("+", "")}/${id}/${feature_Id}`)
            }
            className="cart-item__title"
          >
            {fullName}
          </p>
          <div className="cart-item__actions">
            <ButtonQtyCart data={data} />
            <div className="d0">
              <ButtonDeleteCart data={data} />
              <Button disabled={loading} variant="link" onClick={addWishList}>
                Save your later
              </Button>
            </div>
          </div>
        </div>
        <div className="col-2 cart-item__price">${showPrice}</div>
      </div>
    </div>
  );
};

export default CartItem;
