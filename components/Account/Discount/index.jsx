import React from "react";
import Table from "react-bootstrap/Table";
//
import Link from "next/link"
import userApi from "../../../api/userApi";
//
//
import { useTranslation } from 'next-i18next'

const Index = () => {
  const [rewards, setRewards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation("translation")
  React.useEffect(() => {
    getRewardsHistory();
  }, []);
  const getRewardsHistory = () => {
    userApi
      .getRewardHistory()
      .then((res) => {
        if (res) {
          setRewards(res);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  return (
    <div id="discount-code" className="content-box-right discount-code mt-4">
      <h2 className="account__title">{t("Reward")}</h2>
      <div className="discount-code__content">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{t("Order")}</th>
              <th>{t("Date")}</th>
              <th>{t("Reward")}</th>
              <th>{t("Credit from")}</th>
              <th>{t("Note")}</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((v, i) => (
              <tr key={v.order_Id}>
                <td style={{ width: "8%" }} className="text-center">
                  {i + 1}
                </td>
                <td style={{ width: "12%", textAlign: "center" }}>
                  <Link href={`/order-details/${v.order_Id}`}>{v.order_Id}</Link>
                </td>
                <td style={{ width: "25%", textAlign: "center" }}>{v.date}</td>
                <td style={{ width: "15%" }}>{v.amount}</td>
                <td style={{ width: "20%", textAlign: "center" }}>
                  {v.type === "group-sale" ? "Group Sale" : ""}
                </td>
                <td style={{ width: "20%", textAlign: 'center' }}>{v.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <h2 className="account__title">{t("Share Products")}</h2>
      <div className="discount-code__content">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{t("Code")}</th>
              <th>{t("Status")}</th>
              <th>{t("Expiration date")}</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
                     <td className="text-center">1</td>
                     <td>Mark</td>
                     <td>Otto</td>
                     <td>@mdo</td>
                  </tr> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Index;
