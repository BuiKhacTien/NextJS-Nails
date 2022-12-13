import moment from "moment";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cartApi from "../../../../api/cartApi";
import { DATE_TIME_FORMAT } from "../../../../constants/appSetting";
import { showCard } from "../../../../constants/constants";
import OrderCardItem from "../../OrderCard/OrderCardItem";
//
//
//

const Index = () => {
  const { t } = useTranslation();
  const [cart, setCart] = React.useState({});
  const [payment, setPayment] = React.useState({});
  const [method, setMethod] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [orderAddress, setOrderAddress] = React.useState({});
  const router = useRouter();
  const id = router.query.id;
  React.useEffect(() => {
    getPayment(id);
    getPaymentMethod(id);
    getAddress(id);
    getItems(id);
  }, []);
  const getPayment = (id) => {
    cartApi.paymentId(id).then((res) => {
      if (res) {
        setPayment(res);
      }
    });
  };
  const getPaymentMethod = (id) => {
    cartApi.paymentMethodId(id).then((res) => {
      if (res) {
        setMethod(res);
      }
    });
  };
  const getAddress = (id) => {
    cartApi.paymentAddress(id).then((res) => {
      if (res) {
        setOrderAddress(res);
      }
    });
  };
  const getItems = (id) => {
    cartApi.paymentItems(id).then((res) => {
      if (res) {
        setItems(res);
      }
    });
  };
  const {
    orderTotal,
    shippingFee,
    subtotal,
    estimatedTax,
    giftcardAmount,
    totalBeforeTax = 0,
    youSaved, orderDate,
  } = payment;
  const { cardNumber } = method;
  // const { name = "", address = "", city = "", zipCode = "" } = orderAddress;
  const { name = "", company = "", address = "", address2 = "", city, zipCode, country = ""} = orderAddress;
  const showAddress = `${company ? company : ""} ${address && address} ${address2 && address2} ${city && city + ","} ${country} ${ zipCode && " - " + zipCode}`
  const showCart = showCard(cardNumber);
  return (
    <div id="order-details" className="content box-order-details container">
      <div className="head-left">
        <div className="head-left1">
          <h4 className="title">{t("Order Details")}</h4>
        </div>
        <div className="head-left2">
          <div>
            <p className="text-head-left2">
              <span> {t("ORDER")}# {id}</span>
            </p>

            <strong className="subtitle">
              {t("Order Date")}:{" "}
              <span>{moment(orderDate).format(DATE_TIME_FORMAT)}</span>
            </strong>
          </div>
          <Link
            className="btn btn-secondary btn-head-l2"
            href={`/view-invoice/${id}`}
          >
           {t("View or print invoice")} 
          </Link>
        </div>
      </div>
      <div className="box-top">
        <div className="info-order-details row">
          <div className="shiping-address col-md-4">
            <p className="title-list">{t("Shipping Address")}</p>
            <ul>
              {<li>{name}</li>}
              {showAddress && <li>{showAddress}</li>}
              {company}
            </ul>
          </div>
          <div className="payment-method col-md-4">
            <p className="title-list">{t("Payment Method")}</p>
            <ul>
              <li>
                <span className="type-card">
                  <i className="fab fa-cc-visa" />
                </span>
                {showCart}
              </li>
            </ul>
          </div>
          <div className="order-summary col-md-4">
            <p className="title-list">{t('Order Summary')}</p>
            <ul>
              <li>
                <p className="subtitle-item">{t("Item(s) Subtotal")}:</p>
                <p className="content-item">${subtotal}</p>
              </li>
              <li>
                <p className="subtitle-item">{t("Shipping & Handling:")}:</p>
                <p className="content-item">${shippingFee}</p>
              </li>
              <li>
                <p className="subtitle-item">{t("Total before tax:")}:</p>
                <p className="content-item">${totalBeforeTax.toFixed(2)}</p>
              </li>
              <li>
                <p className="subtitle-item">{t("Estimated tax to be collected")}:</p>
                <p className="content-item">${estimatedTax}</p>
              </li>
              <li>
                <p className="subtitle-item">{t("You Saved")}:</p>
                <p className="content-item">${youSaved}</p>
              </li>
              <li>
                <p className="subtitle-item">{t("Gift Card Amount")}:</p>
                <p className="content-item">${giftcardAmount}</p>
              </li>
              <li className="total">
                <p className="subtitle-item">{t("Grand Total:")}</p>
                <p className="content-item">${Number(orderTotal).toFixed(2)}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="orders__card__body">
        {items && items.map((v) => <OrderCardItem key={v.id} {...v} />)}
      </div>
    </div>
  );
};

export default Index;
