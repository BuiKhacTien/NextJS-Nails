import React from "react";
import Button from "react-bootstrap/Button";
//

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//


const FooterTop = () => {
  const { t } = useTranslation()
  return (
    <div className="footer-top">
      <div className="footer-top__contact__block">
        {/*
<a href="tel:210.607.8888">
          <i className="fas fa-phone-alt"></i>
        </a>
        <span>210.607.8888</span>
			*/}

      </div>
      <div className="footer-top__actions__block">
        <Button>{t('Likes')} 13K</Button>
      </div>
    </div>
  );
};

export default FooterTop;
