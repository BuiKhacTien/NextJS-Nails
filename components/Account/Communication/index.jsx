import React from "react";
import Link from "next/link"
//
import { useTranslation } from 'next-i18next'

const Index = () => {
   const { t } = useTranslation("translation")
   return (
      <div id="communication" className="content-box-right communication mb-4">
         <h3 className="account__title">{t('Communication Preferentces')}</h3>
         <div className="box-content">
            <div className="box-info">
               <div className="inputcheck">
                  <input type="checkbox" defaultValue="male" />
                  <p className="text-inputcheck">
                     <span className="title-text">{t('Promotions')}</span>
                     {t("Be the first to find out about special offers, new products, cool events, and more")}
                  </p>
               </div>
               <div className="inputcheck">
                  <input type="checkbox" defaultValue="male" />
                  <p className="text-inputcheck">
                     <span className="title-text">{t("Product Review")}</span>{t("We'll occasionlly invite you to review items you've purchased.")}
                  </p>
               </div>
               <div className="inputcheck">
                  <input type="checkbox" defaultValue="male" />
                  <p className="text-inputcheck">
                     <span className="title-text">{t("Quick Surveys")}</span>{t("How can we make you Nails Beauty Supply expenence better? We'll send you surveys to find out.")}
                  </p>
               </div>
               <div className="inputcheck">
                  <input type="checkbox" defaultValue="male" />
                  <p className="text-inputcheck">
                     <span className="title-text">{t("Unsubscribe from all emails")}</span>
                     {t("You'll still get emails about your orders and account.(We have to send those.)")}
                  </p>
               </div>
               <Link
                  className="btn btn-secondary btn-submit"
                  href="/"
               >
                  <a className="btn btn-secondary btn-submit">{t("Save")}</a>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Index;
