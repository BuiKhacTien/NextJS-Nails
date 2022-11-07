import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import SUCCESS from '../../../assets/images/success.png'

const Index = ({ ok, show = false, setShow }) => {
   const handleClose = () => setShow(false);
   const {t} = useTranslation();
   const handleShow = () => {
      setShow(true)
   };
   return (
      <Modal centered show={show} onHide={handleClose}>
         <Modal.Header className="modal__header__success" closeButton />
         <Modal.Body>
            <div className="modal__content-success">
               <img src={SUCCESS} alt="" />
               <h3>{t("Good Job")} !</h3>
               <p>{t('Your ordered successfully')}</p>
               <div>
                  <Button variant="primary" onClick={ok}>OK</Button>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   )
}

export default Index
