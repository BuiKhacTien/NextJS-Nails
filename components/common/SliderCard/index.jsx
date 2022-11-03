import React from "react";
import CardHome from "../../../components/common/CardHome";
import Flickity from "react-flickity-component";
import { BASE_VIDEO } from "../../../constants/appSetting";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const FlickityCell = ({ item }) => {
  const { isMobile } = useSelector((state) => state.app);
  const itemUrl = { ...item, videoUrl: BASE_VIDEO + item.videoUrl };
  return (
    <div className="slider__cell">
      <CardHome fluid={isMobile} slide={true} data={itemUrl} />
    </div>
  );
};

const Index = ({ rows = [] }) => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true
  };
  return (
    <div className="slider-card__block">
      <Slider {...settings}>
        {rows.map((v, i) => (
          <FlickityCell key={`list-${v.id}-${i}`} item={v} />
        ))}
      </Slider>
    </div>
  );
};

export default Index;
