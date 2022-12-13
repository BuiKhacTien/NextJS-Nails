import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
//

import CheckBox from '../CheckBox'
//
//
import { useTranslation } from 'next-i18next'
const Index = ({ placeholder, value, onChange, idForm, required = false }) => {
   const [isShow, setIsShow] = useState(false)
   const { t } = useTranslation("translation")
   return (
      <Form.Group className="mb-3 form__password" controlId={idForm}>
         <Form.Control required={required} type={isShow ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} />
         <div className="password__show">
            <CheckBox value={isShow} onChange={() => setIsShow(!isShow)} label={t("show")} />
         </div>
      </Form.Group>
   )
}

export default Index
