import React from 'react'
//

import { useSelector } from 'react-redux'
//
//
import { useTranslation } from 'next-i18next'
const SidebarHeader = () => {
   const { t } = useTranslation("translation")
   const { user } = useSelector(state => state.user)
   const { name } = user
   return (
      <div className="sidebar-header">
         <div className="sidebar-header__bg-circle">
            <i className="fas fa-user"></i>
         </div>
         <span>{name || `${t("Hello")}`}</span>
      </div>
   )
}

export default SidebarHeader
