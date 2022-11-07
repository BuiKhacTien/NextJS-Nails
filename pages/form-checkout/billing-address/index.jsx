import React from "react";
import dynamic from "next/dynamic";

const BillingAddress = dynamic(
  () => import("../../../components/FormCheckout/BillingAddress"),
  {
    ssr: false,
  }
);

export default function Index({}) {
  return (
    <div>
      <BillingAddress />
    </div>
  );
}
