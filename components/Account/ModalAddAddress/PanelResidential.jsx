import React from 'react'
import Form from 'react-bootstrap/Form'
//
//
//

const PanelResidential = ({ state, setState }) => {
   const { address, address2, city, company, country, is_Default, zip_Code } = state
   const handleState = (v) => {
      const result = { ...state, ...v }
      setState(result)
   }
   const {t} = useTranslation()
   return (
      <div>
         <Form.Group className="mb-3" controlId="address-street">
            <Form.Control size="lg" placeholder={t("Street Address")}
               value={address}
               onChange={e => handleState({ address: e.target.value })}
            />
         </Form.Group>
         <Form.Group className="mb-3" controlId="address-opt">
            <Form.Control size="lg" placeholder="APt, FLoor, Unit etc. (Optional)"
               value={address2}
               onChange={e => handleState({ address2: e.target.value })}
            />
         </Form.Group>
         <Form.Group className="mb-3" controlId="address-zip-code">
            <Form.Control size="lg" placeholder="Zip Code"
               value={zip_Code}
               onChange={e => handleState({ zip_Code: e.target.value })}

            />
         </Form.Group>
         <Form.Group className="mb-3" controlId="address-city">
            <Form.Control size="lg" placeholder="City"
               value={city}
               onChange={e => handleState({ city: e.target.value })}
            />
         </Form.Group>
         <Form.Group className="mb-3" controlId="address-states">
            <Form.Control size="lg" placeholder="States"
               value={country}
               onChange={e => handleState({ country: e.target.value })}
            />
         </Form.Group>
         <small>{t("Your phone number will only be used if we need to contact you about your order.")}</small>
         <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check style={{ fontSize: '1.1rem' }} className="checkbox__default" type="checkbox" label={t("Make this my default shipping address.")}
               value={is_Default}
               onChange={e => handleState({ is_Default: e.target.checked })}
            />
         </Form.Group>
      </div>
   )
}

export default PanelResidential
