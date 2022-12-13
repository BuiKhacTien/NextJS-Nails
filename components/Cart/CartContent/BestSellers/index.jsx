import React from 'react'
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

const Index = () => {
   const {t} = useTranslation()
   return (
      <div className="cart__save">
         <div className="d-flex">
            <div className="cart__save__img">
               <img src="" alt="" />
            </div>
            <div className="cart__save__content">
               <div className="cart-save__title">
                  <div></div>
                  <p>Color: </p>
                  <Button variant="link">{t("Delete")}</Button>
                  <div className="d-flex">
                  <Button variant="light">{t("Delete")}</Button>
                  <Button variant="danger">{t("Delete")}</Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Index
