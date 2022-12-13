import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ModalSuccess from "../../common/ModalSuccess";
import { useState } from "react";
import cartApi from "../../../api/cartApi";
import { showError, showSuccess } from "../../../utils/app";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import cardApi from "../../../api/cardApi";
import { showCard } from "../../../constants/constants";
import { CART_ID, ORDER_ID } from "../../../constants/appSetting";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

//

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//
const Index = () => {
  const { t } = useTranslation()
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const router = useRouter();
  const billingAddressLocal = localStorage.getItem("Billing_Address");
  useEffect(() => {
    if (isLogin) {
      getCards();
    }
  }, []);
  const getCards = () => {
    cardApi.all().then((res) => {
      if (res) {
        setCards(res);
      }
    });
  };
  const handleDate = (date) => {
    let rs = "";
    if (date.includes("/")) {
      rs = date.split("/");
      return { ExpirationMonth: rs[0], ExpirationYear: rs[1] };
    } else if (!date.includes("/") && date.length === 4) {
      rs = date.match(/.{1,2}/g);
      return { ExpirationMonth: rs[0], ExpirationYear: rs[1] };
    }
    return false;
  };

  const handleChangeCard = (nameKey, v) => {
    setCard({ ...card, [nameKey]: v });
  };
  const handleSelected = (v) => {
    setCard(v);
    setDate(v.expirationMonth + v.expirationYear);
    handleClose();
  };
  const handleOk = () => {
    router.push("/my-account/your-order");
  };
  const checkOutPayment = (e) => {
    e.preventDefault();
    let order_id = null;
    order_id = window.localStorage.getItem(ORDER_ID);
    let { cardNumber, nameOnCard } = card;
    if (cardNumber === "" || code === "" || nameOnCard === "" || date === "") {
      showError("Fields * do not be blank");
      return;
    }
    if (!handleDate(date))
      return showError("Date not correct, example: MM/YY (02/22)");
    const { ExpirationMonth, ExpirationYear } = handleDate(date);

    let param = {
      order_id: order_id,
      pin2fa: null,
      card: [
        {
          CardNumber: cardNumber,
          NameOnCard: nameOnCard,
          SecurityCode: code,
          ExpirationMonth,
          ExpirationYear,
          Comment: "",
        },
      ],
      billingAddress: {
        firstName: billingAddressLocal.firstName,
        lastName: billingAddressLocal.lastName,
        address: billingAddressLocal.address,
        zip: billingAddressLocal.zip,
        city: billingAddressLocal.city,
        state: billingAddressLocal.state,
        country: "blank",
      }
    };
    setLoading(true);
    cartApi
      .payment(param)
      .then((res) => {
        if (res) {
          dispatch({ type: "cart/paymentSuccess" });
          setShowModalSuccess(true);
          setLoading(false);
        }
      })
      .catch((e) => setLoading(false));
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <main className="bg-white">
      <div className="container__small">
        <h1 className="text-center py-3">{t('Payment Method')}</h1>
        <Button variant="success">{t('Credit/Debit Card')}</Button>
        <p>{t('All major cards accepted.')}</p>
        <div className="d-flex justify-content-between mb-4">
          <ul className="list-card">
            <li className="sprite card_icons amex"></li>
            <li className="sprite card_icons discover"></li>
            <li className="sprite card_icons visa"></li>
            <li className="sprite card_icons master"></li>
          </ul>
          {isLogin && (
            <Button
              onClick={handleShow}
              className="btn__show-cart"
              variant="link"
            >
              <i className="far fa-list-alt"></i>
            </Button>
          )}
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formCard">
            <Form.Control
              value={card.cardNumber}
              onChange={(e) => handleChangeCard("cardNumber", e.target.value)}
              placeholder={`${t("Card number")}*`}
            />
            {/* <Form.Text className="text-danger">
                     Card number is not empty
                  </Form.Text> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNameCard">
            <Form.Control
              value={card.nameOnCard}
              onChange={(e) => handleChangeCard("nameOnCard", e.target.value)}
              placeholder={`${t("Name on Card")}*`}
            />
            {/* <Form.Text className="text-danger">
                     We'll never share your email with anyone else.
                  </Form.Text> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateCard">
            <Form.Control
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="MM/YY*"
            />
            {/* <Form.Text className="text-danger">
                     We'll never share your email with anyone else.
                  </Form.Text> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCodeCard">
            <Form.Control
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`${t("Security code")}*`}
            />
            {/* <Form.Text className="text-danger">
                     We'll never share your email with anyone else.
                  </Form.Text> */}
          </Form.Group>
          <Button
            className="w-100 mb-4"
            type="submit"
            onClick={checkOutPayment}
            variant="secondary"
            disabled={loading}
          >
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span>{t('Confirm Payment')}</span>
          </Button>
        </Form>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <ul className="modal-cards">
              {cards.map((v, i) => {
                return (
                  <li
                    onClick={() => handleSelected(v)}
                    className="card__item"
                    key={i}
                  >
                    <span>{v.nameOnCard}</span>
                    <div>{showCard(v.viewCardNumber)}</div>
                  </li>
                );
              })}
            </ul>
          </Modal.Body>
        </Modal>
        <ModalSuccess
          ok={handleOk}
          show={showModalSuccess}
          setShow={setShowModalSuccess}
        />
      </div>
    </main>
  );
};

export default Index;
