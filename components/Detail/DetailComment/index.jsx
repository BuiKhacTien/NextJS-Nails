import React, { useState, useEffect } from "react";
import StarsRate from "../../common/StarsRate";
import Button from "react-bootstrap/Button";
import productApi from "../../../api/productApi";
import { showSuccess } from "../../../utils/app";
import { useDispatch, useSelector } from "react-redux";
import { BASE_IMG } from "../../../constants/appSetting";
//

import { addInfoComments } from "../../../store/user/userActions";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";

const SEND = require("../../../assets/images/send.png");

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//

const InputImage = ({ onChange, value }) => {
  const Dropzone = dynamic(() => import('react-drop-zone'), { ssr: false });
  return (
    <Dropzone onDrop={(file, text) => onChange(file)}>
      {({ over, overDocument }) => (
        <div className="avatar__drop-zone">
          {over ? (
            <div>file is over element</div>
          ) : overDocument ? (
            <div>file is over document</div>
          ) : (
            <div style={{ fontSize: "20px", fontWeight: 700 }}>
              <i className="fal fa-image"></i>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

const Index = ({ data, name = "detail__review-stars" }) => {
  const { t } = useTranslation();
  const { id, reply_Id = null, feature_id, feature_Id } = data;
  const [rate, setRate] = React.useState(0);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const { isLogin } = useSelector((state) => state.user);
  const infoComments = useSelector((state) => state.user.infoComments);
  const linkComment = useSelector((state) => state.user.link);
  const dispatch = useDispatch();
  const [featureId, setFeatureId] = useState(0);
  const router =  useRouter();
  const slug = router.query
  useEffect(() => {
    if (slug.slug) {
      setFeatureId(slug.slug[2]);
    }
  }, [slug]);
  const onSubmit = (e) => {
    e.preventDefault();
    const params = {
      content,
      product_id: id,
      feature_id: featureId || feature_id || feature_Id,
      reply_id: reply_Id,
      num_star: rate,
      image,
    };
    if (!isLogin) {
      const link = router.asPath;
      dispatch(addInfoComments({params, link}));
      return router.push("/login-register");
    }
    
    setLoading(true);
    productApi.addComment(params).then((res) => {
      if (res) {
        setContent("");
        showSuccess("Add comment success");
        setLoading(false);
      }
    });
  };
  const handleChangeImage = (file) => {
    productApi.uploadImage(file).then((res) => {
      setImage(res);
    });
  };

  const onChangeRate = (v) => {
    setRate(v);
  };
  const img = image ? image : "";
  return (
    <section>
      <div className="d-flex">
        <b>{t("Rate for this product")}: </b>
        <StarsRate theme="dark" name={name} rate={rate} change={onChangeRate} />
      </div>
      <form onSubmit={onSubmit} className="detail-send__comment">
        <input
          className="detail_send_comment_input"
          placeholder={`${t("Comment")}...`}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <InputImage onChange={handleChangeImage} value={image} />
        <Button disabled={loading} type="submit" variant="link">
          <img src={SEND.default.src} alt="send" />
        </Button>
      </form>
      {img && (
        <div className="preview" style={{ marginTop: 10 }}>
          <img style={{ width: "50%" }} src={BASE_IMG + img} alt="image" />
        </div>
      )}
    </section>
  );
};

export default React.memo(Index);
