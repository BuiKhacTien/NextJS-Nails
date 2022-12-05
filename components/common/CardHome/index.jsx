import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import SharePanel from "./SharePanel";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import VideoInView from "../VideoInView";
import StarsRate from "../StarsRate";
import cartApi from "../../../api/cartApi";
import { nextStepCheckout } from "../../../store/app/appActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { BASE_IMG, formCart } from "../../../constants/appSetting";
import Link from "next/link"
import { useRouter } from "next/router";
import { showSuccess } from "../../../utils/app";
import ButtonAddCart from "../ButtonAddCart";
import appApi from "../../../api/appApi";
import productApi from "../../../api/productApi";
import CardComment from "./CardComment";
import DetailComment from "../../Detail/DetailComment";
import Discount from "./Discount";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { isBuffer } from "lodash";

const LikeIcon = ({ isLiked }) => {
  if (isLiked) return <i className="fas fa-thumbs-up"></i>;
  return <i className="far fa-thumbs-up"></i>;
};
const ShareIcon = ({ isShared }) => {
  if (isShared) return <i className="fas fa-share"></i>;
  return <i className="far fa-share"></i>;
};
const getPrice = (price, priceDiscount, group_Sale_Price, isReach) => {
  const pr = Number(price);
  const prD = Number(priceDiscount);
  if (group_Sale_Price && group_Sale_Price > 0) {
    const _savePrice = Number(price) - Number(group_Sale_Price);
    if (isReach)
      return {
        oldPrice: price,
        newPrice: group_Sale_Price,
        savePrice: _savePrice,
      };
    return { oldPrice: "", newPrice: price, savePrice: _savePrice };
  }
  if (pr === prD) return { oldPrice: "", newPrice: pr, savePrice: 0 };
  return { oldPrice: pr, newPrice: prD, savePrice: 0 };
};
const Index = ({
  data = {},
  slide = false,
  fluid = false,
  viewAll = "",
  topTitle = "",
  topText = "",
  name,
  grid24,
}) => {
  const {
    videoHeight,
    videoWidth,
    fullName,
    endPromotion,
    discountPromotion,
    color,
    size,
    mainImage,
    videoThumb,
    id,
    feature_Id,
    videoUrl,
    avg_Stars,
    watching_Times,
    sold_Times,
    priceDiscount,
    price,
    num_Of_Comments = 0,
    shared_Times = 0,
    liked_Times = 0,
    slug_Name,
    isLiked,
    isShared,
    viewed_Times,
    group_Sale_Price,
    group_Sale_Qty,
    group_Sale_Solded,
  } = data;
  const { t } = useTranslation();
  const [showShare, setShowShare] = useState(false);
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(true);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { screenWidth, isMobile, comment } = useSelector((state) => state.app);
  const { isLogin } = useSelector((state) => state.user);
  const { productCartModels } = cart;
  const router = useRouter();

  const paramsCart = () => {
    const indexInCart = productCartModels.findIndex(
      (existingItem) =>
        existingItem.id === id && existingItem.feature_Id === feature_Id
    );
    if (indexInCart !== -1) {
      productCartModels[indexInCart].quantity =
        productCartModels[indexInCart].quantity + 1;
    } else {
      // qty revise to 1
      productCartModels.push({ ...data, quantity: 1 });
    }
    const params = productCartModels.map((item) => formCart(item, cart.id));
    // add qty for item
    return params;
  };
  const showWishList = () => {
    const currentLanguageCode = Cookies.get("i18next") === "en";
    return currentLanguageCode ? (
      <Button
        onClick={addWishList}
        variant="warning"
        disabled={action === "wish"}
      >
        {action === "wish" && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        <span>{t("Add To Wishlist")}</span>
      </Button>
    ) : null;
  };
  const buyNow = () => {
    let params = [];
    if (productCartModels) {
      const indexInCart = productCartModels.findIndex(
        (existingItem) =>
          existingItem.id === id && existingItem.feature_Id === feature_Id
      );
      if (indexInCart !== -1) {
        productCartModels[indexInCart].quantity =
          productCartModels[indexInCart].quantity + 1;
      } else {
        // qty revise to 1
        productCartModels.push({ ...data, quantity: 1 });
      }
      params = productCartModels.map((item) => formCart(item, cart.id));
      // add qty for item
    } else {
      params = [
        {
          cart_id: null,
          feature_id: feature_Id,
          product_id: id,
          quantity: 1,
        },
      ];
    }
    setAction("buy");
    cartApi
      .addCart(params)
      .then((res) => {
        if (res) {
          dispatch({ type: "cart/addCart", payload: res });
          dispatch(nextStepCheckout(0)).then(({ nextPath }) => {
            router.push(nextPath);
          });
          setAction("");
        }
      })
      .catch((e) => {
        productCartModels.pop();
        setAction("");
      });
  };
  const getNumWishList = () => {
    appApi.numWishList().then((res) => {
      if (res) {
        dispatch({ type: "app/numWishList", payload: res.result });
      }
    });
  };
  const addWishList = () => {
    if (!isLogin) {
      setAction("");
      return router.push("/login-register");
    }
    setAction("wish");
    cartApi
      .addWishList(id, feature_Id)
      .then((res) => {
        showSuccess("Add wish list success");
        getNumWishList();
        setAction("");
      })

  };
  const onShare = () => {
    const url = `https://nailsbeautysupply.com/details/${slug_Name
      .replace("%", "")
      .replace("/", "")}/${data.id}/${data.feature_Id}`;
    window.FB.ui(
      {
        display: "dialog",
        method: "share",
        href: url,
      },
      (response) => {
        if (response) {
          shareComplete();
        } else {
          // shareError()
        }
      }
    );
  };
  const shareComplete = () => {
    if (data) {
      productApi.shareSuccess(data.id, data.feature_Id).then((res) => {
        if (res) {
          showSuccess("share success");
        }
      });
    }
  };
  const shareError = () => {
    if (data) {
      productApi.shareError(data.id, data.feature_Id).then((res) => {
        alert("error");
      });
    }
  };
  // const refs = useRef();
  const onPlay = () => { };
  const onPause = () => {
    const video = document.getElementsByTagName("video");
  };
  const onLike = () => {
    if (!isLogin) return router.push("/login-register");
    productApi.like(id, feature_Id).then((res) => {
      if (res) {
        console.log(res);
      }
    });
  };
  useEffect(() => {
    if (open) {
      getComment(id, feature_Id);
    }
  }, [open]);
  const getComment = (id, featureId) => {
    setLoading(true);
    productApi
      .getComment(id, featureId)
      .then((res) => {
        if (res) {
          setComments(res);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };
  const checkComment = (type, res) => {
    return (
      type &&
      type === "UPDATE" &&
      open &&
      res.product_Id === id &&
      res.feature_Id === feature_Id
    );
  };
  const getNewComments = (comments, res, id = null) => {
    const existingItem = comments.findIndex((v) => v.id === res.id);
    let arr = [];
    if (existingItem === -1) {
      arr.push(...comments);
      if (id === res.reply_Id || id === null) arr.unshift(res);
    } else {
      arr = comments.map((v) => (v.id === res.id ? res : v));
    }
    return arr;
  };
  const handlePlay = () => {
    setDisplay(false);
  };
  const hanldlePause = () => setDisplay(true);
  useEffect(() => {
    // update comment from socket
    const { type, res } = comment;
    if (checkComment(type, res)) {
      let newComments = [];
      if (res.reply_Id) {
        newComments = comments.map((v) => ({
          ...v,
          children: getNewComments(v.children, res, v.id),
        }));
      } else {
        newComments = getNewComments(comments, res);
      }
      setComments(newComments);
      dispatch({ type: "app/clearComment" });
    }
  }, [comment]);
  
  const height = isMobile
    ? slide
      ? ((videoHeight * screenWidth) / videoWidth) * 0.5
      : (videoHeight * screenWidth) / videoWidth
    : 200;

  const reachGroupSale =
    Number(group_Sale_Qty) - Number(group_Sale_Solded) <= 0;
  const { oldPrice, newPrice, savePrice } = getPrice(
    price,
    priceDiscount,
    group_Sale_Price,
    reachGroupSale
  );

  const [isVideo, setIsVideo] = useState(true);
  useEffect(() => {
    if (
      videoUrl == "https://nailssolutions-usso.streaming.media.azure.net/" ||
      videoUrl == ""
    ) {
      setIsVideo(false);
    }
  }, [videoUrl]);
  const [isViewMore, setIsViewMore] = useState([]);
  // useEffect(() => {
  //   if (id) {
  //     productApi.productViewMore(id).then((res) => {
  //       if (res) {
  //         const arr = res.productColorSize
  //         if (arr) {
  //           if (arr[0]?.colors?.length > 1) {
  //             console.log("length: ", arr[0].colors.length);
  //             setIsViewMore(true);
  //           }
  //         }
  //       }
  //     });
  //   }
  // }, [id]);
  // console.log({endPromotion, fullName})
  return (
    <>
      <div className="card-home" onMouseOver={onPlay} onMouseLeave={onPause}>
        <div className="card-home__user__block container">
          <div>
            {topTitle && <p>{t(topTitle)}</p>}
            {topText && <p>{t(topText)}</p>}
          </div>
          {/* {isViewMore && <Link href={`/product/${id}`}>{t("View more")}</Link>} */}
        </div>
        <div className="card-home__title__block container">
          <Link
            href={`/details/${slug_Name
              ?.replace("%", "")
              .replace("/", "")}/${id}/${feature_Id}`}
          >
            <p>{data.fullName}</p>
          </Link>
          {isMobile && (
            <div className="card_home_color">
              {color && (
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                  <b>Color:</b> {color}
                </div>
              )}
              {size && (
                <div>
                  <b>Size:</b> {size}
                </div>
              )}
            </div>
          )}
        </div>
        {isVideo && (
          <>
            <div className="card-home__status__block">
              <span>
                Watching <i className="fas fa-eye"></i> {watching_Times}
              </span>
              -<span>{sold_Times} Sold</span>-<span>{viewed_Times} Viewed</span>
            </div>
            <div className="card-home__rate__block">
              <StarsRate rate={avg_Stars} theme="dark" type="show" size="sm" />
            </div>
          </>
        )}
        {isVideo ? (
          <div className="card-home__video__block">
            <VideoInView
              propsPlay={handlePlay}
              propsPause={hanldlePause}
              fluid={fluid}
              src={videoUrl}
              height={height}
              // height={!isMobile && grid24 == "0" ? 421 : height}
              // poster={videoUrl && BASE_IMG + videoThumb}
              product={data}
            />
          </div>
        ) : (
          <div className="card-home-image">
            <Link
              href={`/details/${slug_Name
                ?.replace("%", "")
                .replace("/", "")}/${id}/${feature_Id}`}
            >
              <img src={BASE_IMG + mainImage} alt="background" className={isMobile ? "card_home_img_mobile" : "card_home_img_pc"} />
            </Link>
          </div>
        )}
        <div className={`card-home__price__block container`}>
          <div className="card_home_price_container">
            {oldPrice ? (
              <>
                <div className="card-home__oldPrice">WAS ${oldPrice}</div>
                <div className="card-home__price_sale">
                  <div>
                    {/* {Math.floor(((oldPrice - newPrice) / oldPrice) * 100)}% */}
                    {discountPromotion + "%"}
                  </div>
                  <div style={{ marginLeft: 3 }}> Off</div>
                </div>
              </>
            ) : (
              <div style={{ marginRight: 0 }}></div>
            )}
            <div>
              <div className="card-home__newPrice">
                {t("Now")} ${newPrice}
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className="card_home_color_pc">
              {color && (
                <div>
                  <b>Color:</b> {color}
                </div>
              )}
              {size && (
                <div style={{ marginLeft: 10 }}>
                  <b>Size:</b> {size}
                </div>
              )}
            </div>
          )}
          {group_Sale_Price && (
            <div>
              <div className="card-home__price-discount">
                {Number(group_Sale_Qty) - Number(group_Sale_Solded) > 0 && (
                  <p>Bought: {group_Sale_Solded}</p>
                )}
                <div>
                  {Number(group_Sale_Qty) - Number(group_Sale_Solded) <= 0 ? (
                    <strong>
                      This product is now quality for group sale discount
                    </strong>
                  ) : (
                    <span>
                      {t("Need")} {group_Sale_Qty - group_Sale_Solded} more
                      quantities to
                      {t("save")} ${savePrice}
                    </span>
                  )}
                  <span>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-top">
                          This product is group sale
                        </Tooltip>
                      }
                    >
                      <Button style={{ color: "black" }} variant="link">
                        <i className="far fa-question-circle"></i>
                      </Button>
                    </OverlayTrigger>
                  </span>
                </div>
              </div>
              <Discount {...data} />
            </div>
          )}
        </div>
        <div className={`card-home__action btn-flex px-2 `}>
          <Button
            onClick={addWishList}
            variant="warning"
            disabled={action === "wish"}
          >
            {action === "wish" && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span>{t('Add To Wishlist')}</span>
          </Button>
          {/* {showWishList()} */}
          <ButtonAddCart data={data} />
          <Button
            onClick={buyNow}
            variant="success"
            disabled={action === "buy"}
          >
            {action === "buy" && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span>{t("Buy Now")}</span>
          </Button>
        </div>
        <div className="card-home__comment-status px_2  btn-flex">
          <span>
            {liked_Times} {t("Likes")}
          </span>
          <span>
            {num_Of_Comments} {t("Comments")}
          </span>
          <span>
            {shared_Times} {t("Shares")}
          </span>
        </div>
        <div className="card-home__comment-actions px_2">
          <div className="btn-flex">
            <Button onClick={onLike} variant="white">
              <LikeIcon isLiked={isLiked} />
              {t("Like")}
            </Button>
            <Button
              variant="white"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <i className="fal fa-comments"></i>
              {t("Comment")}
            </Button>
            <Button onClick={() => setShowShare(true)} variant="white">
              <ShareIcon isShared={isShared} />
              {t("Share")}
            </Button>
          </div>
        </div>
        <SharePanel data={data} show={showShare} onHide={() => setShowShare(false)} />
      </div>
      <Collapse in={open} style={{ backgroundColor: "white" }}>
        <div id="example-collapse-text">
          <div className="comment__field mb-2">
            <DetailComment
              name={`comment-${name}`}
              data={{ id, feature_id: feature_Id }}
            />
          </div>
          {comments &&
            !loading &&
            comments.length > 0 &&
            comments.map((v, i) => {
              return (
                <CardComment name={`sub-comment-${v.id}`} key={i} {...v} />
              );
            })}
          {loading && (
            <div className="text-center mt-3">
              <Spinner animation="border" variant="purple" />
            </div>
          )}
        </div>
      </Collapse>
    </>
  );
};

export default Index;
