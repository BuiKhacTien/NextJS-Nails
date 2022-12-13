import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModalAddPayment from '../../Payment/ModalAddPayment'
import { showCard } from "../../../constants/constants";
import cardApi from '../../../api/cardApi'
import { showSuccess } from "../../../utils/app";
//
//
//
import { useTranslation } from 'next-i18next'
const ModalTips = ({ show = false, setShow }) => {
  const handleClose = () => setShow(false);
  const { t } = useTranslation("translation");
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Body>{"For security reasons, we don't store your full credit card details. If you need to change any information, please delete your saved card and add it as a new one."}</Modal.Body>
      <div className="text-center">
        <Button className="mb-3 btn-submit" variant="secondary" onClick={handleClose}>
          {t("OK")}
        </Button>
      </div>
    </Modal>
  )
}
const ItemCard = ({ item, onEdit, onDelete }) => {
  const { nameOnCard, cardNumber, id } = item
  const numShow = showCard(cardNumber)
  const { t } = useTranslation("translation");
  return (
    <li>
      <span>{nameOnCard}</span>
      <span>{numShow}</span>
      <div className="actions">
        <Button onClick={() => onEdit(item)} variant="link">{t('Edit')}</Button>
        <Button onClick={() => onDelete(id)} variant="link">{t('Delete')}</Button>
      </div>
    </li>
  )
}
const Index = () => {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [needUpdate, setNeedUpdate] = useState(true)
  const [cards, setCards] = useState([])
  const [edit, setEdit] = useState({})
  const { t } = useTranslation("translation")
  useEffect(() => {
    if (needUpdate) {
      getCards()

    }
  }, [needUpdate])
  const getCards = () => {
    cardApi.all().then(res => {
      if (res) {
        setCards(res)
        setNeedUpdate(false)
      }
    })
  }
  const handleDelete = (id) => {
    cardApi.delete(id).then(res => {
      if (res) {
        showSuccess("delete success address")
        setNeedUpdate(true)
      }
    })
  }
  const handleEdit = (item) => {
    setEdit(item)
    return setShowAdd(true)
  }
  const handleUpdate = () => {
    setNeedUpdate(true)
    setShowAdd(false)
    setEdit({})
  }
  const handleOpenAdd = (v) => {
    setEdit({})
    return setShow(v)
  }
  return (
    <div className="payment">
      <h2 className="account__title">{t("Payment")}</h2>
      <div className="box-content">
        <div className="box-info">
          <div onClick={() => handleOpenAdd(true)} className="info_alert cant_edit_payment">
            <div className="left-icon">
              <i className="fas fa-info-circle" />
            </div>
            <div className="right-text">
              <span className="text-info-alert">
               {t("Why can't I edit my payment method")}? 
              </span>
            </div>
          </div>
          <Button onClick={() => setShowAdd(true)} variant="secondary">+ {t("Add new payment method")}</Button>
          <div className="payment__list">
            <ul>
              {cards.map((v, i) => <ItemCard onEdit={handleEdit} onDelete={handleDelete} key={i} item={v} />)}
            </ul>
          </div>
        </div>
      </div>
      <ModalTips show={show} setShow={setShow} />
      <ModalAddPayment
        setEdit={setEdit}
        value={edit}
        open={showAdd}
        setOpen={handleOpenAdd}
        ok={handleUpdate} />
    </div>
  );
};

export default Index;
