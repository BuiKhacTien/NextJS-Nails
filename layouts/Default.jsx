import React from "react";
import { useSelector } from "react-redux";

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
