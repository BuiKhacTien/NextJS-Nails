import React from "react";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import COPY from "../../../assets/images/copy.png";
import FACEBOOK from "../../../assets/images/facebook-messenger.png";
import GMAIL from "../../../assets/images/gmail.png";
import { BASE_API, BASE_IMG } from "../../../constants/appSetting";
import productApi from "../../../api/productApi";
import { showSuccess } from "../../../utils/app";


const ShareBody = ({ data }) => {
  const { slug_Name, feature_Id, id, mainImage, fullName, description } = data;
  const url = `${BASE_API}details/${slug_Name
    .replace("/", "")
    .replace("%", "")}/${id}/${feature_Id}`;
  const ICONS = [
    {
      icon: COPY,
      name: "copy",
      onClick: () => onCopy(),
    },
    {
      icon: FACEBOOK,
      name: "facebook",
      onClick: () => onShareFB(),
    },
    {
      icon: GMAIL,
      name: "gmail",
      onClick: () => onShareGmail(),
    },
  ];
  const onCopy = () => {
    window.navigator.clipboard.writeText(url);
    showSuccess("Copy product success");
  };
  const onShareFB = () => {
    window.FB.ui(
      {
        method: "share_open_graph",
        action_type: "og.shares",
        action_properties: JSON.stringify({
          object: {
            "og:url": url,
            "og:title": fullName,
            "og:image": BASE_IMG + mainImage,
            "og:description": description,
            "og:type": "article",
            "og:image:width": "1230",
            "og:image:height": "600",
          },
        }),
      },
      (response) => {
        if (response) {
          shareComplete();
        } else {
          // shareError()
        }
      }
    );
    // window.FB.ui(
    //   {
    //     method: "share_open_graph",
    //     action_type: "og.shares",
    //     action_properties: JSON.stringify({
    //       object: {
    //         "og:url": url,
    //       },
    //     }),
    //   },
    //   function (response) {
    //     if (response) {
    //       shareComplete();
    //     } else {
    //       // shareError()
    //     }
    //   }
    // );
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
  const onShareGmail = () => {
    // const msgbody = `${BASE_API}${data.slug_Name.replace('/', '')}/${data.id}/${data.feature_Id}`;
    const urlGmail =
      "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body=" +
      url +
      "&ui=2&tf=1&pli=1";

    window.open(urlGmail, "sharer", "toolbar=0,status=0,width=648,height=395");
  };
  return (
    <div className="share-panel">
      <div className="d-flex center">
        {ICONS.map(({ name, icon, ...props }) => (
          <div key={name}>
            <div {...props} className={`bg-circle ${name}`}>
              <img src={icon} alt={name} />
            </div>
            <h5>{name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

const SharePanel = ({ show, setShow, data, ...props }) => {
  const handleClose = () => {
    setShow(false);
  };
  const { isMobile } = useSelector((state) => state.app);
  if (isMobile)
    return (
      <Offcanvas show={show} onHide={handleClose} placement="bottom" {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Share</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="share-canvas">
          <ShareBody data={data} />
        </Offcanvas.Body>
      </Offcanvas>
    );
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ShareBody data={data} />
      </Modal.Body>
    </Modal>
  );
};
export default SharePanel;
