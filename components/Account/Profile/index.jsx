import React from 'react'
import PanelCenter from '../PanelCenter'
import PanelRight from '../PanelRight'
const Index = () => {
   return (
      <div>
         <div className="row">
            <div className="col-md-8">
               <PanelCenter />
            </div>
            <div className="col-md-4">
               <PanelRight />
            </div>
         </div>
      </div>
   )
}

export default Index
