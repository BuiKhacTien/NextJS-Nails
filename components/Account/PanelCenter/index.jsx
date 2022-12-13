import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// components
import PaymentReview from './PaymentReview'
import Google2Fa from './Google2Fa'
import CardUser from './CardUser'
import userApi from '../../../api/userApi'
import { showError, showSuccess } from '../../../utils/app'
import NO_IMG from '../../../assets/images/no-avatar.svg'
import { BASE_IMG } from '../../../constants/appSetting'
import { useDispatch, useSelector } from 'react-redux'
import AvatarDropzone from './AvatarDropzone'
//
//
//
import { useTranslation } from 'next-i18next'
const Index = () => {
   const { t } = useTranslation("translation")
   const [avatarSelected, setAvatarSelected] = React.useState(null)
   const [openUpload, setOpenUpload] = React.useState(false)
   const [loading, setLoading] = React.useState(false)
   const { user } = useSelector(state => state.user)
   const dispatch = useDispatch()
   React.useEffect(() => {
      getUser()
   }, [])
   const getUser = () => {
      if (!user.id)
         userApi.info().then((res) => {
            if (res) {
               dispatch({ type: "user/setProfile", payload: res });
            }
         });
   }
   const handleUpdateAvatar = () => {
      if (!avatarSelected) return showError("Please choose your image !")
      setLoading(true)
      userApi.upAvatar(avatarSelected).then(res => {
         if (res) {
            dispatch({ type: 'user/update', payload: true })
            setOpenUpload(false)
            setAvatarSelected(null)
            showSuccess(t('Upload Image Success'))
            setLoading(false)
         }
      }).catch(e => setLoading(false))
   }
   const { icon } = user
   return (
      <div>
         <h1 className="mb-4">{t("My Profile")}</h1>
         <div className="account-center__avatar text-center text-md-left mb-3">
            <img style={{ width: 150, height: 150 }} className="p-2 border" src={icon ? (BASE_IMG + icon) : NO_IMG} alt="avatar" />
         </div>
         <Form.Group controlId="formFileAvatar" className="mb-3 text-center account__avatar-change">
            <Button variant="link" onClick={() => setOpenUpload(true)} className="ml-2">{t('change your profile picture')}</Button>
         </Form.Group>
         <PaymentReview />
         <CardUser />
         {/* <Google2Fa /> */}
         <AvatarDropzone
            loading={loading}
            value={avatarSelected}
            onChange={setAvatarSelected}
            open={openUpload}
            setOpen={setOpenUpload}
            ok={handleUpdateAvatar}
         />
      </div>
   )
}

export default Index
