import React from 'react'
import dynamic from "next/dynamic";
const Address = dynamic(() => import("../../../components/Account/Address"), {
    ssr: false,
  });
  const MiniCart = dynamic(() => import("../../../components/common/MiniCart"), {
    ssr: false,
  });

  import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
  export async function getStaticProps({ locale }) {
    return {
       props: {
          ... (await serverSideTranslations(locale, ['translation'])),
       },
    }
  }

export default function Index({}) {
    

    return (
        <div className="form-checkout">
         <div className="container bg-white">
            <div className="row">
               <div className="d-block col-lg-6">
                  <MiniCart hideCoupon />
               </div>
               <div className="col-lg-6">
                  <Address />
               </div>
            </div>
         </div>
      </div>
    )
}
