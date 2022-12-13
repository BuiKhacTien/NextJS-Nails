import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../OrderCard";
import CardHome from "../../common/CardHome";
import userApi from "../../../api/userApi";
import productApi from "../../../api/productApi";
//

//
//

const Item = (item) => {
  return (
    <li>
      <OrderCard {...item} />
    </li>
  );
};
const FlickityCell = (item) => {
  return (
    <div className="products__cell" style={{ marginRight: 20 }}>
      <CardHome data={item} />
    </div>
  );
};
const NextArrow = ({ onClick }) => (
  <i onClick={onClick} className="arrow fas fa-chevron-right"></i>
);
const PrevArrow = ({ onClick }) => (
  <i onClick={onClick} className="arrow fas fa-chevron-left"></i>
);

const Index = () => {
  const [orders, setOrders] = useState([]);
  const [days, setDays] = useState(30);
  const { latest } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 3,
    slidesToScroll: 1,
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
          centerMode: true,
        },
      },
    ],
  };
  useEffect(() => {
    const params = { daysAgo: days };
    getMyOrders(params);
  }, [days]);
  useEffect(() => {
    getLatest();
  }, []);
  const getMyOrders = (params) => {
    userApi.ordersHistory(params).then((res) => {
      if (res) {
        setOrders(res);
      }
    });
  };
  const getLatest = () => {
    if (latest.length > 0) return;
    productApi.latest().then((res) => {
      if (res) {
        dispatch({
          type: "product/setProducts",
          payload: { nameKey: "latest", res },
        });
      }
    });
  };
  return (
    <div className="your-orders-page">
      <h3 className="account__title">{t("Your Orders")}</h3>
      <div className="account-summary__title mb-3">
        <div className="mr-2">
          <b className="font-weight-bold">{orders?.length} {t("orders placed in")}</b>
        </div>
        <Form.Select
          style={{ width: "auto" }}
          value={days}
          onChange={(e) => setDays(e.target.value)}
          size="sm"
        >
          <option value={30}>{t("past 1 month")}</option>
          <option value={90}>{t("past 3 months")}</option>
          <option value={180}>{t("past 6 months")}</option>
          <option value="">{t("All")}</option>
        </Form.Select>
      </div>
      <div>
        <ul>
          {orders.map((v, i) => (
            <Item {...v} key={i} />
          ))}
        </ul>
      </div>
      <div className="new-products__block">
        <Slider {...settings}>
          {latest.map((v, i) => (
            <FlickityCell key={i} {...v} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Index;
