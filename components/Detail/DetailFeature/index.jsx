import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import StarsRate from "../../common/StarsRate";
import Discount from "../../common/CardHome/Discount";
import ButtonQtyCart from "../../common/ButtonQtyCart";
import ButtonAddCart from "../../common/ButtonAddCart";

import { BASE_IMG, formCart } from "../../../constants/appSetting";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { nextStepCheckout } from "../../../store/app/appActions";
import cartApi from "../../../api/cartApi";
import {
  FacebookShareButton,
  FacebookIcon,
} from 'next-share';

const DISCOUNT_IMG = require("../../../assets/images/discount.png");

const showDiscountPrice = (price, discountPrice, group_Sale_Price, isReach) => {
  if (group_Sale_Price && group_Sale_Price > 0) {
    const _savePrice = Number(price) - Number(group_Sale_Price);
    if (isReach)
      return {
        oldPrice: price,
        newPrice: group_Sale_Price,
        savePrice: _savePrice,
      };
    return { oldPrice: price, newPrice: "", savePrice: _savePrice };
  }
  if (Number(price) === Number(discountPrice))
    return { oldPrice: price, newPrice: "", savePrice: 0 };
  return { oldPrice: price, newPrice: discountPrice, savePrice: 0 };
};
const Index = ({ data = {}, onSelected }) => {
  const [action, setAction] = useState("");
  const [activeItem, setActiveItem] = React.useState({});
  const { cart } = useSelector((state) => state.cart);
  const { productCartModels } = cart;
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [featureId, setFeatureId] = useState(0);
  const router = useRouter();
  const slug = router.query;
  useEffect(() => {
    if (slug.slug) {
      setId(slug.slug[1]);
      setFeatureId(slug.slug[2]);
    }
  }, [slug]);
  const dataCart = { id: id, feature_Id: featureId };
  const {
    avg_Stars,
    fullName,
    description,
    productColorSize = [],
    slug_Name,
    group_Sale_Price,
    group_Sale_Qty,
    group_Sale_Solded,
    price,
    priceDiscount,
  } = data;
  const isReachDiscountGroupSale =
    Number(group_Sale_Qty) - Number(group_Sale_Solded) <= 0;
  const { oldPrice, newPrice, savePrice } = showDiscountPrice(
    price,
    priceDiscount,
    group_Sale_Price,
    isReachDiscountGroupSale
  );
  const { t } = useTranslation();
  React.useEffect(() => {
    if (featureId !== 0) {
      for (let i = 0; i < productColorSize.length; i++) {
        const active = productColorSize[i].colors.find(
          (item) => item.feature_Id == featureId
        );
        if (active) {
          onSelected(active);
          setActiveItem(active);
        }
      }
    }
  }, [productColorSize, featureId]);
  const onChange = (item) => {
    const { product_Id, feature_Id } = item;
    router.push(
      `/details/${slug_Name
        .replace("%", "")
        .replace("/", "")}/${product_Id}/${feature_Id}`,
      undefined,
      { shallow: true }
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buyNow = () => {
    let params = [];
    if (productCartModels) {
      const indexInCart = productCartModels.findIndex(
        (existingItem) =>
          existingItem.id === id && existingItem.feature_Id === featureId
      );
      if (indexInCart !== -1) {
        productCartModels[indexInCart].quantity =
          productCartModels[indexInCart].quantity + 1;
      } else {
        // qty revise to 1
        productCartModels.push({ ...data, quantity: 1 });
      }
      params = productCartModels.map((item) => formCart(item, cart.id));
      // add qty for item
    } else {
      params = [
        {
          cart_id: null,
          feature_id: featureId,
          product_id: id,
          quantity: 1,
        },
      ];
    }
    setAction("buy");
    cartApi
      .addCart(params)
      .then((res) => {
        if (res) {
          dispatch({ type: "cart/addCart", payload: res });
          dispatch(nextStepCheckout(0)).then(({ nextPath }) => {
            router.push(nextPath);
          });
          setAction("");
        }
      })
      .catch((e) => {
        productCartModels.pop();
        setAction("");
      });
  };

  return (
    <section className="detail-feature">
      <h1>{fullName}</h1>
      <div className="detail_feature_share_facebook">
        <FacebookShareButton
          url={`https://nailsbeautysupply.com${router ? router.asPath : ""}`}
          // quote={'next-share is a social share buttons for your next React apps.'}
          hashtag={'#nail #nailsupply #nailbeautysupply #beautysupply #lashessupply #acrylic #dippowder'}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <div className="detail_feature_share_facebook_title"> Share Facebook</div>
      </div>
      <div className="detail-feature__stars-review">
        <StarsRate name="detail_feature" rate={avg_Stars} />
        {/* <a className="detail-feature__stars-review__link" href="#">
               Review
            </a> */}
      </div>
      <div className="detail-feature__price">
        <p className={`detail-feature__price-old ${newPrice ? "through" : ""}`}>
          ${oldPrice}
        </p>
        {newPrice && (
          <p className="detail-feature__price-new">
            <img src={DISCOUNT_IMG.default.src} alt="discount" />${newPrice}
          </p>
        )}{" "}
      </div>
      {group_Sale_Price && (
        <div>
          <div className="card-home__price-discount">
            {Number(group_Sale_Qty - group_Sale_Solded) > 0 && (
              <p>Bought: {group_Sale_Solded}</p>
            )}
            {Number(group_Sale_Qty - group_Sale_Solded) <= 0 ? (
              <p>{t("This product is now quality for group sale discount")}</p>
            ) : (
              <p>
                {t("Need")} {group_Sale_Qty - group_Sale_Solded}{" "}
                {t("more quantities to")}
                {t("save")} ${savePrice}
              </p>
            )}
          </div>
          <Discount {...data} />
        </div>
      )}
      <div className="detail-feature__shipping">
        <i className="fas fa-truck-moving"></i>
        <span>{t("FREE Shipping over $99.99")}</span>
      </div>
      {activeItem.color && <span>Color: {activeItem.color} </span>}
      {productColorSize.map((v, i) => (
        <div key={i} className="detail-feature__color">
          <ul className="my-3">
            {v.colors.map((item, index) => {
              return (
                <li
                  onClick={() => onChange(item)}
                  key={index}
                  className={`detail-feature__color-item ${
                    featureId == item.feature_Id ? "active" : ""
                  }`}
                >
                  <img src={BASE_IMG + item.image} alt="color" />
                </li>
              );
            })}
          </ul>
          {v.size && (
            <div>
              <span>Size: </span>
              <span
                className={`detail-feature-item__size ${
                  v.colors.some((v) => featureId == v.feature_Id)
                    ? "active"
                    : ""
                }`}
              >
                {v.size}
              </span>
            </div>
          )}
        </div>
      ))}
      <div className="detail-feature__actions">
        <div className="detail_action_qty">
          <ButtonQtyCart data={dataCart} />
        </div>
        <div className="detail_action">
          <ButtonAddCart data={dataCart} className="w-100" variant="secondary">
            {t("Add To Cart")}
          </ButtonAddCart>
        </div>
        <div className="detail_action">
          <Button
            onClick={buyNow}
            className="w-100"
            variant="success"
            disabled={action === "buy"}
          >
            {action === "buy" && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span>{t("Buy Now")}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Index;
