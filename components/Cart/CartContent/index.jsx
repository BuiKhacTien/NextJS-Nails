import React from "react";
import CartItem from "./CartItem";
import BestSellers from "./BestSellers";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../../api/cartApi";
import { BASE_IMG, formCart } from "../../../constants/appSetting";
import { showSuccess } from "../../../utils/app";
import Slider from "react-slick";
import CardHome from "../../common/CardHome";
//
//
//

const Index = () => {
  const { t } = useTranslation();
  const { cart } = useSelector((state) => state.cart);
  const { productCartModels = [] } = cart;
  const { bestSellers } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const paramsCart = (item) => {
    const { id, feature_Id } = item;
    const indexInCart = productCartModels.findIndex(
      (existingItem) =>
        existingItem.id === id && existingItem.feature_Id === feature_Id
    );
    if (indexInCart !== -1) {
      productCartModels[indexInCart].quantity =
        productCartModels[indexInCart].quantity + 1;
    } else {
      // qty revise to 1
      productCartModels.push({ ...item, quantity: 1 });
    }
    const params = productCartModels.map((item) => formCart(item, cart.id));
    // add qty for item
    return params;
  };
  const updateCart = (item) => {
    const params = paramsCart(item);
    cartApi.addCart(params).then((res) => {
      if (res) {
        showSuccess(t("Update cart success"));
        dispatch({ type: "cart/addCart", payload: res });
      }
    });
  };
  const onDeleteCart = (item) => {};
  const flickityOptions = {
    initialIndex: 0,
    pageDots: false,
    autoPlay: true,
  };
  const NextArrow = ({ onClick }) => (
    <i onClick={onClick} className="arrow fas fa-chevron-right"></i>
  );
  const PrevArrow = ({ onClick }) => (
    <i onClick={onClick} className="arrow fas fa-chevron-left"></i>
  );
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoPlay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      <h3>{t("Shopping Cart")}</h3>
      <div className="cart__list">
        <div className="cart__price">{t("Price")}</div>
        <ul>
          {productCartModels &&
            productCartModels.map((item, i) => (
              <li key={i}>
                <CartItem
                  data={item}
                  onDelete={onDeleteCart}
                  onSave
                  setQty={updateCart}
                />
              </li>
            ))}
        </ul>
        <h4>{t("Best sellers")}</h4>
        <div className="new-products__block">
          <Slider {...settings}>
            {bestSellers.map((v, i) => (
              <div key={i+"bestsellers"} className="carousel-new-products__cell">
                <CardHome data={v} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Index;
