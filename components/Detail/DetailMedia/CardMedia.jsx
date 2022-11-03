import React from "react";
import { useSelector } from "react-redux";
import { BASE_IMG } from "../../../constants/appSetting";
import VideoInView from "../../common/VideoInView";
import StarsRate from "../../common/StarsRate";

const CardMedia = ({ slide = false, onChangeEnded, isPlay = false,  data = []}) => {
  const [info] = useSelector((state) => state.product.info);
  const { screenWidth, isMobile } = useSelector((state) => state.app);
  const { avg_Stars, watching_Times, sold_Times, viewed_Times } = info;
  const { imageUrl, videoThumb, videoURL, type, id, productId, feature_Id } = data;

  // cho videoHeight videoWidth = 0 để nó full width do dùng react-player
  const videoHeight = 0;
  const videoWidth = 0;
  const height = isMobile
    ? slide
      ? ((videoHeight * screenWidth) / videoWidth) * 0.5
      : (videoHeight * screenWidth) / videoWidth
    : 450;

  const product = { id: productId, feature_Id };
  return (
    <div id={`media-${id}`}>
      {type === "img" ? (
        imageUrl && (
          <img
            src={BASE_IMG + imageUrl}
            alt="gallery"
            className={!isMobile ? "image-detail-pc" : ""}
          />
        )
      ) : (
        <div className="card-media">
          <div className="card-media__star">
            <StarsRate rate={avg_Stars} type="show" size="sm" />
          </div>
          <div className="card-home__status__block">
            <span>
              Watching <i className="fas fa-eye"></i> {watching_Times}
            </span>
            -<span>{sold_Times} Sold</span>-<span>{viewed_Times} Viewed</span>
          </div>
          <VideoInView
            // autoPlay={isPlay}
            // poster={BASE_IMG + videoThumb}
            // fluid={true}
            videoDetail={true}
            onChangeEnded={onChangeEnded}
            isPlay={isPlay}
            height={height}
            src={videoURL}
            product={product}
          />
        </div>
      )}
    </div>
  );
};

export default CardMedia;
