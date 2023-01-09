import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import dynamic from "next/dynamic";
const GoogleSurveyScript = dynamic(() => import("next/script"), { ssr: false });

//
//
const SUCCESS = require("../../../assets/images/success.png");
import { useTranslation } from "next-i18next";
const Index = ({ ok, show = false, setShow, surveyOption }) => {
  console.log("surveyOptionModal", surveyOption);
  const handleClose = () => setShow(false);
  const { t } = useTranslation("translation");
  const handleShow = () => {
    setShow(true);
  };
  useEffect(() => {
    if (surveyOption.order_id !== 0 && surveyOption.email !== "buikhactien@gmail.com" && surveyOption.deliveryDate !== "2025-12-30") {
      console.log("run renderOptIn", surveyOption )
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
    <>
      <GoogleSurveyScript
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        async
        defer
      ></GoogleSurveyScript>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header className="modal__header__success" closeButton />
        <Modal.Body>
          <div className="modal__content-success">
            <img src={SUCCESS.default.src} alt="success" />
            <h3>{t("Good Job")} !</h3>
            <p>{t("Your ordered successfully")}</p>
            <div>
              <Button variant="primary" onClick={ok}>
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Index;
