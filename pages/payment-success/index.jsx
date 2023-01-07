import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import cardApi from "../../api/cardApi";
import userApi from "../../api/userApi";

import { useTranslation } from "next-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}

export default function Index() {
  const [orderId, setOrderId] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("2025-12-30");
  const [email, setEmail] = useState("buikhactien0203@gmail.com");
  const [notFound, setNotFound] = useState(false);
  const [serveyOption, setServeyOption] = useState({
    order_id: 0,
    deliveryDate: "2025-12-30",
    email: "buikhactien0203@gmail.com",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { t } = useTranslation("translation");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login-register");
    }
    const surveyoptinLocal = localStorage.getItem("surveyoptin");
    const surveyoptin = surveyoptinLocal
      ? JSON.parse(surveyoptinLocal)
      : {
          order_id: 0,
          deliveryDate: "2025-12-30",
          email: "buikhactien0203@gmail.com",
        };
    setServeyOption(surveyoptin)
    // renderOptIn(
    //   surveyoptin.order_id,
    //   surveyoptin.deliveryDate,
    //   surveyoptin.email
    // );
  }, []);

  // useEffect(() => {
  //   if (slug > 0) {
  //     setOrderId(slug);
  //   }
  // }, [slug]);

  // useEffect(() => {
  //   if (orderId > 0) {
  //     cardApi.paymentId(orderId).then((res) => {
  //       console.log("res", res);
  //       if (res) {
  //         const date = new Date(res.orderDate);
  //         date.setDate(date.getDate() + 3);
  //         const formattedDate = date.toISOString().slice(0, 10);
  //         setDeliveryDate(formattedDate);
  //         setNotFound(false);
  //       }
  //     }).catch(() => {
  //       setNotFound(true);
  //     });
  //     userApi.info().then((res) => {
  //       if (res && res.email.length > 0) {
  //         setEmail(res.email);
  //       }
  //     });
  //   }
  // }, [orderId]);

  // useEffect(() => {
  //   if (
  //     deliveryDate &&
  //     deliveryDate !== "2025-12-30" &&
  //     email &&
  //     email !== "buikhactien0203@gmail.com"
  //   ) {
  //   console.log("call render");
  //   renderOptIn();
  //   }
  // }, [orderId]);

  // function renderOptIn(order_id, deliveryDate, email) {
  //   console.log("function renderOptIn");
  //   window.gapi.load("surveyoptin", function () {
  //     window.gapi.surveyoptin.render({
  //       merchant_id: "334947797",
  //       order_id: order_id,
  //       email: email,
  //       delivery_country: "US",
  //       estimated_delivery_date: deliveryDate,
  //     });
  //   });
  //   console.log("google", {
  //     merchant_id: "334947797",
  //     order_id: order_id,
  //     email: email,
  //     delivery_country: "US",
  //     estimated_delivery_date: deliveryDate,
  //   });
  // }

  return (
    <>
      <Head>

      </Head>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        async
        defer
      ></Script>
      <Script
        id="google-renderOptIn"
        dangerouslySetInnerHTML={{
          __html: `window.renderOptIn = function() {
                    window.gapi.load("surveyoptin", function () {
                      window.gapi.surveyoptin.render({
                        merchant_id: "334947797",
                        order_id: ${serveyOption.order_id},
                        email: ${serveyOption.email},
                        delivery_country: "US",
                        estimated_delivery_date: ${serveyOption.deliveryDate},
                      });
                    })}
                    `,
        }}
      />
      <div className="payment_success_container">
        <h3>{t("Good Job")} !</h3>
        <p>{t("Your ordered successfully")}</p>
      </div>
    </>
  );
}
