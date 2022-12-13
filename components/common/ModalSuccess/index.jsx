import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
//

//
export async function getStaticProps({ locale }) {
   return {
     props: {
       ... (await serverSideTranslations(locale, ['translation'])),
     },
   }
 }
const SUCCESS = require('../../../assets/images/success.png')

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
               <img src={SUCCESS.default.src} alt="success" />
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
