import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import appApi from "../../api/appApi";
import productApi from "../../api/productApi";
import FooterActions from "./FooterActions";
import FooterContact from "./FooterContact";
import FooterList from "./FooterList";
import FooterTop from "./FooterTop";
import { useTranslation } from 'react-i18next'



const Index = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState([]);
  const [company, setCompany] = useState([]);
  const [shippingReturn, setShippingReturn] = useState([]);
  const [contacts, setContacts] = useState([]);
  const { menu } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    getResource();
    getCategories();
    getCompany();
    getShippingReturn();
    getContacts();
  }, []);
  const getResource = () => {
    appApi.resource().then((res) => {
      if (res) {
        setResources(res);
      }
    });
  };
  const getCompany = () => {
    appApi.company().then((res) => {
      if (res) {
        setCompany(res);
      }
    });
  };
  const getShippingReturn = () => {
    appApi.shippingReturn().then((res) => {
      if (res) {
        setShippingReturn(res);
      }
    });
  };
  const getContacts = () => {
    appApi.contactUs().then((res) => {
      if (res) {
        setContacts(res);
      }
    });
  };
  const getCategories = () => {
    if (menu.length > 0) return;
    productApi.catalog().then((res) => {
      if (res) {
        // catalog list categories
        dispatch({ type: "app/setMenu", payload: res });
      }
    });
  };
  const handleShowMessage = () => {
    var myTarget = document.querySelector("#home");
    var fb = document.querySelector("#fb-root");
    fb.style.display = "none";
    window.addEventListener("scroll", function () {
      if (!myTarget || !myTarget.offsetTop) return;
      if (
        window.scrollY + window.innerHeight >=
        myTarget.clientHeight + myTarget.offsetTop
      ) {
        fb.style.display = "block";
      }
    });
  };
  return (
    <footer className="footer__wrapper">
      <div className="">
        <FooterTop />
        <div className="container footer__bottom__wrapper">
          <div className="row">
            <div className="col-md-6">
              <FooterList title={t("Shop by Category")}>
                {menu.map((v, i) => (
                  <Link key={i} href={`/category/${v.slug_Name.replace('/', '').replace('%', '')}`}>
                    {v.name}
                  </Link>
                ))}
              </FooterList>
            </div>
            {/* <div className="d-none d-md-block col-md-2">
                     <FooterList title="Thông tin công ty">
                        {company.map((v, i) => (
                           <Link key={i} to={`/category/${v.slug_Name}`}>
                              {v.title}
                           </Link>
                        ))}
                     </FooterList>
                     <FooterList title="Tài khoản của tôi">
                        <Link to="/register-login/form1">Đăng nhập</Link>
                        <Link to="/register-login/form1">Tạo tài khoản</Link>
                     </FooterList>
                  </div>
                  <div className="d-none d-md-block col-md-2">
                     <FooterList title="Liên hệ">
                        {contacts.map((v, i) => (
                           <Link key={i} to={`/category/${v.slug_Name}`}>
                              {v.title}
                           </Link>
                        ))}
                     </FooterList>
                     <FooterList title="Liên kết hữu ích">
                        {resources.map((v, i) => (
                           <Link key={i} to={`/category/${v.slug_Name}`}>
                              {v.name}
                           </Link>
                        ))}
                     </FooterList>
                  </div>
                  <div className="d-none d-md-block col-md-2">
                     <FooterList title="Vận chuyển - trả về">
                        {shippingReturn.map((v, i) => (
                           <Link key={i} to={`/category/${v.slug_Name}`}>
                              {v.title}
                           </Link>
                        ))}
                     </FooterList>
                  </div> */}
            <div className="col-md-6">
              <div className="d-block d-md-none footer__contact mb-4">
                <FooterContact />
              </div>
              <div className="box-call box-item-footer">
                {/*
                <h3 className="title-menu mb05">Call us</h3>
									<p>
                  <a href="tel:210.607.8888">210.607.8888</a> /{" "}
                  <a href="tel:1.424.777.6868">1.424.777.6868</a>
                </p>
								*/}
              </div>
              <FooterActions />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Index;
