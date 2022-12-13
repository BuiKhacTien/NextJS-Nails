import React from 'react'
import Button from 'react-bootstrap/Button'
import userApi from '../../../../api/userApi'
import { showError, showSuccess } from '../../../../utils/app'
import InputPassword from '../../../common/InputPassword'
//
//
//
import { useTranslation } from 'next-i18next'
const init = {
   oldPassword: "",
   password: "",
   confirmPassword: "",
   id: 0,
   email: "",
   token: "",
   pin2FA: ""
}

const Index = ({ open, setOpen }) => {
   const [loading, setLoading] = React.useState(false)
   const [params, setParams] = React.useState(init)
   const { oldPassword, password, confirmPassword } = params
   const { t } = useTranslation("translation");
   const onSubmit = (e) => {
      e.preventDefault()
      const { password, oldPassword, confirmPassword } = params
      if (oldPassword === '') {
         showError(t('Please type old password'));
         return;
      }
      if (password === '') {
         showError(t('Please type new password'));
         return;
      }
      if (confirmPassword === '') {
         showError(t('Please type confirm password'));
         return;
      }

      if (password !== confirmPassword) {
         showError(t('Confirm password is not match.'));
         return;
      }
      setLoading(true)
      userApi.updatePassword(params).then(res => {
         if (res) {
            showSuccess(t("Change password success"))
            setOpen(false)
            setLoading(false)
         }
      }).catch(e => setLoading(false))
   }
   const onChange = (nameKey, v) => {
      setParams({ ...params, [nameKey]: v })
   }
   return (
      <form onSubmit={onSubmit}>
         <InputPassword required value={oldPassword} onChange={(e) => onChange('oldPassword', e.target.value)} placeholder="Current password" />
         <InputPassword required value={password} onChange={(e) => onChange('password', e.target.value)} placeholder="New password" />
         {/* <div className="mb-3">
            <small >Your password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and different than your old password</small>
         </div> */}
         <InputPassword required value={confirmPassword} onChange={(e) => onChange('confirmPassword', e.target.value)} placeholder="Re-enter new password" />
         <div>
            <Button className="btn-submit mb-3" variant="secondary" type="submit">Update</Button>
         </div>
      </form>
   )
}

export default Index
