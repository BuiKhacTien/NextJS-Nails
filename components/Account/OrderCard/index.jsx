import React from "react";
import Link  from "next/link";
import moment from 'moment'
import OrderCardItem from "./OrderCardItem";
import { DATE_TIME_FORMAT } from "../../../constants/appSetting";
//
//
//

const Index = ({ orderDate = "", orderTotal = 0, items = [], orderId = 0, name = "" }) => {
   const {t} = useTranslation()
   return (
      <div className="account-orders__card border mb-3">
         <div className="orders__card__header">
            <div className="row">
               <div className="col-md-3">
                  <div className="account-item order">
                     <p>{t('ORDER PLACED')}</p>
                     <p>{moment(orderDate).format(DATE_TIME_FORMAT)}</p>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="account-item total">
                     <p>{t('Total')}</p>
                     <p>${orderTotal.toFixed(2)}</p>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="account-item ship">
                     <p>{t('Ship to')}</p>
                     <p>{name}</p>
                  </div>
               </div>
               <div className="col-md-3">
                  <div className="account-item detail">
                     <p>{t('ORDER')} #{orderId}</p>
                     <Link href={`/order-details/${orderId}`}>{t('Order Details')}</Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="orders__card__body">
            {items.map((v, i) => <OrderCardItem {...v} key={i} />)}
         </div>
      </div>
   );
};

export default Index;
