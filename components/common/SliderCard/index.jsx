import React from "react";
import CardHome from "../../../components/common/CardHome";
import Flickity from "react-flickity-component";
import { BASE_VIDEO } from "../../../constants/appSetting";
import { useSelector } from "react-redux";
import Slider from "react-slick";

// const FlickityCell = ({ item }) => {
//   const { isMobile } = useSelector((state) => state.app);
//   const itemUrl = { ...item, videoUrl: BASE_VIDEO + item.videoUrl };
//   return (
//     <div className="slider__cell">
//       <CardHome fluid={isMobile} slide={true} data={itemUrl} />
//     </div>
//   );
// };

const Index = ({ rows = [] }) => {
  const { isMobile } = useSelector((state) => state.app);
  // const settings = {
  //   className: "slider variable-width",
  //   dots: false,
  //   infinite: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   // variableWidth: true
  // };
  return (
    // <div className="slider-card__block">
    //   <Slider {...settings}>
    //     {rows.map((v, i) => (
    //       <FlickityCell key={`list-${v.id}-${i}`} item={v} />
    //     ))}
    //   </Slider>
    // </div>
    <div className="frequently_product_box">
      {rows.length > 0 &&
        rows?.slice(0,4).map((value, index) => {
          const itemUrl = { ...value, videoUrl: BASE_VIDEO + value.videoUrl };
          return (
            <div
              className="frequently_product_item col-lg-3 col-sm-6 col-12"
              key={index + "frequently"}
            >
              <CardHome
                fluid={isMobile}
                data={itemUrl}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Index;
