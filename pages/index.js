import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

//
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// redux
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getListHome,
  getDealsCenter,
  getLastOrdered,
} from "../store/product/actions";
import Flickity from "react-flickity-component";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
// components
import ButtonChangeLanguage from "../components/common/ButtonChangeLanguage/ButtonChangeLanguage";
import CardHome from "../components/common/CardHome";
import appApi from "../api/appApi";
import productApi from "../api/productApi";
import { LAST_VIEW } from "../constants/appSetting";
import Slider from "react-slick";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { GrPrevious, GrNext } from "react-icons/gr";
//

export default function Home() {
  const [background, setBackground] = useState([]);
  const {
    listHome,
    dealsOfDay,
    trending,
    diy,
    bestSellers,
    lastView,
    lastOrdered,
    featureVideo,
    flashSales,
    groupSale,
    dealsCenter,
  } = useSelector((state) => state.product);
  const [lastOrderedNew, setLastOrderedNew] = useState([]);
  const { isMobile, numItemHome, yHeight } = useSelector((state) => state.app);
  const { isLogin, user } = useSelector((state) => state.user);
  const [numItem, setNumItem] = useState(7);
  const [hiddenLoadMore, setHiddenLoadMore] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    getListHome();
    getBackground();
    getDealsCenter();
    getDealsCenter("Best-Seller", "bestSellers");
    getDealsCenter("New-Product", "newProducts");
    getDealsCenter("pedicure-kit", "pedicureKit");
    getDealsCenter("Group-Sale", "groupSale");
    getDealsCenter("Deals-of-Day", "dealsOfDay");
    getDealsCenter("TRENDING", "trending");
    getDealsCenter("DIY", "diy");
    getFlashSales();
    getLatest();
    getFeatureVideo();
    isMobile && setNumItem(3);
    // window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (numItemHome > 0) {
      setNumItem(numItemHome);
    }
  }, [numItemHome]);

  useEffect(() => {
    // kiểm tra xem nếu chưa login thì cho lastOrderedNew = rỗng để không hiện
    if (!isLogin) {
      setLastOrderedNew([]);
    } else {
      setLastOrderedNew(lastOrdered || []);
    }
  }, [lastOrdered]);

  useEffect(() => {
    if (isLogin) {
      getLastOrder();
    }
  }, [isLogin]);

  const getListHome = () => {
    if (listHome.length === 0) {
      productApi.listHome().then((res) => {
        if (res) {
          dispatch({ type: "product/setListHome", payload: res });
        }
      });
    }
  };
  const getDealsCenter = (alias, nameKey = "dealsCenter") => {
    productApi.dealsCenter(alias).then((res) => {
      if (res) {
        dispatch({ type: "product/setProducts", payload: { res, nameKey } });
      }
    });
  };
  const getLatest = () => {
    productApi.latest().then((res) => {
      if (res) {
        dispatch({
          type: "product/setProducts",
          payload: { res, nameKey: "latest" },
        });
      }
    });
  };
  const getFeatureVideo = () => {
    productApi.featureVideo().then((res) => {
      if (res) {
        dispatch({
          type: "product/setProducts",
          payload: { res, nameKey: "featureVideo" },
        });
      }
    });
  };
  const getFlashSales = () => {
    productApi.flashSale().then((res) => {
      if (res) {
        dispatch({
          type: "product/setProducts",
          payload: { res, nameKey: "flashSales" },
        });
      }
    });
  };
  const getLastOrder = () => {
    productApi.lastOrdered().then((res) => {
      if (res) {
        dispatch({
          type: "product/setProducts",
          payload: { res: [res], nameKey: "lastOrdered" },
        });
      }
    });
  };

  const getBackground = () => {
    appApi.background().then((res) => {
      if (res) {
        setBackground(res);
      }
    });
  };

  const handleLoadMore = () => {
    let i = numItem;
    for (i; i < listHome.length; i++) {
      if (listHome.length < i + 4) {
        setHiddenLoadMore(true);
      }
      if (listHome[i]?.products.length > 1) {
        setNumItem(i + 4);
        return;
      }
    }
  };
  const {
    ref: loadMoreRef,
    inView,
    entry,
  } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView === true) {
      handleLoadMore();
    }
  }, [inView]);

  let section1 = [];
  section1 = listHome[0] ? listHome[0].products : [];

  const mockBackground = [
    {
      url: "https://laz-img-cdn.alicdn.com/images/ims-web/TB1hk2jylr0gK0jSZFnXXbRRXXa.jpg_2200x2200Q100.jpg_.webp",
    },
    {
      url: "https://laz-img-cdn.alicdn.com/images/ims-web/TB1d66Eybj1gK0jSZFuXXcrHpXa.jpg_2200x2200Q100.jpg_.webp",
    },
    {
      url: "https://laz-img-cdn.alicdn.com/images/ims-web/TB1PNOpylr0gK0jSZFnXXbRRXXa.jpg_2200x2200Q100.jpg_.webp",
    },
  ];
  const flickityOptions = {
    // cellAlign: "left",
    prevNextButtons: false,
    pageDots: false,
  };
  const typeCard = isMobile ? "secondary" : "primary";
  const listResponsive = listHome.slice(0, numItem);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slider_home_nextArrow"
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <GrNext />
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slider_home_prevArrow"
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <GrPrevious />
      </div>
    );
  }
  var settingsBG = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true
  };
  const superTopSales = listHome.find(
    (item) => item.slug_Name === "Super-Sale"
  );
  const flashTopSales = listHome.find(
    (item) => item.slug_Name === "Flash-Sale"
  );
  const bestTopSellers = listHome.find(
    (item) => item.slug_Name === "Best-Seller"
  );
  // const flashSalesViaLastView =
  //   lastOrderedNew.length > 0 || lastView.length > 0
  //     ? flashSales.slice(0, 1)
  //     : flashSales.slice(0, 2);

  const newGroupSale = groupSale?.filter((v) => v.endPromotion !== null);
  const newDealsOfDay = dealsOfDay?.filter((v) => v.endPromotion !== null);
  const newFlashSale = flashSales?.filter((v) => v.endPromotion !== null);

  // tào lao
  // const filtersHeight = listHome.map(value => {
  //   const arr = value.products.filter(product => {
  //     if (product.videoWidth === 0 && product.videoHeight === 0) {
  //       return product.fullName
  //     }
  //   })
  //   return {
  //     category: value.name,
  //     listFeature: arr
  //   }
  // })
  // console.log(filtersHeight)

  return (
    <>
      <Head>
        <title>Nailsbeautysupply.com</title>
        <meta name="image" content="" />
        <meta name="description" content="Home Page Description" />
        <meta property="og:image" content="../public/favicon.png" />
        <meta property="og:title" content="Home Page Title" />
        <meta property="og:description" content="Home Page Description" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="home-page__wrapper">
        <div className="home-page__slider">
          <Slider {...settingsBG}>
            {background.map((v) => {
              return (
                <div className="home_slider_box" key={v.id}>
                  <Link
                    href={v.url}
                    className="media-detail carousel__cell"
                  >
                    <img
                      src={v.imageUrl}
                      alt="BG"
                      className="home_slider_img"
                    />
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="home-page">
          <div className="container container_min_height">
            <section className="grid__4">
              {lastOrderedNew.length > 0 && isMobile && (
                <p className="title-category__home">
                  <span>{t("LAST VIEW")}</span>
                </p>
              )}
              {lastOrderedNew.length > 0 &&
                lastOrderedNew.map((v, i) => {
                  // const userName = user.name ? `${t("Hello")} ${user.name}` : "";
                  return (
                    <div key={`1-${i}-${v.id}`}>
                      <CardHome
                        name={`1-${i}-${v.id}`}
                        // topTitle={userName}
                        topText={t("Last Ordered")}
                        fluid={isMobile}
                        type={typeCard}
                        data={v}
                        numItem={numItem}
                      />
                    </div>
                  );
                })}
              {lastOrderedNew.length == 0 && isMobile && lastView.length > 0 && (
                <p className="title-category__home">
                  <span>{t("LAST VIEW")}</span>
                </p>
              )}
              {lastOrderedNew.length == 0 &&
                lastView.map((v, i) => {
                  // const userName = user.name ? `${t("Hello")} ${user.name}` : "";
                  return (
                    <div key={`1-${i}-${v.id}`}>
                      <CardHome
                        name={`1-${i}-${v.id}`}
                        // topTitle={userName}
                        topText={t("Last View")}
                        fluid={isMobile}
                        type={typeCard}
                        data={v}
                        numItem={numItem}
                      />
                    </div>
                  );
                })}
              {isMobile && newDealsOfDay?.length > 0 && (
                <p className="title-category__home">
                  <span>{t("Deals of day")}</span>
                  <Link href={"/deals-center/Deals-of-Day"}>
                    <span>{t("View All")}</span>
                  </Link>
                </p>
              )}
              {newDealsOfDay?.slice(0, 1).map((v, i) => {
                return (
                  <div key={`3-${i}-${v.id}`}>
                    <CardHome
                      name={`3-${i}-${v.id}`}
                      topText={`${t("Deals of day")}`}
                      viewAll="/deals-center/Deals-of-Day"
                      fluid={isMobile}
                      type={typeCard}
                      data={v}
                      numItem={numItem}
                    />
                  </div>
                );
              })}
              {isMobile && bestTopSellers?.products?.length > 0 && (
                <p className="title-category__home">
                  <span>{t("BEST SELLERS")}</span>
                  <Link href={"/deals-center/Best-Seller"}>
                    <span>{t("View All")}</span>
                  </Link>
                </p>
              )}
              {bestTopSellers?.products?.slice(0, 1).map((v, i) => {
                // console.log("bestSellers:", v)
                return (
                  <div key={`3-${i}-${v.id}`}>
                    <CardHome
                      name={`3-${i}-${v.id}`}
                      topText={`${t("Best Seller")}`}
                      viewAll="/deals-center/Best-Seller"
                      fluid={isMobile}
                      type={typeCard}
                      data={v}
                      numItem={numItem}
                    />
                  </div>
                );
              })}
              {isMobile && newFlashSale.length > 0 && (
                <p className="title-category__home">
                  <span>{t("FLASH SALES")}</span>
                  <Link href={"/deals-center/Flash-Sale"}>
                    <span>{t("View All")}</span>
                  </Link>
                </p>
              )}
              {newFlashSale.map((v, i) => {
                // console.log("flashSalesViaLastView:", v)
                return (
                  <div key={`2-${i}-${v.id}`}>
                    <CardHome
                      name={`2-${i}-${v.id}`}
                      topText={`${t("Flash Sales")}`}
                      viewAll="/deals-center/Flash-Sale"
                      fluid={isMobile}
                      type={typeCard}
                      data={v}
                      numItem={numItem}
                    />
                  </div>
                );
              })}
              {/* {isMobile && featureVideo.length > 0 && (
              <p className="title-category__home">
                <span>{t("NEW FEATURE")}</span>
              </p>
            )}
            {featureVideo.slice(0, 1).map((v, i) => {
              // console.log("featureVideo:", v)
              return (
                <div key={`4-${i}-${v.id}`}>
                  <CardHome
                    name={`4-${i}-${v.id}`}
                    //topTitle={userName}
                    topText={`${t("New Feature")}`}
                    fluid={isMobile}
                    type={typeCard}
                    data={v}
                      numItem={numItem}
                  />
                </div>
              );
            })} */}
            </section>
            {isMobile && trending.length > 0 && (
              <p className="title-category__home">
                <span>{t("TRENDING")}</span>
              </p>
            )}
            <section className="grid__24">
              {trending.slice(0, 1).map((v, i) => (
                <div
                  key={`5-${i}-${v.id}`}
                  className={`grid__item${isMobile && i === 0 ? -1 : i}`}
                >
                  <CardHome
                    name={`5-${i}-${v.id}`}
                    //topTitle={userName}
                    topText={`${t("Trending")}`}
                    // fluid={isMobile || i === 0}
                    fluid={isMobile}
                    data={v}
                    grid24={i}
                    numItem={numItem}
                  />
                </div>
              ))}
              {diy.slice(0, 2).map((v, i) => (
                <div key={i + "adas"}>
                  {isMobile && diy.length > 0 && i === 0 && (
                    <p className="title-category__home">
                      <span>{t("DIY")}</span>
                    </p>
                  )}
                  <div
                    key={`5-${i}-${v.id}`}
                    // className={`grid__item${isMobile && i === 0 ? -1 : i}`}
                    className="grid__item-1"
                  >
                    <CardHome
                      name={`5-${i}-${v.id}`}
                      //topTitle={userName}
                      topText={`${t("DIY")}`}
                      // fluid={isMobile || i === 0}
                      fluid={isMobile}
                      data={v}
                      grid24={i + 1}
                      numItem={numItem}
                    />
                  </div>
                </div>
              ))}
            </section>
            {newGroupSale?.length > 0 && (
              <p className="title-category__home">
                <span>{t("Group Sale")}</span>
                <Link href={"/deals-center/group-sale"}>
                  <span>{t("View All")}</span>
                </Link>
              </p>
            )}
            <section className="grid__4">
              {newGroupSale?.slice(0, 4).map((v, i) => (
                <div key={`6-${i}-${v.id}`}>
                  <CardHome
                    name={`6-${i}-${v.id}`}
                    //topTitle={userName}
                    // topText="Group Sale"
                    viewAll="/deals-center/Group-Sale"
                    fluid={isMobile}
                    type={typeCard}
                    data={v}
                    numItem={numItem}
                  />
                </div>
              ))}
            </section>
            {listResponsive.map((item, i) => {
              let to = "category";
              const { slug_Name } = item;
              if (dealsCenter.some((value) => value.slug_Name === slug_Name)) {
                to = "deals-center";
              }
              if (item.products.length > 0) {
                let newProduct = [];
                if (
                  item.slug_Name === "Super-Sale" ||
                  item.slug_Name === "Flash-Sale" ||
                  item.slug_Name === "Deals-of-Day"
                ) {
                  newProduct = item.products.filter(
                    (v) => v.endPromotion !== null
                  );
                } else {
                  newProduct = item.products;
                }
                return (
                  <div key={i}>
                    {newProduct.length > 0 && (
                      <p className="title-category__home">
                        <span>{t(item.name.toUpperCase())}</span>
                        <Link href={`/${to}/${slug_Name.replace("/", "")}`}>
                          <span>{t("View All")}</span>
                        </Link>
                      </p>
                    )}
                    <section className="grid__4">
                      {newProduct.slice(0, 4).map((v, j) => (
                        <div key={`list-${i}-${v.id}-${j}`}>
                          <CardHome
                            name={`list-${i}-${v.id}-${j}`}
                            // viewAll={`/deals-center/${slug_Name.replace(
                            //   "/",
                            //   ""
                            // )}`}
                            fluid={isMobile}
                            type={typeCard}
                            data={v}
                            numItem={numItem}
                          />
                        </div>
                      ))}
                    </section>
                    <br />
                    {newProduct.slice(4, 14).length > 0 && isMobile && (
                      <Slider {...settings}>
                        {newProduct.slice(4, 14).map((v, k) => (
                          <FlickityCell
                            name={`list-${i}-${v.id}-${k}`}
                            key={`list-${i}-${v.id}-${k}`}
                            isMobile={isMobile}
                            item={v}
                            numItem={numItem}
                          />
                        ))}
                      </Slider>
                    )}
                  </div>
                );
              }
            })}
            <div className="place_load_more"></div>
            {!hiddenLoadMore && (
              <div className="load_more text-center" ref={loadMoreRef}>
                <Button size="lg" variant="secondary">
                  <Spinner
                    className="spinner_loading"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {t("Load more")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}


const FlickityCell = ({ item, isMobile, name, numItem }) => {
  return (
    <div className="slider__cell">
      <CardHome fluid={isMobile} slide={true} name={name} data={item} numItem={numItem}/>
    </div>
  );
};