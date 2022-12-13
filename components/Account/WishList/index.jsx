import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productApi from '../../../api/productApi'
import CardHome from '../../common/CardHome'
import { useQuery } from '../../../constants/constants'
import _ from 'lodash'
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
   const {t} = useTranslation();
   const query = useQuery()
   const params = {
      pageIndex: query.get('pageIndex') || '',
      pageSize: query.get('pageSize') || '',
      searchString: query.get('searchString') || '',
   }
   const dispatch = useDispatch()
   const { categories } = useSelector(state => state.product)
   useEffect(() => {
      getWishList()
   }, [])
   const getWishList = (params) => {
      productApi.wishList(params).then(res => {
         if (res) {
            dispatch({ type: 'product/setProducts', payload: { nameKey: 'categories', res } })
         }
      })
   }
   return (
      <div>
         <div className="container divider"></div>
         <div className="container p-0">
            <h3 className="page__title">{t('Wish List')}</h3>
            <div className="grid__4">
               {categories.map((v, i) => <div key={i}><CardHome data={v} /></div>)}
            </div>
         </div>
      </div>
   )
}

export default Index
