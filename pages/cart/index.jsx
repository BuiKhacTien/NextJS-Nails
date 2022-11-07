import React, { useState, useEffect } from "react";
import CartContent from '../../components/Cart/CartContent'
import ButtonFixed from '../../components/Cart/ButtonFixed'
import { useDispatch, useSelector } from 'react-redux'
//import cartApi from '../../../api/cartApi'
import CartTotalPayment from '../../components/Cart/CartAside/CartTotalPayment'
import productApi from '../../api/productApi'
//import { CART_ID } from '../../../constants/appSetting'


export default function Index({}) {
  //  const { cart } = useSelector(state => state.cart)
  const { bestSellers } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (bestSellers.length === 0) {
      getDealsCenter("Best-Seller", "bestSellers");
    }
  });
  const getDealsCenter = (alias, nameKey = "dealsCenter") => {
    productApi.dealsCenter(alias).then((res) => {
      if (res) {
        dispatch({ type: "product/setProducts", payload: { res, nameKey } });
      }
    });
  };
  return (
    <>
      <div className="container bg-white pt-4">
        <div className="row reverse">
          <div className="col-md-9">
            <CartContent />
          </div>
          <div className="col-md-3">
            <CartTotalPayment />
          </div>
        </div>
      </div>
      <ButtonFixed />
    </>
  );
}
