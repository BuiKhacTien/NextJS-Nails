import React from 'react'
import Button from 'react-bootstrap/Button'
import StarsRate from '../../common/StarsRate'
const Index = () => {
   return (
      <div className="order-card-aside border-bottom">
         <div className="order-car-aside__image">
            <img className="w-100" src="https://nailssolutions.blob.core.windows.net/images/20210614_224837_V shape french nail cutter.jpeg" alt="" />
         </div>
         <div className="order-car-aside__content">
            <p className="order-car-aside__text">V Shape Easy French Tip Nail Cutter</p>
            <div className="mb-1">
               <StarsRate type="show" />
            </div>
            <p className="order-car-aside__price">$9</p>
            <Button size="sm" className="border w-100" variant="light">See all buying options</Button>
         </div>
      </div>
   )
}

export default Index
