import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { useSelector } from "react-redux";
const FooterCollapse = ({ children, open, setOpen }) => {
  const { isMobile } = useSelector((state) => state.app);
  if (isMobile)
    return (
      <Collapse in={open}>
        <ul className="row footer-list__block">{children}</ul>
      </Collapse>
    );
  return <ul className="row footer-list__block">{children}</ul>;
};
const FooterList = ({ title, children = [] }) => {
  const [open, setOpen] = useState(false);
   const children1 = children.slice(0, Math.floor(children.length/2));
   const children2 = children.slice(Math.floor(children.length/2), children.length);
  return (
    <div className="footer-list">
      <h4 onClick={() => setOpen(!open)} className="footer-list__title">
        {" "}
        {title}
      </h4>
      <div className="footer-list__container">
        <FooterCollapse open={open} setOpen={setOpen}>
          {children1.map((child, i) => (
            <li key={i} className="footer-list__item">
              {child}
            </li>
          ))}
        </FooterCollapse>
        <FooterCollapse open={open} setOpen={setOpen}>
          {children2.map((child, i) => (
            <li key={i+"jhd"} className="footer-list__item">
              {child}
            </li>
          ))}
        </FooterCollapse>
      </div>
    </div>
  );
};

export default FooterList;
