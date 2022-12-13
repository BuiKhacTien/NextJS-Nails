import React, {useState, useEffect} from "react";
import { BASE_IMG, DATE_TIME_FORMAT } from "../../../constants/appSetting";
import DetailComment from "../../Detail/DetailComment";
import StarsRate from "../StarsRate";
import NoAvatar from "../../../assets/images/no-avatar.svg";
import moment from "moment";
//

//
//
import { useTranslation } from 'next-i18next'
const formatDate = (date) => {
  return moment(date).format(DATE_TIME_FORMAT);
};
const CardComment = ({
  id,
  icon,
  user_Name,
  content,
  dateCreate,
  children,
  product_Id,
  feature_Id,
  reply_Id,
  num_star,
  image,
  name,
  verifiedPurchased,
}) => {
  const params = {
    id: product_Id,
    feature_Id,
    reply_Id: id,
  };
  const { t } = useTranslation("translation")
  const [showRep, setShowRep] = React.useState(false);
  const [firstName, setFirstName] = useState('')
  useEffect(() => {
    if(user_Name) {
      const array = user_Name.split(" ")
      setFirstName(array[0]);
    }
  }, [user_Name]);

  return (
    <div className="card-comment">
      <div className="d-flex">
        <div className="mr-2">
          <div className="card-comment__avatar">
            <img src={icon ? BASE_IMG + icon : NoAvatar} alt="avatar" />
          </div>
        </div>
        <div className="w-100">
          <div className="card-comment__content ">
            <div className="card-comment__text">
              <a href="#">{firstName} </a>
              <p>{content}</p>
            </div>
            <div>
              <StarsRate name={`sub-comment-review-${name}`} rate={num_star} />
              {verifiedPurchased && <p className="card-verified">Verified purchased</p>}
            </div>
            <div>
              {!reply_Id && (
                <a
                  onClick={() => setShowRep(!showRep)}
                  className="btn-card-comment__reply"
                >
                  {t('Reply')}
                </a>
              )}
              <span>{formatDate(dateCreate)}</span>
            </div>
            <div>
              {image && (
                <img
                  style={{ maxHeight: 200, maxWidth: '100%' }}
                  src={BASE_IMG + image}
                  alt={image}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="reply__comment">
        {children && children.map((v, i) => <CardComment key={i} {...v} />)}
      </div>
      {showRep && (
        <div className="comment__field">
          <DetailComment name={name} data={params} />
        </div>
      )}
    </div>
  );
};

export default CardComment;
