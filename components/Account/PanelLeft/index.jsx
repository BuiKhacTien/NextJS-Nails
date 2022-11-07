import React, { useState } from "react";
import Link from "next/link"
import { useSelector } from "react-redux";
import NO_AVATAR from '../../../assets/images/no-avatar.svg'
import { BASE_IMG } from "../../../constants/appSetting";
import { useTranslation } from "react-i18next";
import  Cookie from 'js-cookie'
import { useRouter } from "next/router";

const links = [
  {
    name: "Profile",
    to: "account",
  },
  {
    name: "Shipping Address",
    to: "address",
  },
  {
    name: "My Orders",
    to: "your-order",
  },
  {
    name: "Reward",
    to: "reward",
  },
  {
    name: "Payment Method",
    to: "payment",
  },
  {
    name: "Communication Preference",
    to: "communication-preferences",
  },
];
function NavItem({ name, to }) {
  const {t} = useTranslation()
  const router = useRouter();
  const pathname = router.pathname;
  const [title,setTitle] = useState("")
  const checkActive = (pathname) => {
    return pathname === `my-account/${to}`;
  };
  const isActive = checkActive(pathname);
  const checkCookies =Cookie.get('i18next');
  React.useEffect(()=>{
    if(checkCookies){
      return setTitle(`${t(name)}`)
    }
  },[checkCookies])
  return (
    <li className={`aside-account-header__item ${isActive ? "active" : ""}`}>
      <Link href={to}>{title}</Link>
    </li>
  );
}
const Index = () => {
  const {t} = useTranslation()
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const { name } = user;
  const avatar = user.icon ? BASE_IMG + user.icon : NO_AVATAR
  return (
    <aside>
      <div className="aside-account-header">
        <div>
          <img
            src={avatar}
            alt="avatar"
          />
        </div>
        <div className="aside-account-header__user">
          <p className="aside-account-header__user__name">{t("Hello")} {name}</p>
          <p
            onClick={() => router.push("/my-account/account")}
            className="aside-account-header__user__text"
          >
            {t('Edit Profile')}
          </p>
        </div>
      </div>
      <ul className="aside-account-header__list">
        {links.map((v, k) => (
          <NavItem key={k} {...v} />
        ))}
      </ul>
    </aside>
  );
};

export default Index;