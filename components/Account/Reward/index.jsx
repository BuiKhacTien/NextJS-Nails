import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Discount from "../Discount";
//

//
//

const Index = () => {
  const { t } = useTranslation()
  const { user } = useSelector((state) => state.user);
  return (
    <div id="invite-friend" className=" invite-friend content-box-right">
      <h3 className="invite__title">REWARD</h3>
      <div className="box-content">
        <div className="referrals-dashboard-container">
          <div className="name-container">
            <p className="name">{t('Hi')}, friend!</p>
            {/* <p className="text">Đây là số tiền bạn kiếm được</p> */}
            <p className="text">Here is the money you earn</p>
            <div className="content-dola">
              <p className="text-small">Money earn from referral and save</p>
              {/* <p className="text-small">Kiếm được từ các giới thiệu</p> */}
              <p className="dola">$ {user.reward}</p>
              <div className="referrals-progress-bar-root">
                {/* <h3>Bắt đầu với $10 cho mỗi giới thiệu (*)</h3> */}
                <h3>Start with $10 for each referral (*)</h3>
                {/* <h5>Sau đó, nhận được lên đến $15 cho mỗi giới thiệu sau đó.</h5> */}
                <h5>Then get up to $15 for every referral after that</h5>
                <div className="referral-progress-bar">
                  <div className="bar">
                    <div className="bar-content filled" />
                    <div className="reward-title">Good Friend</div>
                    <div className="reward-amount">
                      <span className="text-purple font-extrabold">$10</span>
                      <span className="hide-small"> per {t('Referral')}</span>
                    </div>
                  </div>
                  <div className="bar">
                    <div className="bar-marker">
                      <h6>6 {t('Referral')}</h6>
                    </div>
                    <div className="bar-content filled" />
                    <div className="reward-title">Better Friend</div>
                    <div className="reward-amount">
                      <span className="text-purple font-extrabold">$12</span>
                      <span className="hide-small"> per {t('Referral')}</span>
                    </div>
                  </div>
                  <div className="bar">
                    <div className="bar-marker">
                      <h6>11+ {t('Referral')}</h6>
                    </div>
                    <div className="bar-content filled" />
                    <div className="reward-title">Bestest Friend</div>
                    <div className="reward-amount">
                      <span className="text-purple font-extrabold">$15</span>
                      <span className="hide-small"> per Referral</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="referrals-explaination-steps-root">
          {/* <h3>Làm thế nào để nó hoạt động ?</h3> */}
          <h3>How does it work ?</h3>
          <div className="referrals-explaination-steps-container">
            <div className="line-steps">
              <ul className="grid clear-fix row">
                <li className="col-md-3">
                  <p className="title">
                    Invite your friends to Nails Beauty Supply
                  </p>
                  <p>Or family members. Or coworkers. Whoever.</p>
                </li>
                <li className="col-md-3">
                  <div className="line-steps-arrow" />
                  <p className="title">They place an order</p>
                  <p>Your friends get $10 off their first order over $50.</p>
                </li>
                <li className="col-md-3">
                  <div className="line-steps-arrow" />
                  <p className="title">You earn</p>
                  <p>
                    Get $10 per referral to start off and up to $15 after that!
                  </p>
                </li>
                <li className="col-md-3">
                  <div className="line-steps-arrow" />
                  <p className="title">You earn 2%</p>
                  <p>Get 2% on every returning purchase after that!</p>
                </li>
              </ul>
            </div>
            <div className="referrals-cta-container">
              <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>
                Affilates Link: ................ Copy Link
              </p>
              <Button variant="secondary">Invite Friends</Button>
            </div>
          </div>
        </div>
      </div>
      <Discount />
    </div>
  );
};

export default Index;
