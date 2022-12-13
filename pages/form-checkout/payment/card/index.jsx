import React from 'react'
import dynamic from "next/dynamic";

const Card = dynamic(
  () => import("../../../../components/FormCheckout/Card"),
  {
    ssr: false,
  }
);

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
        <>
            <Card/>
        </>
    )
}
