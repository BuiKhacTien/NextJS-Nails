import React, { useEffect, useState } from 'react'

const Index = ({ children, open, setOpen, anchor = "left" }) => {
   const [style, addStyle] = useState({ display: 'none' })
   const handleOpen = () => {
      setOpen(!open)

   }
   const handleAnimation = () => {
      if (!open) {
         setTimeout(() => {
            addStyle({ display: 'none' })
         }, 300);
      } else {
         addStyle({})
      }
   }
   useEffect(() => {
      handleAnimation()
   }, [open])
   return (
      <div style={{ ...style }} className={open ? "sidebar open" : "sidebar"}>
         <div onClick={handleOpen} className="overlay"></div>
         <div className={`sidebar__block ${anchor}`}>
            {children}
         </div>
      </div>
   )
}

export default Index
