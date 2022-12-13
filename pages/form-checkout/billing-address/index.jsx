import React from "react";
import dynamic from "next/dynamic";

const BillingAddress = dynamic(
  () => import("../../../components/FormCheckout/BillingAddress"),
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
    <div>
      <BillingAddress />
    </div>
  );
}
