import React from 'react'
import dynamic from "next/dynamic";

const ViewInvoice = dynamic(
  () => import("../../components/Account/YourOrders/Invoice"),
  {
    ssr: false,
  }
);

export default function Index(props) {
    

    return (
        <>
            <ViewInvoice/>
        </>
    )
}
