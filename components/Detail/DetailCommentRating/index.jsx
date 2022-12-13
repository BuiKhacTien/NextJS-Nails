import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StarsRate from "../../common/StarsRate";
import productApi from "../../../api/productApi";
import { showSuccess } from "../../../utils/app";
import { useSelector } from "react-redux";
//
//
//

const Index = ({ data, onUpdate }) => {
  const [comment, setComment] = React.useState("");

  const [id, setId] = useState(0);
  const [feature_id, setFeatureId] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (slug.slug) {
      setId(slug.slug[1]);
      setFeatureId(slug.slug[2]);
    }
  }, [slug]);
  const [rate, setRate] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const { isLogin } = useSelector((state) => state.user);
  const dtoParams = (v) => {
    return {
      content: comment,
      feature_id: featureId,
      product_id: id,
      stars: rate,
    };
  };
  const { t } = useTranslation();
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) return router.push("/login-register");
    const params = dtoParams(data);
    setLoading(true);
    productApi
      .addReview(params)
      .then((res) => {
        if (res) {
          setComment("");
          onUpdate(true);
          showSuccess("add review success");
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };
  const onChangeRate = (v) => {
    setRate(v);
  };
  return (
    <section className="detail-comment-rating bg-light p-3">
      <Form onSubmit={onSubmit}>
        <b>Rate this product*</b>
        <StarsRate
          name="detail__review-stars"
          rate={rate}
          change={onChangeRate}
        />
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <b>Describe the review*</b>
          </Form.Label>
          <Form.Control
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="mb-3"
            as="textarea"
            rows={3}
          />
          <div className="d-flex justify-content-end">
            <Button disabled={loading} type="submit" variant="secondary">
              {t("Send")}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </section>
  );
};

export default Index;
