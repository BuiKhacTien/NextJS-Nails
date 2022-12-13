import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import EditUser from './EditUser'
import UpdatePassword from '../UpdatePassword'
//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
   return {
     props: {
       ... (await serverSideTranslations(locale, ['translation'])),
     },
   }
 }

const Index = () => {
   const{t} = useTranslation()
   const [openChangePass, setOpenChangePass] = React.useState(false)
   const [openEdit, setOpenEdit] = useState(false)
   const { user } = useSelector(state => state.user)
   const { firstName, lastName, phone, email } = user
   return (
      <div className="card-center-user">
         <div className="card-user__info__wrapper">
            <div className="card-user__info">
               <div className="card-user__info__content">
                  <span className="h5">{t("First name")}:</span>
                  <span className="mx-2 h6">{firstName}</span>
               </div>
               <div>
                  <span className="h5">{t("Last name")}:</span>
                  <span className="mx-2 h6">{lastName}</span>
               </div>
               <div>
                  <span className="h5">{t("Phone")}:</span>
                  <span className="mx-2 h6">{phone}</span>
               </div>
               <div>
                  <span className="h5">Email:</span>
                  <span className="mx-2 h6">{email}</span>
               </div>
            </div>
            {!openEdit && <Button className="btn__link" variant="link" onClick={() => setOpenEdit(!openEdit)}>Edit</Button>}
         </div>
         {openEdit && <EditUser open={openEdit} setOpen={setOpenEdit} />}
         <Button
            onClick={() => setOpenChangePass(!openChangePass)}
            className="mb-4"
            variant="outline-secondary">{t("Change Password")}</Button>
         {openChangePass && <UpdatePassword open={openChangePass} setOpen={setOpenChangePass} />}
      </div>
   )
}

export default Index
