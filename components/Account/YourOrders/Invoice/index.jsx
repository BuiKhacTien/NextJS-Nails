import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cartApi from "../../../../api/cartApi";
import { showCard } from "../../../../constants/constants";
import OrderCardItem from "../../OrderCard/OrderCardItem";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { DATE_TIME_FORMAT } from "../../../../constants/appSetting";
const Index = () => {
  const { t } = useTranslation();
  const [cart, setCart] = React.useState({});
  const [payment, setPayment] = React.useState({});
  const [method, setMethod] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [orderAddress, setOrderAddress] = React.useState({});
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    if (id > 0) {
      getPayment(id);
      getPaymentMethod(id);
      getAddress(id);
      getItems(id);
    }
  }, [id]);
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
  const { orderTotal, orderDate, shippingFee } = payment;
  const { cardNumber } = method;
  const { name = "", address = "", city = "", zipCode = "" } = orderAddress;
  const showAddress = `${address} ${city ? `- ${city}` : ""} ${
    zipCode ? `- ${zipCode}` : ""
  }`;
  const card = showCard(cardNumber);

  const printDiv = (id) => {
    let specific_element = document.getElementById(id).innerHTML;
    let original_elements = document.body.innerHTML;

    document.body.innerHTML = specific_element;
    window.print();
    document.body.innerHTML = original_elements;
  };
  return (
    <div className="print-invoice">
      <span onClick={() => printDiv("invoice")} className="print-button">
        {t("Print this out")}!
      </span>
      <div id="invoice" className="order-print-review">
        <div className="content-view">
          <div className="logo" />
          <h4>
            {t("Details for Order")} #{id}
          </h4>
          <div className="title-print">
            <ul>
              <li>
                <p className="subtitle">
                  {t("Order Date")}:{" "}
                  <span>{moment(orderDate).format(DATE_TIME_FORMAT)}</span>
                </p>
                <p className="subtitle">
                  nailsbeautysupply.com {t("order number")}: <span>#{id}</span>
                </p>
                <p className="subtitle">
                  {t("Order Total")}: <span>${orderTotal}</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="content-print">
            <div className="box-ct">
              <p className="title-box">{t("Shipping now")}</p>
              <div
                className="ct ct1"
                style={{ borderBottom: "2px solid black" }}
              >
                {items &&
                  items.map((v) => (
                    <div key={v.id} className="list-product">
                      <div className="left-box">
                        <ul>
                          <li className="subtitle-item">
                            {t("Items Ordered")}
                          </li>
                          <li>
                            {t("Name")}: {v.itemName}
                          </li>
                          <li>
                            {t("Quantity")}: {v.qty}{" "}
                          </li>
                        </ul>
                      </div>
                      <div className="right-box">
                        <p>
                          {t("Price")}
                          <span>${v.subTotal}</span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="ct ct2">
                <div className="left-box">
                  <ul>
                    <li className="subtitle-item">{t("Shipping Address")}:</li>
                    <li>{name}</li>
                    <li>{showAddress} </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="box-ct">
              <p className="title-box">{t("Payment information")}</p>
              <div className="ct ct1">
                <div className="list-product">
                  <div className="left-box">
                    <ul>
                      <li className="subtitle-item">{t("Payment Method")}</li>
                      <li>Visa | {card}</li>
                    </ul>
                  </div>
                  <div className="right-box box-total">
                    <ul>
                      <li>
                        <p>
                          {t("Item(s) Subtotal")}: ${payment.subtotal}
                        </p>
                        <p>
                          {t("Shipping & Handling:")}: ${shippingFee}
                        </p>
                        <p>*******</p>
                        <p className="text-total">
                          {t("Grand Total:")} ${orderTotal}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center">
            {t("To view the status of your order, return to")}{" "}
            <Link href={`/order-details/${id}`}>{t("Order Summary")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
