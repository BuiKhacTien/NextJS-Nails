import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import productApi from "../../api/productApi";
import { useRouter } from "next/router";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tabs from "react-bootstrap/Tabs";
//

import Tab from "react-bootstrap/Tab";
import cookies from 'js-cookie'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//
// components
import DetailMedia from "../../components/Detail/DetailMedia";
import DetailFeature from "../../components/Detail/DetailFeature";
import DetailComment from "../../components/Detail/DetailComment";
import CardComment from "../../components/common/CardHome/CardComment";
import DetailSocial from "../../components/Detail/DetailSocial";
import FrequentBought from "../../components/Detail/FrequentBought";
import DetailReview from "../../components/Detail/DetailReview";
import DetailRating from "../../components/Detail/DetailRating";
import DetailCommentRating from "../../components/Detail/DetailCommentRating";
import DetailCommentList from "../../components/Detail/DetailCommentList";
import VerifyPurchased from "../../components/Detail/VerifyPurchased";
import MiniCart from "../../components/common/MiniCart";
import SliderCard from "../../components/common/SliderCard";
import { useDispatch, useSelector } from "react-redux";
import { LAST_VIEW } from "../../constants/appSetting";
import { BASE_IMG } from '../../constants/appSetting';

import { BsFacebook } from "react-icons/bs"


const getColorInSize = (info, featureId) => {
  if (info.productColorSize.length === 0) return {};
  for (let i = 0; i < info.productColorSize.length; i++) {
    const existItem = info.productColorSize[i].colors.find(
      (color) => Number(color.feature_Id) === Number(featureId)
    );
    if (existItem) {
      return existItem;
    }
  }
  return {};
};
const createFirstGallery = (info = {}) => {
  const {
    feature_Id,
    videoUrl,
    id,
    mediaType,
    image,
    videoHeight,
    videoWidth,
    viewed_Times,
    watching_Times,
    sold_Times,
  } = info;
  const firstItem = {
    feature_Id,
    isFirst: true,
    imageUrl: image,
    productId: id,
    type: mediaType === "video" ? "vid" : "img",
    videoURL: videoUrl,
    videoHeight,
    videoWidth,
    viewed_Times,
    watching_Times,
    sold_Times,
  };
  if (!firstItem.productId) return [];
  return [firstItem];
};

const LayoutReposive = ({ isMobile = false, children }) => {
  return (
    <div className="row">
      {children.map((item, i) => (
        <div key={i} className="col-md-6">
          {item}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { resolvedUrl, query } = context
  const id = query.slug[1]
  // const featureId =  typeof(query.slug[2]) !== String ? '0' : query.slug[2]
  const featureId =  query.slug[2]
  const res = await productApi.info(id, featureId);
  // console.log(featureId)
  let URL = "";
  let ogmainImage = "";
  let ogfullName = "";
  let ogdescription = "";
  if (res) {
    // ogmainImage = BASE_IMG + res.mainImage
    const productGalleryItem = res.productColorSize.find((value) => {
      return value.feature_Id == featureId
    })
    if (productGalleryItem) {
      ogmainImage = productGalleryItem.imageUrl ? BASE_IMG + productGalleryItem.imageUrl : BASE_IMG + res.mainImage
    } else {
      ogmainImage = BASE_IMG + res.mainImage
    }
    // console.log(ogmainImage)
    URL = "https://nailsbeautysupply.com" + resolvedUrl
    ogfullName = res.fullName
    ogdescription = res.description.replace(/%20/g, " ").replace(/%2C/g, ", ");
    // ogdescription = res.details.replace(/%20/g, " ");
  }
  return {
    props: { URL, ogmainImage, ogfullName, ogdescription }, // will be passed to the page component as props
  }
}

export default function Detail({ URL, ogmainImage, ogfullName, ogdescription }) {
  const currentLanguageCode = cookies.get('i18next') === 'en' ? true: false;
  const { t } = useTranslation()
  const [id, setId] = useState(0);
  const [featureId, setFeatureId] = useState(0);
  const router = useRouter();
  const slug = router.query
  useEffect(() => {
    if (slug.slug) {
      setId(slug.slug[1]);
      setFeatureId(slug.slug[2]);
    }
  }, [slug]);

  const [related, setRelated] = useState([]);
  const [totalReview, setTotalReview] = useState({});
  const [update, setUpdate] = useState(true);
  const [comments, setComments] = useState([]);
  const [activeFeature, setActiveFeature] = useState({});
  const [galleries, setGalleries] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const { comment } = useSelector((state) => state.app);
  const [info] = useSelector((state) => state.product.info);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  useEffect(() => {
    if (info) {
      getLastView();
    }
  }, [info]);
  useEffect(() => {
    if (!featureId || !id || Number(id) === 0) return;
    getInfo(id, featureId);
    getTotalReview(id);
    getComment(id, featureId);
  }, [id, featureId]);
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
  const checkComment = (type, res) => {
    return (
      type &&
      type === "UPDATE" &&
      res.product_Id === Number(id) &&
      res.feature_Id === Number(featureId)
    );
  };
  // show wish list
  const showWishList =()=>{
      return false ? <DetailSocial reviews={totalReview} data={info} /> : null
    }
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
  const getInfo = (id, featureId) => {
    productApi.info(id, featureId).then((res) => {
      if (res) {
        const infoWithFeatureId = { ...res, feature_Id: Number(featureId) }
        dispatch({
          type: "product/setProducts",
          payload: { res: [infoWithFeatureId], nameKey: "info" },
        });
        localStorage.setItem(
          LAST_VIEW,
          JSON.stringify(infoWithFeatureId)
        );
        const newGalleries = filterGallery(res);
        setGalleries(newGalleries);
      }
    });
  };
  const getRelated = (id, size) => {
    productApi.related(id, size).then((res) => {
      if (res) {
        setRelated(res);
      }
    });
  };
  useEffect(() => {
    if (update === true) {
      //  getReviews(id);
      getTotalReview(id);
      setUpdate(false);
    }
  }, [update]);
  const getReviews = (id) => {
    productApi.allReviews(id).then((res) => {
      if (res) {
        setComments(res);
      }
    });
  };
  const getTotalReview = (id) => {
    productApi.commentTotal(id).then((res) => {
      if (res) {
        setTotalReview(res);
      }
    });
  };
  const getComment = (id, featureId) => {
    productApi.getComment(id, featureId).then((res) => {
      if (res) {
        setComments(res);
      }
    });
  };

  const getLastView = () => {
    const lastView = localStorage.getItem(LAST_VIEW);
    if (lastView) {
      const result = JSON.parse(lastView);
      const { id, feature_Id } = result;
      productApi.info(id, feature_Id)?.then((res) => {
        if (res) {
          let size = "";
          let color = "";
          res.productColorSize.forEach((value) => {
            value.colors.forEach((value2) => {
              if (value2.feature_Id === feature_Id) {
                color = value2.color;
                size = value.size;
                return;
              }
            });
          });
          const result = { ...res, feature_Id, color, size };
          dispatch({
            type: "product/setProducts",
            payload: { res: [result], nameKey: "lastView" },
          });
          localStorage.setItem(LAST_VIEW, JSON.stringify(result));
        }
      });
    }
  };

  const filterGallery = (info = {}) => {
    let newGallery = [];
    const gallery = info.productGallery || [];
    //const active = getColorInSize(info, featureId);
    newGallery = gallery.filter(
      (item) => Number(item.feature_Id) === Number(featureId)
    );
    if (newGallery.length > 0) {
      return newGallery;
    }
    const infoWithFeatureId = { ...info, feature_Id: featureId };
    const firstGallery = createFirstGallery(infoWithFeatureId);
    return firstGallery;
  };
  const {
    productFrequent = [],
    specifications,
    avg_Stars,
    productRelated = [],
    details,
  } = info;

  return (
    <>
      <Head>
        <title>{ogfullName}</title>
        <meta name="description" content={ogdescription} />
        <meta property="fb:app_id" content="729577734340382" />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={ogmainImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content={ogfullName} />
        <meta property="og:site_name" content="nailsbeautysupply.com" />
        <meta property="og:description" content={ogdescription} />
        <meta property="og:type" content="article" />
      </Head>
      <main>
      <div className="container bg-white">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => router.push("/")}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Detail</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-md-6 px-media">
            {galleries.length > 0 ? (
              <DetailMedia data={info} galleries={galleries} />
            ) : (
              ""
            )}
          </div>
          <div className="col-md-6">
            <DetailFeature onSelected={setActiveFeature} data={info} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">{/*<DetailComment data={info} />*/}</div>
          <div className="col-md-6">
            {showWishList()}
            {/* <DetailSocial reviews={totalReview} data={info} /> */}
          </div>
        </div>
        {(details || specifications) && (
          <div style={{ minHeight: "200px" }}>
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Description">
                {details.length > 0 ? <div dangerouslySetInnerHTML={{ __html: details }}></div> : <div></div>}
              </Tab>
              <Tab eventKey="profile" title="Specs">
                {specifications.length > 0 ? <div dangerouslySetInnerHTML={{ __html: specifications }}></div> : <div></div>}
              </Tab>
            </Tabs>
          </div>
        )}
        {productRelated.length > 0 && (
          <h4 className="detail__title">Suggestion products for you</h4>
        )}
        {productRelated.length > 0 && <SliderCard rows={productRelated} />}
        {productFrequent.length > 0 && (
          <h4 className="detail__title">{t('Frequently bought together')}</h4>
        )}
        {productFrequent.length > 0 && <FrequentBought data={info} />}
        <div className="row col-reverse">
          <div className="col-md-6">
            <DetailReview data={totalReview} />
          </div>
          <div className="col-md-6">
            <DetailRating rate={avg_Stars} />
          </div>
        </div>
        <div className="detail-feature">
          <h5>{t('Reviews products')}</h5>
        </div>
        <div id="example-collapse-text">
          <div className="comment__field mb-2">
            <DetailComment data={{ id, feature_id: featureId }} />
          </div>
          {comments &&
            comments.length > 0 &&
            comments.map((v, i) => <CardComment key={i} {...v} />)}
        </div>

        {/*<DetailCommentRating data={info} onUpdate={setUpdate} />*/}
        {/*<DetailCommentList comments={comments} />*/}
      </div>
    </main>
    </>
  );
}
