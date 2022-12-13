import React from "react";
import Button from "react-bootstrap/Button";
//

import Link from "next/link";
import userApi from "../../../api/userApi";
//
//

const Index = () => {
  const [addressInfo, setAddress] = React.useState({});
  const { t } = useTranslation();
  React.useEffect(() => {
    userApi.defaultShippingAddress().then((res) => {
      if (res) {
        setAddress(res);
      }
    });
  }, []);
  const { company, address, address2, city, zip_Code, country } = addressInfo;
  return (
    <div>
      <h5 className="my-3">{t("Default Address")}</h5>
      <Link className="default-address__link" href="/my-account/address">
        <div className="default-address__block border">
          <div className="default-address__info">
            <div className="address__item-city">
              <p>{company && company + ","}</p>
              <p>{address && address}</p>
              <p>{address2 && address2}</p>
              <p>{city && city + ","}</p>
              <p>{country && country}</p>
              <p>{zip_Code && " - " + zip_Code}</p>
            </div>
          </div>
          <div className="default-address__info-icon">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </Link>
      <h5 className="my-3">{t("Default Payment")}</h5>
      <Link href="/my-account/payment" className="w-100 btn btn-secondary mb-4">
        <a className="w-100 btn btn-secondary mb-4">+ {t("Add new payment method")}</a>
      </Link>
    </div>
  );
};

export default Index;
