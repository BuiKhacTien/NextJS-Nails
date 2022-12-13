import React, { useEffect, useState } from 'react'
import productApi from '../../../api/productApi'
import SidebarHeader from './SidebarHeader'
import SidebarList from './SidebarList'
import Drawer from '../../common/Drawer'
import { useDispatch, useSelector } from 'react-redux'
//

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
   return {
     props: {
       ... (await serverSideTranslations(locale, ['translation'])),
     },
   }
 }

const myAccount = [
   {
      name: "Profile",
      slug_Name: "account",
   },
   {
      name: "Wish List",
      slug_Name: "wish-list",
   },
   {
      name: "Shipping Address",
      slug_Name: "address",
   },
   {
      name: "My Orders",
      slug_Name: "your-order",
   },
   {
      name: "Reward",
      slug_Name: "reward",
   },
   {
      name: "Payment Method",
      slug_Name: "payment",
   },
   {
      name: "Communication Preference",
      slug_Name: "communication-preferences",
   },
   {
      name: "Sign Out",
      slug_Name: "login-register",
   },


]
const notLogin = [
   {
      name: "Sign in",
      slug_Name: "login-register",
   },
]

const Index = ({ children, open, setOpen }) => {
   const { t } = useTranslation();
   const [style, addStyle] = useState({ display: 'none' })
   const { isLogin } = useSelector(state => state.user)
   const [promotions, setPromotions] = useState([])
   const { menu } = useSelector(state => state.app)
   const dispatch = useDispatch()
   const handleOpen = () => {
      setOpen(!open)

   }
   const handleAnimation = () => {
      if (!open) {
         setTimeout(() => {
            addStyle({ display: 'none' })
         }, 300);
      } else {
         addStyle({})
      }
   }
   // call API
   useEffect(() => {
      getPromotions()
      getCategories()
   }, [])
   useEffect(() => {
      handleAnimation()
   }, [open])

   const getPromotions = () => {
      productApi.dealsCenter().then(res => {
         if (res) {
            // deal center list promotions
            // add group sale
            const arr = [...res, { name: 'Group Sale', slug_Name: 'group-sale' }]
            setPromotions(res)
         }
      })
   }
   const getCategories = () => {
      productApi.catalog().then(res => {
         if (res) {
            dispatch({ type: 'app/setMenu', payload: res })
         }
      })
   }
   return (
      <Drawer open={open} setOpen={handleOpen}>
         <SidebarHeader />
         {isLogin && <SidebarList title="MY ACCOUNT" to="/my-account" rows={myAccount} close={handleOpen} />}
         <SidebarList title="Shop by Category" rows={menu} to="/category" close={handleOpen} />
         <SidebarList title="Promotions" rows={promotions} to="/deals-center" close={handleOpen} />
         {!isLogin && <SidebarList rows={notLogin} close={handleOpen} />}
      </Drawer>
   )
}

export default Index
