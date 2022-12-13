import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { BASE_IMG } from "../../../constants/appSetting";
import ButtonQtyCart from "../ButtonQtyCart";
//
//
//

const CartItem = ({ item, deleteItem, updateItem }) => {
  const {t} = useTranslation()
  const { mainImage, fullName, quantity } = item;
  const price = item.price ? item.price : 0;
  const priceDiscount = item.priceDiscount ? item.priceDiscount : 0;
  const group_Sale_Price = item.group_Sale_Price ? item.group_Sale_Price : 0;
  const handleQty = (v) => {
    const newQty = quantity <= 1 ? 1 : quantity + v;
    const newItem = { ...item, quantity: newQty };
    updateItem(newItem);
  };
  const handleDelete = () => {
    // console.log("cart item delete:", item);
    deleteItem(item);
  };
  const showPrice =
    group_Sale_Price > 0
      ? group_Sale_Price
      : priceDiscount > 0
      ? priceDiscount
      : price;
  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-4 text-center">
          <div>
            <img
              className="cart-mini__img"
              src={BASE_IMG + mainImage}
              alt="icon"
            />
          </div>
        </div>
        <div className="col-8">
          <p className="cart-item__text clip-2">{fullName}</p>
          <p className="cart-item__price">
            ${showPrice}
          </p>
          <div className="d-flex">
            <Button
              onClick={handleDelete}
              className="btn-cart__delete"
              variant="link"
            >
              {t('Delete')}
            </Button>
            <ButtonQtyCart data={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
