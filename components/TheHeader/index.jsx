import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LOGO from "../../assets/images/logo.png";
import Image from "next/image";

import TheSideBar from "./TheSideBar";
import TheSideBarCart from "./TheSideBarCart";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi";
import { CATEGORIES } from "../../constants/constants";
import appApi from "../../api/appApi";
import { useTranslation, Trans } from 'next-i18next'
import { ButtonChange } from "./ButtonChange/ButtonChange";
const Index = () => {
  const { t } = useTranslation();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [text, setText] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const { isLogin, user, needUpdate } = useSelector((state) => state.user);
  const { numWishList } = useSelector((state) => state.app);
  const { cart } = useSelector((state) => state.cart);
  const { productCartModels = [] } = cart;
  const cartNum = productCartModels ? productCartModels.length : 0;
  const dispatch = useDispatch();
  const router = useRouter();
  const onOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch({ type: "user/login", payload: accessToken });
    }
  },[]);
  useEffect(() => {
    userApi.info().then((res) => {
      if (res) {
        dispatch({ type: "user/setProfile", payload: res });
        dispatch({ type: "user/update", payload: false });
      }
    });
  }, [])

  const searchString = new URLSearchParams(router.asPath).get("searchString");
  useEffect(() => {
    setText(searchString || "");
  }, [searchString]);

  useEffect(() => {
    if (!isLogin) return;
    if (needUpdate) {
      userApi.info().then((res) => {
        if (res) {
          dispatch({ type: "user/setProfile", payload: res });
          dispatch({ type: "user/update", payload: false });
        }
      });
    }
  }, [needUpdate]);
  useEffect(() => {
    if (isLogin) getNumWishList();
  }, [isLogin]);
  const onLogout = () => {
    dispatch({ type: "user/logout" });
    router.push("/");
  };
  const getNumWishList = () => {
    appApi.numWishList().then((res) => {
      if (res) {
        dispatch({ type: "app/numWishList", payload: res.result });
      }
    });
  };
  const searchCatalog = (e) => {
    e.preventDefault();
    router.push(
      `/catalogsearch?category_id=null&searchString=${text}&pageIndex=1&pageSize=200`
    );
  };
  const { screenWidth } = useSelector((state) => state.app);
  return (
    <header>
      <div className="header__wrapper">
        <div className="container p-0 p-md-2 d-md-flex">
          <div className="header-actions__block">
            <div className="header-actions__group">
              <div onClick={onOpenSidebar} className="header-mobile__btn">
                <i className="fal fa-bars"></i>
              </div>
              <div className="header-actions__logo">
                <Link href="/">
                  <Image
                    layout="intrinsic"
                    src={LOGO}
                    alt="logo"
                    width={256}
                    height={44}
                  />
                </Link>
              </div>
              <div className="header-actions__mobile">
                <div style={{ display: "flex" }}>
                  <Link
                    href={isLogin ? "/my-account/account" : "/login-register"}
                    className="header__link_padding header-actions__user-link"
                  >
                    <i className="fas fa-user icon_user"></i>
                  </Link>
                  <Link
                    href="/cart"
                    className="header__link_padding header-actions__user-link"
                  >
                    <a>
                      <i className="fas fa-shopping-cart shopping_cart"></i>
                      {cartNum > 0 && (
                        <span className="cart__num">{cartNum}</span>
                      )}
                    </a>
                  </Link>
                </div>
                {/* button change lang */}
                <div className="header__link_languages header-actions__user-link">
                  <ButtonChange />
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={searchCatalog} className="w-100">
            <InputGroup size="lg" className="header-actions__search">
              {/* <Form.Select value={categories} onChange={e => setCategories(e.target.value)} className="header__departments" aria-label="Default select example">
                           {CATEGORIES.map((v, i) => <option key={i} value={v.value}>{v.label}</option>)}
                        </Form.Select> */}
              <FormControl
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`${t("Search")} ...`}
              />
              <Button type="submit" variant="light">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </form>
          <div className="header-actions__user">
            {isLogin ? (
              <>
                <DropdownButton
                  className="header__user"
                  id="header__user"
                  title={`${t("Hi")}, ${user.lastName || ""}`}
                >
                  <Dropdown.Item>
                    <Link
                      className="header__user__link"
                      href="/my-account/account"
                    >
                      {t("My Account")}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      className="header__user__link"
                      href="/my-account/your-order"
                    >
                      {t("your orders")}
                    </Link>
                  </Dropdown.Item>
                  {/* <Dropdown.Item>
                    <Link className="header__user__link" href="/setting">
                      Setting
                    </Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item>
                    <a onClick={onLogout} className="header__user__link">
                      {t("Logout")}
                    </a>
                  </Dropdown.Item>
                </DropdownButton>
                <Link href="/my-account/wish-list">
                  <a className="header__link header-actions__user-link">
                    {t("Wish List")} ({numWishList})
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login-register">
                  <a className="header__link header-actions__user-link">
                    {t("Login")}
                  </a>
                </Link>
                <Link href="/login-register">
                  <a className="header__link header-actions__user-link">
                    {t("Register")}
                  </a>
                </Link>
              </>
            )}

            <Link
              href="/cart"
              className="header__link header-actions__user-link"
            >
              <i className="fas fa-shopping-cart shopping_cart"></i>
            </Link>
            <ButtonChange />
          </div>
        </div>
        <div className="container">
          <div className="header-category__block">
            <ul>
              {/* <li className="header-category__item">
                <a className="header__link header-category__link">
                  {t("Free ship on order over")} $99.99
                </a>
              </li> */}
              <li className="header-category__item">
                <Link href="/deals-center/Deals-of-Day">
                  <a className="header__link header-category__link">
                    {t("Deal of the day")}
                  </a>
                </Link>
              </li>
              <li className="header-category__item">
                <Link href="/deals-center/Best-Seller">
                  <a className="header__link header-category__link">
                    {t("Best sellers")}
                  </a>
                </Link>
              </li>
              <li className="header-category__item">
                <Link href="/deals-center/TRENDING">
                  <a className="header__link header-category__link">
                    {t("Trending")}
                  </a>
                </Link>
              </li>
              <li className="header-category__item">
                <Link href="/deals-center/Group-Sale">
                  <a className="header__link header-category__link">
                    {t("Group Sale")}
                  </a>
                </Link>
              </li>
              {/* <li className="header-category__item">
                <a
                  href="http://merchantpossolutions.com/"
                  target="_blank"
                  className="header__link header-category__link"
                >
                  {t('Point of sale')}
                </a>
              </li>
              <li className="header-category__item">
                <a
                  href="http://merchantpossolutions.com/"
                  target="_blank"
                  className="header__link header-category__link"
                >
                  {t('Merchant services')}
                </a>
              </li> */}
              {/* <li className="header-category__item">
                <a className="header__link header-category__link">
                  {t("Free ship on order over")} $99.99
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <TheSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <TheSideBarCart open={openSidebar} setOpen={setOpenSidebar} />
    </header>
  );
};

export default Index;
