import React from 'react'
import StarsRate from '../../common/StarsRate'
const Index = ({rate}) => {
   return (
      <div className="d-flex">
         <span style={{ fontWeight: 700, marginRight: 10 }} className="pr-2 mb-3">{rate}/<sub>5</sub></span>
         <StarsRate type="review" rate={rate} />
      </div>
   )
}

export default Index
