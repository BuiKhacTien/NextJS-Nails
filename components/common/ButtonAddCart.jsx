import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '../../api/cartApi';
//

import { formCart } from '../../constants/appSetting';
import { getShippingFee } from '../../store/cart/actions';
//
//
import { useTranslation } from 'next-i18next'
const ButtonAddCart = ({ data = {}, className = "", variant = "danger" }) => {
  const { t } = useTranslation("translation")
  const dispatch = useDispatch();
  const { id, feature_Id, } = data;
  const [action, setAction] = useState("");
  const { cart, loading } = useSelector((state) => state.cart);
  const { productCartModels = [] } = cart;
  const paramsCart = () => {

    let indexInCart = -1;
    if ( productCartModels !== null) {
      indexInCart = productCartModels.findIndex(
        (existingItem) =>
          Number(existingItem.id) === Number(id) && Number(existingItem.feature_Id) === Number(feature_Id)
      );
    }
    if (indexInCart !== -1) {
      if(productCartModels[indexInCart].quantity > 0) {
        productCartModels[indexInCart].quantity =
        productCartModels[indexInCart].quantity;
      } else {
        productCartModels[indexInCart].quantity =
        productCartModels[indexInCart].quantity + 1;
      }
    } else {
      // qty revise to 1
      if ( productCartModels !== null) {
        productCartModels.push({ ...data, quantity: 1 });
      }
    }
      const params = productCartModels?.map((item) => formCart(item, cart.id));
      return params || [];
    // add qty for item
  }

  const addCart = () => {
    const params = paramsCart()
    setAction("add");
    cartApi
      .addCart(params)
      .then((res) => {
        if (res) {
          dispatch({ type: "cart/addCart", payload: res });
          dispatch({ type: "app/openCartMini", payload: true });
          if (!loading)
            dispatch(getShippingFee(res.id));
          setAction("");
        }
      })
      .catch((e) => {
        productCartModels.pop()
        setAction("")
      });
  };
  return (
    <Button
      className={className}
      onClick={addCart}
      variant={variant}
      disabled={action === "add"
      }
    >
      {action === "add" && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      <span>{t('Add To Cart')}</span>
    </Button >
  )
}

export default ButtonAddCart
