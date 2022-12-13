import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
//
//
//

const Index = ({ data = {} }) => {
  const [total, setTotal] = React.useState(
      data.numOf1Star +
      data.numOf2Star +
      data.numOf3Star +
      data.numOf4Star +
      data.numOf5Star
  );
  React.useEffect(() => {
    setTotal(
        data.numOf1Star +
        data.numOf2Star +
        data.numOf3Star +
        data.numOf4Star +
        data.numOf5Star
    );
  }, [data]);
  const createPercent = (value) => {
    const result = Math.round((value * 100) / total);
    if (result) return result;
    return 0;
  };
  const { t } = useTranslation();
  // console.log({ data });
  return (
    <section className="detail-review">
      <div className="d-flex align-items-center mb-2">
        <span>5 {t("Stars")}</span>
        <ProgressBar
          variant="danger"
          className="detail-review__progress"
          now={createPercent(data.numOf5Star)}
        />
        <span className="detail-review__percent">
          {createPercent(data.numOf5Star)}%
        </span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <span>4 {t("Stars")}</span>
        <ProgressBar
          variant="danger"
          className="detail-review__progress"
          now={createPercent(data.numOf4Star)}
        />
        <span className="detail-review__percent">
          {createPercent(data.numOf4Star)}%
        </span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <span>3 {t("Stars")}</span>
        <ProgressBar
          variant="danger"
          className="detail-review__progress"
          now={createPercent(data.numOf3Star)}
        />
        <span className="detail-review__percent">
          {createPercent(data.numOf3Star)}%
        </span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <span>2 {t("Stars")}</span>
        <ProgressBar
          variant="danger"
          className="detail-review__progress"
          now={createPercent(data.numOf2Star)}
        />
        <span className="detail-review__percent">
          {createPercent(data.numOf2Star)}%
        </span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <span>1 {t("Stars")}</span>
        <ProgressBar
          variant="danger"
          className="detail-review__progress"
          now={createPercent(data.numOf1Star)}
        />
        <span className="detail-review__percent">
          {createPercent(data.numOf1Star)}%
        </span>
      </div>
    </section>
  );
};

export default Index;
