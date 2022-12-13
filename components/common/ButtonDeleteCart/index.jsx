import React from 'react'
import Button from 'react-bootstrap/Button'
//

import { useDispatch, useSelector } from 'react-redux'
import cartApi from '../../../api/cartApi'
import { formCart, CART_ID } from '../../../constants/appSetting'
import { getShippingFee } from '../../../store/cart/actions'
//
export async function getStaticProps({ locale }) {
   return {
     props: {
       ... (await serverSideTranslations(locale, ['translation'])),
     },
   }
 }

const Index = ({ data }) => {
   const { cart, loading } = useSelector(state => state.cart)
   const {t} = useTranslation()
   const dispatch = useDispatch()
   const onDelete = () => {
      const cartId = localStorage.getItem(CART_ID) || cart.id;
      const { feature_Id, id, quantity } = data;
      const params = {
         cart_id: cartId,
         feature_id: feature_Id,
         product_id: id,
         quantity,
      }
      cartApi.delete(params).then((res) => {
        dispatch({ type: "cart/addCart", payload: res });
        if (!loading) dispatch(getShippingFee(id));
      });
   }
   return (
      <Button onClick={onDelete} variant="link">
         {t("Delete")}
      </Button>
   )
}

export default Index
