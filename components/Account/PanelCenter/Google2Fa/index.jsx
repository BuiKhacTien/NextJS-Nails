import React from 'react'
import Link from "next/link"

const Index = () => {
   return (
      <div className="google-2fa">
         <div className="ct-item">
            <div className="icon"><i className="fab fa-google-plus"></i></div>
            <div>
               <h4>Google Authentication</h4>
               <div><p>Used for withdrawals and security modifications.</p></div>
            </div>
         </div>
         <div className="link">
            <Link className="btn btn-light" href="/setting">Enable</Link>
         </div>
      </div>
   )
}

export default Index
