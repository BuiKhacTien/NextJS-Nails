import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BASE_IMG } from "../../../constants/appSetting";
import VideoInView from "../../common/VideoInView";

const Index = ({ data, to }) => {
  const {
    slide = false,
    name,
    description,
    mediaType,
    mainImage,
    videoUrl,
    videoThumb,
    slug_Name,
  } = data;
  const { screenWidth, isMobile } = useSelector((state) => state.app);
  const videoWidth = 0;
  const videoHeight = 0;
  const height = isMobile
    ? slide
      ? ((videoHeight * screenWidth) / videoWidth) * 0.5
      : (videoHeight * screenWidth) / videoWidth
    : 200;
  return (
    <div className="card-category position_relative">
      {mediaType === "img" ? (
        <img src={BASE_IMG + mainImage} alt="background" />
      ) : (
        <div className="card-category-video">
          <VideoInView fluid={isMobile} src={videoUrl} height={height} />
        </div>
      )}
      <div className="card-category__content">
        <p className="card-category__title">{name}</p>
        <p className="card-category__text">{decodeURIComponent(description)}</p>
      </div>
      <div className="position_absolute">
        <Link href={to} className="btn btn-secondary btn_view_more">
          View More
        </Link>
      </div>
    </div>
  );
};

export default Index;
