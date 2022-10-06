import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Collapse from 'react-bootstrap/Collapse'
import { useSelector } from 'react-redux';
import appApi from '../../api/appApi'
import { showSuccess } from '../../utils/app'
import { useTranslation } from 'react-i18next';
const FooterCollapse = ({ children, open, setOpen }) => {
   const { isMobile } = useSelector(state => state.app)
   if (isMobile) return <Collapse in={open}>
      <ul className="footer-list__block">
         {children}
      </ul>
   </Collapse>
   return <ul className="footer-list__block">{children}</ul>
}

const FooterContact = () => {
   const {t} = useTranslation()
   const [params, setParams] = React.useState({
      comment: "",
      email: "",
      fullname: "",
      phone: ""
   })
   const [loading, setLoading] = React.useState(false)
   const [open, setOpen] = useState(false);
   const { fullname, email, phone, comment } = params
   const handleChange = (nameKey, e) => {
      const val = e.target.value
      setParams({ ...params, [nameKey]: val })
   }
   const onSubmit = (e) => {
      e.preventDefault()
      setLoading(true)
      appApi.footerComment(params).then(res => {
         if (res) {
            showSuccess("send comment success")
            setLoading(false)
         }
      }).then(() => setLoading(false))
   }
   return (
      <div className="footer-list">
         <h4 onClick={() => setOpen(!open)} className="footer-list__title">CONTACT</h4>
         <FooterCollapse open={open} setOpen={setOpen}>
            <Form onSubmit={onSubmit}>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control value={fullname} onChange={(e) => handleChange('fullname', e)} type="text" placeholder="Please enter your name" />
               </Form.Group>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control value={email} onChange={(e) => handleChange('email', e)} type="email" placeholder="Please enter your email" />
               </Form.Group>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control value={phone} onChange={(e) => handleChange('phone', e)} type="email" placeholder="Please enter your phone" />
               </Form.Group>
               <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Comment Box</Form.Label>
                  <Form.Control value={comment} onChange={(e) => handleChange('comment', e)} placeholder="Please enter your comment" as="textarea" rows={3} />
               </Form.Group>
               <Button disabled={loading} variant="secondary" className="w-100" type="submit">SEND</Button>
            </Form>
         </FooterCollapse>
      </div>
   )
}

export default FooterContact
