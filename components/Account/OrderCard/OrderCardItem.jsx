import React, { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router"
import Button from "react-bootstrap/Button";
import { BASE_IMG, formCart } from "../../../constants/appSetting";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../../api/cartApi";
//
//
//

const OrderCardItem = ({
  itemName = "",
  mainImage = "",
  price = 0,
  priceDiscount = 0,
  slug_name,
  itemId,
  feature_Id,
  qty,
  sizeName,
  colorName,
  orderId,
  ...props
}) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push(`/details/${slug_name.replace('%', '').replace("/", "").replace("+", "")}/${itemId}/${feature_Id}`);
  };
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const [action, setAction] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const { productCartModels = [] } = cart;
  const paramsCart = () => {
    const indexInCart = productCartModels.findIndex(
      (existingItem) =>
        existingItem.id === itemId && existingItem.feature_Id === feature_Id
    );
    if (indexInCart !== -1) {
      productCartModels[indexInCart].quantity =
        productCartModels[indexInCart].quantity + 1;
    } else {
      productCartModels.push({
        id: itemId,
        feature_Id: feature_Id,
        quantity: 1,
      });
    }
    const params = productCartModels.map((item) => formCart(item, cart.id));
    return params;
  };
  const addCart = () => {
    const params = paramsCart();
    setAction("add");
    cartApi
      .addCart(params)
      .then((res) => {
        if (res) {
          dispatch({ type: "cart/addCart", payload: res });
          dispatch({ type: "app/openCartMini", payload: true });
          dispatch({ type: "cart/checkShipping", payload: true });
          setAction("");
        }
      })
      .catch((e) => setAction(""));
  };

  return (
    <div className="orders__card__grid">
      <div className="card_item_1">
        <div className="box-media">
          <img className="w-100" src={`${BASE_IMG}${mainImage}`} alt="" />
        </div>
      </div>
      <div className="card_item_2">
        <div className="orders__card__content">
          <Link href={`/details/${slug_name.replace('%', '').replace("/", "").replace("+", "")}/${itemId}/${feature_Id}`}>
            <p className="orders__card__name">
              {itemName}
              {sizeName && ` - ${sizeName}`}
              {colorName && `- ${colorName}`}
            </p>
          </Link>
          <p>{t('Quantity')}: {qty}</p>
          <div className="orders__card__price">
            <p className="price-now">
              ${priceDiscount && priceDiscount > 0 ? priceDiscount : price}
            </p>
          </div>
          <div className="box-byagain">
            <Button
              onClick={addCart}
              variant="warning"
              className="buy__again mr-2"
            >
              <i className="fas fa-sync"></i>
              <span> {t('Buy it again')}</span>
            </Button>
            <Button onClick={handleRoute} className="border" variant="light">
              {t('View your item')}
            </Button>
          </div>
        </div>
      </div>
      <div className="card_item_3">
        <Button
          onClick={() => router.push(`/track-order/${orderId}`)}
          className="border mb-3 w-100"
          variant="light"
        >
          {t('Track package')}
        </Button>
        <Button onClick={handleRoute} className="border w-100" variant="light">
          {t('Write a product review')}
        </Button>
      </div>
    </div>
  );
};

export default OrderCardItem;
