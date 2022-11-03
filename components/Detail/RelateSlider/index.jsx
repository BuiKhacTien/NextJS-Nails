import React from 'react'
import Flickity from 'react-flickity-component'
import "./styles/styles.css";

const Index = () => {
   const flickityOptions = {
      // initialIndex: 1,
      groupCells: true,
      pageDots: false,
      prevNextButtons: false
   }
   return (
      <div>
         <Flickity
            className={'carousel-frequent'} // default ''
            elementType={'div'} // default 'div'
            options={flickityOptions} // takes flickity options {}
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            static // default false
         >
            <div className="carousel-frequent__cell">
               <img src="https://picsum.photos/seed/picsum/400/300" />
            </div>
            <div className="carousel-frequent__cell">
               <img src="https://picsum.photos/seed/picsum/400/300" />
            </div>
            <div className="carousel-frequent__cell">
               <img src="https://picsum.photos/seed/picsum/400/300" />
            </div>
         </Flickity>
      </div>
   )
}

export default Index
