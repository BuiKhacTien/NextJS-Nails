import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
const GoogleSurveyScript = dynamic(() => import("next/script"), { ssr: false });

function Index() {
  const [surveyOption, setSurveyOption] = useState({
    order_id: 100834,
    deliveryDate: "2023-01-11",
    email: "buikhactien0203@gmail.com",
  });
  // useEffect(() => {
  //   setSurveyOption({
  //     order_id: 100834,
  //     deliveryDate: "2023-01-11",
  //     email: "buikhactien0203@gmail.com",
  //   })
  // }, [])
  useEffect(() => {
    if (surveyOption.order_id !== 0 && surveyOption.email !== "buikhactien@gmail.com" && surveyOption.deliveryDate !== "2025-12-30") {
      window.renderOptIn = function () {
         window.gapi.load("surveyoptin", function () {
           window.gapi.surveyoptin.render({
             merchant_id: 334947797,
             order_id: surveyOption.order_id,
             email: surveyOption.email,
             delivery_country: "US",
             estimated_delivery_date: surveyOption.deliveryDate,
           });
         });
       };
    }
  }, [surveyOption]);
  return (
    <div>
      <h1>Test</h1>
      <GoogleSurveyScript
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        async
        defer
      ></GoogleSurveyScript>
    </div>
  )
}

export default Index