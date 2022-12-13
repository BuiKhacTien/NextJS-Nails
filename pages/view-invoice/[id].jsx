import React from 'react'
import dynamic from "next/dynamic";

const ViewInvoice = dynamic(
  () => import("../../components/Account/YourOrders/Invoice"),
  {
    ssr: false,
  }
);

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getServerSideProps({ locale }) {
   return {
      props: {
         ... (await serverSideTranslations(locale, ['translation'])),
      },
   }
}

export default function Index(props) {
    

    return (
        <>
            <ViewInvoice/>
        </>
    )
}
