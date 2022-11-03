import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CardMedia from "./CardMedia";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Flickity from "react-flickity-component";
import "flickity/dist/flickity.min.css";
import Slider from "react-slick";
import { BASE_IMG } from "../../../constants/appSetting";

function Index({ data, galleries }) {
  const [indexSlide, setIndexSlide] = React.useState(0);
  const [active, setActive] = React.useState(false);
  const [resize, setResize] = React.useState(true);
  const { screenWidth, isMobile } = useSelector((state) => state.app);
  const [productGallery, setProductGallery] = React.useState([]);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [ended, setEnded] = React.useState(false);
  let slider;
  useEffect(() => {
    if (galleries) {
      const arr = galleries.sort(function (a, b) {
        if (a.type.toLowerCase() > b.type.toLowerCase()) {
          return -1;
        }
        if (a.type.toLowerCase() < b.type.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      setProductGallery(arr);
    }
  }, [galleries]);

  const onChangeEnded = (value) => {
    setEnded(value);
  };

  const handleChangeEnded = () => {
    setEnded(true);
  };

  const settings = {
    customPaging: function (i) {
      if (productGallery[i]?.type === "img") {
        return (
          <a>
            <img
              onClick={handleChangeEnded}
              className="img_detail_media"
              src={BASE_IMG + productGallery[i].imageUrl}
              alt=""
            />
          </a>
        );
      } else {
        return (
          <a>
            <img
              onClick={handleChangeEnded}
              className="img_detail_media"
              src={BASE_IMG + data.mainImage}
              alt=""
            />
          </a>
        );
      }
    },
    beforeChange: (oldIndex, newIndex) => {
      setSlideIndex(newIndex);
    },
    dots: true,
    dotsClass: "react-slick-tien",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    if (slider) {
      if (ended === true) {
        slider.slickPlay();
      } else {
        slider.slickPause();
      }
    }
  }, [ended]);
  return (
    <Slider {...settings} ref={(s) => (slider = s)}>
      {productGallery?.map((v, i) => {
        return (
          <div key={v.id} className="media-detail carousel__cell">
            <CardMedia
              data={v}
              isPlay={slideIndex === i}
              onChangeEnded={onChangeEnded}
            />
          </div>
        );
      })}
    </Slider>
  );
}

export default Index;
