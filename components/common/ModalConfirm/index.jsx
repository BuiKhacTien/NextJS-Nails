import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const WARNING = require('../../../assets/images/warning.jpg')

const Index = ({ show, setShow, onSubmit, onClose, title = "Do you sure delete address?" }) => {

   const handleClose = () => {
      setShow(false)
      if (onClose) onClose()
   };
   const handleSubmit = () => {
      onSubmit(true)
      setShow(false)
   }
   return (
      <Modal
         centered
         show={show}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}
      >
         <Modal.Header closeButton />
         <Modal.Body>
            <div className="text-center">
               <div className="confirm__img">
                  <img src={WARNING.default.src} alt="warning" />
               </div>
               <h3>{title}</h3>
            </div>
            <div className="text-center">
               <Button className="mx-2" variant="light" onClick={handleClose}>
                  {"No, I don't want!"}
               </Button>
               <Button onClick={handleSubmit} className="mx-2" variant="danger">Yes, I want!</Button>
            </div>

         </Modal.Body>
      </Modal>
   )
}

export default Index
