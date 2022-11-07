import React from 'react'
import dynamic from "next/dynamic";

const Card = dynamic(
  () => import("../../../../components/FormCheckout/Card"),
  {
    ssr: false,
  }
);
export default function Index({}) {
    

    return (
        <>
            <Card/>
        </>
    )
}
