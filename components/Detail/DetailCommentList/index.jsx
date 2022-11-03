import React from 'react'
import { DATE_TIME_FORMAT } from '../../../constants/appSetting'
import StarsRate from '../../common/StarsRate'
import moment from 'moment'
const formatDate = (date)=>{
   return moment(date).format(DATE_TIME_FORMAT)
}
const ItemComment = ({ item }) => {
   const { stars, user_Name, content,dateCreate } = item
   return (
      <li>
         <div className="detail-comment__card">
            <div className="d-flex justify-content-between">
               <div className="d-flex align-items-center">
                  <StarsRate rate={stars} />
                  <span className="mx-2">{user_Name}</span>
               </div>
               <div><span>{formatDate(dateCreate)}</span></div>
            </div>
            <div>
               <p style={{ color: 'var(--bs-gray)' }}>{content}</p>
            </div>
         </div>
      </li>
   )
}

const Index = ({ comments = [] }) => {

   return (
      <div className="detail-comment-list">
         <ul>
            {comments.map((v, i) => <ItemComment key={i} item={v} />)}
         </ul>

      </div>
   )
}

export default Index
