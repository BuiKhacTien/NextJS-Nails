import React from 'react'
import DropZone from 'react-drop-zone';
import { Modal, Button } from 'react-bootstrap'

const Index = ({ open, setOpen, value, onChange, ok, loading }) => {
   const handleClose = () => setOpen(false);
   const checkOver = (over, overDocument) => {
      return over ? (
         <p>file is over element</p>
      ) : overDocument ? (
         <p>file is over document</p>
      ) : (
         <p style={{ fontSize: '16px', fontWeight: 700 }}>+Upload photos</p>
      )
   }
   return (
      <Modal show={open} onHide={handleClose}>
         <Modal.Body>
            <DropZone onDrop={(file, text) => onChange(file)}>
               {({ over, overDocument }) => (
                  <div className="avatar__drop-zone">
                     {checkOver(over, overDocument)}
                     {value ? <img src={URL.createObjectURL(value)} alt="avatar" className="avatar-modal" /> : ''}
                  </div>
               )}
            </DropZone>
            <div className="avatar__actions">
               <Button onClick={handleClose} variant="warning">Hủy</Button>
               <Button disabled={loading} onClick={ok} variant="secondary">Đặt làm ảnh đại diện</Button>
            </div>
         </Modal.Body>
      </Modal>
   )
}

export default Index
