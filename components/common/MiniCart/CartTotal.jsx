import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../../api/cartApi";
import { CART_ID } from "../../../constants/appSetting";
import { getShippingFee } from "../../../store/cart/actions";
import productApi from "../../../api/productApi";
//
//
//
import { useTranslation } from 'next-i18next'
const CartTotal = ({ responsive = false }) => {
  const { t } = useTranslation("translation")
  const [currentTime, setCurrentTime] = React.useState(null);
  const { cart, loading, shippingFee } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { price=0, discount=0, total=0, totalCart=0 } = cart;
  const [reward, setReward] = useState(0);
  const [isUseReward, setIsUseReward] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.reward > 0 && cart.reward === 0) {
      const totalCartSum = Number(totalCart) + Number(shippingFee);
      const rewardInit = Math.min(user.reward, totalCartSum).toFixed(2);
      setReward(rewardInit);
      updateReward(cart.id, rewardInit);
      setIsUseReward(true);
    }
  }, [user.reward > 0, shippingFee]);
  // lay thong tin card hien tai
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID);
    if (cartId) getCart(cartId);
  }, []);
  // call api update reward khi nguoi dung nhap so luong reward
  const onChangeInputReward = (value) => {
    let newValue = 0;
    if (!value) return setReward(0);
    const totalCartSum = Number(totalCart) + Number(shippingFee);
    const maxOrder = Math.min(user.reward, totalCartSum).toFixed(2);
    if (Number(value) > maxOrder) {
      newValue = maxOrder;
    } else {
      newValue = value;
    }
    setReward(newValue);
    if (currentTime) clearTimeout(currentTime);
    const currentTimeout = setTimeout(() => {
      updateReward(cart.id, newValue);
    }, 500);
    isUseReward ? setCurrentTime(currentTimeout) : clearTimeout(currentTimeout);
  };
  const onChangeCheckbox = (e) => {
    const value = e.target.checked;
    if (value) {
      updateReward(cart.id, reward);
    } else {
      updateReward(cart.id, 0);
      setReward(0);
    }
    setIsUseReward(value);
  };
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
  const updateReward = (cartId, reward) => {
    productApi.redeemReward(cartId, reward).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="cart-total">
      <div
        className={`d-flex justify-content-between ${responsive ? "justify-content-md-end" : ""
          }`}
      >
        <p>{t('Starting Subtotal')}</p>
        <p>${price}</p>
      </div>

      <div
        className={`d-flex justify-content-between ${responsive ? "justify-content-md-end" : ""
          }`}
      >
        <p>{t('Discount')}</p>
        <p>${discount}</p>
      </div>
      <div
        className={`d-flex justify-content-between ${responsive ? "justify-content-md-end" : ""
          }`}
      >
        <p>{t('Subtotal')}</p>
        <p>${total}</p>
      </div>
      <div
        className={`d-flex justify-content-between ${responsive ? "justify-content-md-end" : ""
          }`}
      >
          <p>{t('Shipping Fee')}</p>
        <p>${shippingFee}</p>
      </div>
      <div
        className={`d-flex justify-content-between ${responsive ? "justify-content-md-end" : ""
          }`}
      >
        <p>{t('Estimated Tax:')}</p>
        <p>$0</p>
      </div>
      {user.reward > 0 && (
        <div>
          <InputGroup className="mb-3">
            <FormControl placeholder={t("Coupon Code")} />
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
            <InputGroup.Text>$0</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              type="number"
              onChange={(e) => onChangeInputReward(e.target.value)}
              name="reward"
              placeholder={t("Reward")}
              value={reward}
            />
            <InputGroup.Checkbox
              name="checkReward"
              onChange={onChangeCheckbox}
              aria-label="Checkbox for following text input"
              checked={isUseReward}
            />
            <InputGroup.Text
              onClick={() => onChangeInputReward(user.reward.toFixed(2))}
            >
              ${user.reward?.toFixed(2)}
            </InputGroup.Text>
          </InputGroup>
        </div>
      )}
      <div className="d-flex justify-content-between">
        <p></p>
        <div className="cart-mini__total mb-3">
          <span>{t('Total') }: </span>
          <span>
            ${(Number(totalCart) + Number(shippingFee) - reward).toFixed(2)||0}
          </span>
        </div>
      </div>
    </div>
  );
};
export default CartTotal;
