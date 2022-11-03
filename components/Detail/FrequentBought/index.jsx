import React from "react";
import Link from "next/link";
import Flickity from "react-flickity-component";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import FrequentCard from "./FrequentCard";
import { BASE_IMG } from "../../../constants/appSetting";
import cartApi from "../../../api/cartApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const totalPrice = (selected = []) => {
  if (!selected || selected.length === 0) return 0;
  let total = 0;
  for (let i = 0; i < selected.length; i++) {
    total = total + selected[i].priceDiscount;
  }
  return total;
};
const createParams = (models = [], cartId = null) => {
  return models.map((item) => ({
    cart_id: cartId,
    feature_id: item.feature_Id,
    product_id: item.id,
    quantity: item.quantity,
  }));
};
const createFrequentlyItem = (item) => {
  return {
    id: item.id,
    feature_Id: item.feature_Id,
    name: item.fullName,
    mainImage: item.mainImage,
    priceDiscount: item.priceDiscount,
  };
};
const Index = ({ data = {} }) => {
  const router = useRouter()
  const { t } = useTranslation();
  const [productFrequent, setProductFrequent] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (data.id) {
      const { productFrequent } = data;
      init(productFrequent);
    }
  }, [data.id]);
  const init = (productFrequent) => {
    if (productFrequent.length > 0) {
      const frequentItem = createFrequentlyItem(data);
      productFrequent.unshift(frequentItem);
      setProductFrequent(productFrequent);
      onSelected(false, frequentItem);
    }
  };
  const onSelected = (checked, v) => {
    if (checked) {
      const result = selected.filter(
        (item) => item.id !== v.id || item.feature_Id !== v.feature_Id
      );
      setSelected(result);
    } else {
      const result = [...selected, v];
      setSelected(result);
    }
  };
  const isChecked = (v) => {
    const index = selected.findIndex(
      (item) => item.id === v.id && item.feature_Id === v.feature_Id
    );
    return index !== -1;
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
  };
  const flickityOptions = {
    // initialIndex: 1,
    pageDots: false,
    groupCells: true,
  };
  const itemsExpanded = (items) => {
    if (expanded) {
      return items;
    }
    return items.slice(0, 3);
  };
  const num = selected.length;
  const items = itemsExpanded(productFrequent);
  const total = totalPrice(selected);
  const addToCart = () => {
    const { productCartModels = [] } = cart;
    const newModels = updateModels(productCartModels, selected);
    const params = createParams(newModels, cart.id);
    cartApi.addCart(params).then((res) => {
      if (res) {
        dispatch({ type: "cart/addCart", payload: res });
        dispatch({ type: "app/openCartMini", payload: true });
      }
    });
  };
  const updateModels = (productCartModels, selected) => {
    const newCarts = [...productCartModels];
    if (!selected.length > 0) return;
    const initSelected = selected.map((item) => ({ ...item, quantity: 1 }));
    if (productCartModels.length === 0) return initSelected;
    if (productCartModels && productCartModels.length > 0) {
      for (let j = 0; j < initSelected.length; j++) {
        const indexInCart = productCartModels.findIndex(
          (v) =>
            v.id === initSelected[j].id &&
            v.feature_Id === initSelected[j].feature_Id
        );
        if (indexInCart >= 0) {
          const newItem = handleQtyItem(productCartModels[indexInCart]);
          newCarts[indexInCart] = newItem;
        } else {
          newCarts.push(initSelected[j]);
        }
      }
    }
    // new list models cart
    return newCarts;
  };
  const handleQtyItem = (item) => {
    return { ...item, quantity: item.quantity + 1 };
  };
  const handleClickProductPrequent = (v) => {
    if (v.slug_Name) {
      router.push(`/details/${v.slug_Name.replace('%', '').replace("/", "")}/${v.id}/${v.feature_Id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const slug_Name = v.name.trim().toLowerCase().replace(/ /g, '-')
      router.push(`/details/${slug_Name.replace('%', '').replace("/", "")}/${v.id}/${v.feature_Id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  return (
    <div className="frequent-bought">
      <Flickity
        className={"carousel-frequent"} // default ''
        elementType={"div"} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {productFrequent.map((v, i) => {
          return (
              <div key={i} className="carousel-frequent__cell" onClick={() => handleClickProductPrequent(v)}>
                <img src={BASE_IMG + v.mainImage} alt="no-image" />
              </div>
          );
        })}
      </Flickity>
      <ListGroup>
        {/* <ListGroup.Item><FrequentCard  checked={isChecked(v)} change={onSelected} item={v} /></ListGroup.Item> */}
        {items.map((v, i) => {
          const checked = isChecked(v);
          return (
            <ListGroup.Item key={i}>
              <FrequentCard
                index={i}
                checked={checked}
                change={onSelected}
                item={v}
              />
            </ListGroup.Item>
          );
        })}
        <ListGroup.Item>
          <div onClick={handleExpanded} className="frequent__item-bottom">
            <i className={`fas fa-angle-${expanded ? "up" : "down"}`}></i>
            <span>{t("Some of these items ship sooner than the others")}</span>
          </div>
        </ListGroup.Item>
      </ListGroup>
      <div className="frequent__price">
        <div>
          <span>{t("Total price")}: </span>
          <span>${total.toFixed(2) || 0}</span>
        </div>
        <Button onClick={addToCart} variant="danger">
          {t("Add all")} {num} {t("to cart")}
        </Button>
      </div>
    </div>
  );
};

export default Index;
