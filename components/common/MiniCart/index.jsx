import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import _, { update } from "lodash";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../../api/cartApi";
import { CART_ID } from "../../../constants/appSetting";
import { getShippingFee } from "../../../store/cart/actions";
import productApi from "../../../api/productApi";
import CartTotal from "./CartTotal";
//

//
//
import { useTranslation } from 'next-i18next'
const Index = ({ responsive = false, hideCoupon = true }) => {
  const { t } = useTranslation("translation")
  const [currentTime, setCurrentTime] = React.useState(null);
  const { cart, loading, shippingFee } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { isLogin } = useSelector((state) => state.user);
  const { productCartModels = [], price, total, totalCart, id } = cart;
  const [coupon, setCoupon] = useState("");
  const [reward, setReward] = useState("");
  const [isUseReward, setIsUseReward] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.reward > 0 && cart.reward === 0) {
      setReward(user.reward?.toFixed(2));
    }
  }, [user]);
  // lay thong tin card hien tai
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID);
    if (cartId) getCart(cartId);
  }, []);
  const getCart = (id) => {
    cartApi.id(id).then((res) => {
      if (res) {
        dispatch({ type: "cart/addCart", payload: res });
        if (res.reward > 0) {
          setIsUseReward(true);
          setReward(res.reward.toFixed(0));
        }
        if (!loading) dispatch(getShippingFee(id));
      }
    });
  };
  const form = (item) => {
    const cartId = localStorage.getItem(CART_ID) || cart.id;
    const { feature_Id, id, quantity } = item;
    return {
      cart_id: cartId,
      feature_id: feature_Id,
      product_id: id,
      quantity,
    };
  };
  const updateItem = (item) => {
    const index = productCartModels.findIndex(
      (existingItem) =>
        existingItem.id === item.id &&
        existingItem.feature_Id === item.feature_Id
    );
    productCartModels[index] = item;
    const params = productCartModels.map((v) => form(v));
    cartApi.addCart(params).then((res) => {
      dispatch({ type: "cart/addCart", payload: res });
      isUseReward && updateReward(res.id, reward);
      if (!loading) dispatch(getShippingFee(id));
    });
  };
  const deleteItem = (item) => {
    // console.log("index delete item", item);
    const params = form(item);
    // console.log("index params", params);
    cartApi.delete(params).then((res) => {
      dispatch({ type: "cart/addCart", payload: res });
      if (!loading) dispatch(getShippingFee(id));
    });
  };
  const updateReward = (cartId, reward) => {
    // console.log("CALL API");
    productApi.redeemReward(cartId, reward).then((res) => {
      console.log(res);
    });
  };
  const statusBar = totalCart > 99.99 ? 100 : totalCart;
  return (
    <div className="mini-cart">
      <div className="container">
        {Number(totalCart) < 100 ? (
          <p>
            {t('You need')} <strong>{(100 - Number(totalCart)).toFixed(2)}</strong> {t("to have earn free shipping")}
          </p>
        ) : (
          <p>{t('You have earn free shipping')}</p>
        )}
        <ProgressBar className="cart__progress" now={statusBar} />
        <h5 style={{ marginTop: 10}}>{t("Your cart")}</h5>
        <ul>
          {productCartModels &&
            productCartModels.map((v, i) => (
              <li key={i}>
                <CartItem
                  item={v}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                />
              </li>
            ))}
        </ul>
        <CartTotal />
      </div>
    </div>
  );
};
export default Index;
