import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { showError, showSuccess } from "../../../utils/app";
import { useEffect } from "react";
import cardApi from "../../../api/cardApi";

//

//
//
const dtoParams = ({
  cardNumber,
  nameOnCard,
  ExpirationMonth,
  ExpirationYear,
  id = 0,
}) => {
  return {
    id,
    cardNumber,
    nameOnCard,
    expirationMonth: ExpirationMonth,
    expirationYear: ExpirationYear,
  };
};

const Index = ({ open = false, setOpen, ok, value = {}, setEdit }) => {
  const [date, setDate] = useState("");
  const [card, setCard] = useState(value);
  const { id = 0, expirationMonth, expirationYear } = value;
  const { t } = useTranslation();
  useEffect(() => {
    if (!expirationMonth || !expirationYear) return;
  }, [id]);
  useEffect(() => {
    setCard(value);
    if (!value.id) {
      setDate("");
    } else {
      const date = expirationMonth + expirationYear;
      setDate(date)
    }
  }, [value]);
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
  const updateCard = (e) => {
    e.preventDefault();
    let { cardNumber, nameOnCard } = card;
    if (cardNumber === "" || nameOnCard === "" || date === "") {
      showError("Fields * do not be blank");
      return;
    }
    if (!handleDate(date))
      return showError("Date not correct, example: MM/YY (02/22)");
    const { ExpirationMonth, ExpirationYear } = handleDate(date);
    const params = dtoParams({ ...card, ExpirationMonth, ExpirationYear });
    if (params.id === 0) {
      cardApi.add(params).then((res) => {
        if (res) {
          ok();
          showSuccess("Add card success");
        }
      });
    } else {
      cardApi.update(params).then((res) => {
        if (res) {
          ok();
          setEdit({});
          showSuccess("Update card success");
        }
      });
    }
  };
  const handleClose = () => setOpen(false);
  return (
    <Modal centered show={open} onHide={handleClose}>
      <div className="bg-white">
        <div className="container">
          <h1 className="text-center py-3">{t('Payment Method')}</h1>
          <p>{t("All major cards accepted.")}</p>
          <div className="d-flex justify-content-between mb-3">
            <ul className="list-card">
              <li className="sprite card_icons amex"></li>
              <li className="sprite card_icons discover"></li>
              <li className="sprite card_icons visa"></li>
              <li className="sprite card_icons master"></li>
            </ul>
          </div>

          <Form onSubmit={updateCard}>
            <Form.Group className="mb-3" controlId="formCard">
              <Form.Control
                required
                value={card.cardNumber}
                onChange={(e) => handleChangeCard("cardNumber", e.target.value)}
                placeholder={`${t("Card number")}*`}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNameCard">
              <Form.Control
                required
                value={card.nameOnCard}
                onChange={(e) => handleChangeCard("nameOnCard", e.target.value)}
                placeholder= {`${t("Name on Card")}*`}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDateCard">
              <Form.Control
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="MM/YY*"
              />
            </Form.Group>
            <Button
              size="lg"
              variant="secondary"
              className="w-100 mb-4"
              type="submit"
            >
              {t('Save & Continue')}
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
