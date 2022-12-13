import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BASE_IMG } from "../../../constants/appSetting";
import VideoInView from "../../common/VideoInView";
import { useTranslation } from "next-i18next";
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

  const { t } = useTranslation("translation") 
  return (
    <div className="card-category position_relative">
      {mediaType === "img" ? (
        <Link href={to}>
          <img src={BASE_IMG + mainImage} alt="background" className="card_category_img" />
        </Link>
      ) : (
        <div className="card-category-video">
          <VideoInView fluid={isMobile} src={videoUrl} height={height} />
        </div>
      )}
      <div className="card-category__content">
        <Link href={to}>
          <p className="card-category__title">{name}</p>
        </Link>
        <p className="card-category__text">{decodeURIComponent(description)}</p>
      </div>
      <div className="position_absolute">
        <Link href={to} className="btn btn-secondary btn_view_more">
          {t("View more")}
        </Link>
      </div>
    </div>
  );
};

export default Index;
