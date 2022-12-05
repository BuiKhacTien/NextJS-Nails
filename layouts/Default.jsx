import React, { useLayoutEffect, useState, useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";

import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import SCROLL from "../assets/images/scroll.svg";
import Image from 'next/image';
import { ToastContainer } from "react-toastify";

const Default = ({ children }) => {
  const { openCartMini } = useSelector(state => state.app)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const dispatch = useDispatch()
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    dispatch({ type: "app/setMobile", payload: window.innerWidth})
  }

  
  return (
    <div className="layout_default">
      <TheHeader />
      <main>{children}</main>
      <TheFooter />
      <div style={{ display: openCartMini ? 'none' : '' }} onClick={scrollToTop} className="scroll-top">
        <Image src={SCROLL} alt="scroll" width={50} height={50}/>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Default;

