import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import appApi from "../../../api/appApi";
import cartApi from "../../../api/cartApi";
import { showSuccess, onShare } from "../../../utils/app";
//
import Cookies from "js-cookie"
//
//

const Index = ({ reviews, data }) => {
  const { id, feature_Id } = data;
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const addWishList = () => {
    cartApi
      .addWishList(id, feature_Id)
      .then((res) => {
        showSuccess("Add wish list success");
        getNumWishList();
      })
      .catch((e) => {
        if (e.status && e.status === "NOT_LOGIN") {
          router.push("/login-register");
        }
      });
  };
  const showWishList=()=>{
    const currentLanguageCode = Cookies.get('i18next')==="en";
    return currentLanguageCode;
 }
  const getNumWishList = () => {
    appApi.numWishList().then((res) => {
      if (res) {
        dispatch({ type: "app/numWishList", payload: res.result });
      }
    });
  };
  return (
    <div className="detail__share-point">
      <p className="detail__title-social">Share it</p>
      <ul className="detail__list-icon-share">
        <li className="detail__item-icon-share icon-face" >
          <a href="#" onClick={() => onShare(`details/${id}/${feature_Id}`)}>
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        {/* <li className="detail__item-icon-share icon-instagram">
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </li> */}
        {showWishList() ? 
        (<li className="detail__item-icon-share icon-heart">
          <a onClick={addWishList}>
            <i className="fas fa-heart "></i>
            <span>{t('Add To Wishlist')}</span>
          </a>
        </li>)
        : null
        }
      </ul>
      {/* <div className="detail-total-review text-center">
        <p className="detail__title-social">{reviews.total} Reivews</p>
        <span>See reviews</span>
      </div> */}
    </div>
  );
};

export default Index;
