import React from 'react'
import Modal from 'react-bootstrap/Modal'
const ModalSuccess = ({ show, setShow }) => {
    const onClose = () => setShow(false)
    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='content-modal content-modal2 text-center'>
                    <h3 style={{ color: "green" }}>Verify Success?</h3>
                    <br /><br />
                    <p>We have sent a reset password link to your inbox. Please check your mail or your phone to reset the password.</p>
                    <div className='btn-action'>
                        <button className='btn btn-success' onClick={onClose}>OK!</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalSuccess
