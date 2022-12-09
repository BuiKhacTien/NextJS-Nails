import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { BASE_API, BASE_IMG } from "../../../constants/appSetting";
import productApi from "../../../api/productApi";
import { showSuccess, } from "../../../utils/app";
import {
  FacebookShareButton,
  FacebookIcon,
} from 'next-share';

import { VscCopy } from "react-icons/vsc"
import { IoLogoFacebook } from "react-icons/io5"
const GMAIL = require("../../../assets/images/gmail.png");

const SharePanel = (props) => {
  const { slug_Name, feature_Id, id, mainImage, fullName, description } = props.data;
  const url = `https://nailsbeautysupply.com/details/${slug_Name
    .replace("/", "").replace("%", "").replace("+", "")}/${id}/${feature_Id}`;

  const handleClickCopy = () => {
    navigator.clipboard.writeText(url);
    showSuccess("Copy product success");
  };

  const shareComplete = () => {
    if (data) {
      productApi.shareSuccess(data.id, data.feature_Id).then((res) => {
        if (res) {
          showSuccess("share success");
        }
      });
    }
  };
  const shareError = () => {
    if (data) {
      productApi.shareError(data.id, data.feature_Id).then((res) => {
        alert("error");
      });
    }
  };
  const handleClickGmail = () => {
    // const msgbody = `${BASE_API}${data.slug_Name.replace('/', '')}/${data.id}/${data.feature_Id}`;
    const urlGmail =
      "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body=" +
      url +
      "&ui=2&tf=1&pli=1";

    window.open(urlGmail, "sharer", "toolbar=0,status=0,width=648,height=395");
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Share
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="share_panel_box">
          <div className="share_panel_item" onClick={handleClickCopy}>
            <div>
              <VscCopy className="share_panel_item_icon" />
            </div>
            <div className="share_panel_item_text">
              Copy Link
            </div>
          </div>
          <div className="share_panel_item">
            <div className="share_panel_item_facebook">
              <FacebookShareButton
                url={url}
                // quote={'next-share is a social share buttons for your next React apps.'}
                hashtag={'#nail #nailsupply #nailbeautysupply #beautysupply #lashessupply #acrylic #dippowder'}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
            </div>
            <div className="share_panel_item_text">
              Facebook
            </div>
          </div>
          <div className="share_panel_item">
            <img onClick={handleClickGmail} src={GMAIL.default.src} alt="share-gmail" className="share_panel_item_gmail_img" />
            <div className="share_panel_item_text">
              Gmail
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
};
export default SharePanel;
