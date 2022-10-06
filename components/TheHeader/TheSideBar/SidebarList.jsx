import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'

const SidebarList = ({ title = "", rows = [], to = "", close }) => {
  const [newRows, setNewRows] = React.useState([rows]);
  const router = useRouter()
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClick = (v) => {
    if (v.name === "Sign Out") {
      dispatch({ type: "user/logout" });
    }
    if (v.slug_Name === "group-sale") {
      return router.push(`/${v.slug_Name}`);
    }
    router.push(`${to}/${v.slug_Name}`);
  };
  if (rows) {
    rows.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  return (
    <div className="sidebar-list">
      {title && <h5 className="sidebar-list__title px-2">{t(title)}</h5>}
      <ul className="sidebar-list__ul">
        {rows.map((v, i) => {
          return (
            <li onClick={close} className="sidebar-list__li" key={i}>
              <a onClick={() => handleClick(v)}>
                <div className="p-2">
                  <span>{t(v.name)}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarList;
