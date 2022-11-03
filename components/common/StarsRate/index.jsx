import React from 'react'
const Index = ({ rate = 0, change, theme = "light", size = 'md', type = "comment", name = "star" }) => {
   const handleRateChange = (e) => {
      if (change) change(e.target.value)
   }
   const StarsRateComment = () => {
      return (
         <div className={`stars ${size} ${type} ${theme}`}>
            <div onChange={handleRateChange}>
               <input value={1} className="star star-1" id={`${name}-1`} type="radio" name="star" />
               <label className="star star-1" htmlFor={`${name}-1`}><i className={`${rate >= 1 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={2} className="star star-2" id={`${name}-2`} type="radio" name="star" />
               <label className="star star-2" htmlFor={`${name}-2`}><i className={`${rate >= 2 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={3} className="star star-3" id={`${name}-3`} type="radio" name="star" />
               <label className="star star-3" htmlFor={`${name}-3`}><i className={`${rate >= 3 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={4} className="star star-4" id={`${name}-4`} type="radio" name="star" />
               <label className="star star-4" htmlFor={`${name}-4`}><i className={`${rate >= 4 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={5} className="star star-5" id={`${name}-5`} type="radio" name="star" />
               <label className="star star-5" htmlFor={`${name}-5`}><i className={`${rate >= 5 ? 'active' : ''} fas fa-star`}></i></label>
            </div>
         </div>
      )
   }
   const StarsRateReview = () => {
      return (
         <div className={`stars ${size} ${type} ${theme}`}>
            <div onChange={handleRateChange}>
               <input value={1} className="star star-1" id={`${name}-1`} type="radio" name="star" />
               <label className="star star-1" htmlFor={`${name}-1`}><i className={`${rate >= 1 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={2} className="star star-2" id={`${name}-2`} type="radio" name="star" />
               <label className="star star-2" htmlFor={`${name}-2`}><i className={`${rate >= 2 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={3} className="star star-3" id={`${name}-3`} type="radio" name="star" />
               <label className="star star-3" htmlFor={`${name}-3`}><i className={`${rate >= 3 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={4} className="star star-4" id={`${name}-4`} type="radio" name="star" />
               <label className="star star-4" htmlFor={`${name}-4`}><i className={`${rate >= 4 ? 'active' : ''} fas fa-star`}></i></label>
               <input value={5} className="star star-5" id={`${name}-5`} type="radio" name="star" />
               <label className="star star-5" htmlFor={`${name}-5`}><i className={`${rate >= 5 ? 'active' : ''} fas fa-star`}></i></label>
            </div>
         </div>
      )
   }
   if (type === "review") return <StarsRateReview />
   return <StarsRateComment />
}

export default Index
