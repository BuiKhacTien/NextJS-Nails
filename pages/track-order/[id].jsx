import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import Cookies from "js-cookie";
import cartApi from "../../api/cartApi";

const Index = () => {

  const { t } = useTranslation("translation");
  const [step, setStep] = useState(2);
  const router = useRouter();
  const [id, setId] = useState(0);
  const query = router.query
  useEffect(() => {
    if (query.id > 0) {
      setId(query.id);
    }
  }, [query]);
  const [orderAddress, setOrderAddress] = useState([]);
  useEffect(() => {
    if(id !== 0) {
      cartApi.paymentAddress(id).then((res) => {
        if (res) {
          setOrderAddress(res);
        }
      });
    }
  }, [id]);
  console.log(111);
  const { name = "", company = "", address = "", address2 = "", city, zipCode, country = "" } = orderAddress;
  const showAddress = `${company ? company : ""} ${address && address} ${address2 && address2} ${city && city + ","} ${country} ${zipCode && " - " + zipCode}`


  //

  return (
    <div className="track-package-page">
      <div className="track-package container bg-white">
        <div className="track-package__header">
          <div className="title__block">
            {/* <h3>{t('Arriving')} {t('February')} 5 - {t("March")}{currentLanguageCode ? "/" : " "}2</h3> */}
            {/* <Link>{t('See all orders')}</Link> */}
          </div>
        </div>
        <div className="track-status">
          <h5>{t('Shipped')}</h5>
          <p>{t('Carrier picked up the package')}</p>
        </div>
        <div className="progress__bar">
          <ul>
            <li>
              <div className={`icon-block ${step >= 1 ? "active" : ""}`}>
                <i className={`fas ${step >= 1 ? "fa-check-circle" : "fa-circle"}`} />
                <div className="line-step" />
              </div>
              <p>{t('Ordered')}</p>
            </li>
            <li>
              <div className={`icon-block ${step > 2 ? "active" : ""}`}>
                <i className={`fas ${step >= 2 ? "fa-check-circle" : "fa-circle"}`} />
                <div className="line-step" />
              </div>
              <p>{t('Shipped')}</p>
            </li>
            <li>
              <div className={`icon-block ${step >= 3 ? "active" : ""}`}>
                <i className={`fas ${step >= 3 ? "fa-check-circle" : "fa-circle"}`} />
                <div className="line-step" />
              </div>
              <p>{t('Out for delivery')}</p>
            </li>
            <li>
              <div className={`icon-block ${step >= 4 ? "active" : ""}`}>
                <i className={`fas ${step >= 4 ? "fa-check-circle" : "fa-circle"}`} />
                <div className="line-step" />
              </div>
              <p>{t('Delivered')}</p>
            </li>
          </ul>
        </div>
        <div className="share-tracking">
          <Button variant="outline-secondary">
            <i className="fas fa-sign-out"></i>
            <span>{t('Share Tracking')}</span>
          </Button>
        </div>
        <div className="track-detail">
          <div className="row">
            <div className="col-md-4">
              <div className="track-card">
                <h4>{t('Shipped to USA')}</h4>
                <p className="track-card__ID">{t('Tracking ID')}: {id}</p>
                {/* <Link to="#">{t('See all updates')}</Link> */}
                <p className="track-card__note">
                  {t('track info provided by M-X-C Tech You can also contact the seller with question about tracking info')}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="track-card">
                <h4>{t('Address info')}</h4>
                <p>{showAddress && showAddress}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="track-card">
                <h4>{t('Order Info')}</h4>
                {/* <Link to="#">{t('View orders details')}</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;