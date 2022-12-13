import React from "react";
import { useSelector } from "react-redux";
//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//

const Index = () => {
  const {t} = useTranslation();
  const { user } = useSelector((state) => state.user);
  const { reward = 0 } = user;
  return (
    <div className="account-center__payment__block">
      <ul className="account-center__payment__list">
        <li className="account-center__payment__header">
          <span>{t("you've saved")}</span>
          <span>${reward.toFixed(2)}</span>
        </li>
        {/* <li className="account-center__payment__item"> */}
        {/*   <p>Credits</p> */}
        {/*   <p>$0.00</p> */}
        {/* </li> */}
      </ul>
    </div>
  );
};

export default Index;
