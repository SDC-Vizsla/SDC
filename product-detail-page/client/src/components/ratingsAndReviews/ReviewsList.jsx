import React, { useState, useEffect } from 'react';
import Review from './Review.jsx';
import AddReview from './AddReview.jsx';

const ReviewsList = ({ reviews, sortList, productID, productName, characteristics, retrieveFreshReviews }) => {
  const [displayCount, setDisplayCount] = useState(2);
  const [addingReview, setAddingReview] = useState(false);
  return (
    <div className='rr-reviews-list' style={{maxHeight: Math.round(document.querySelector('html').clientHeight * .95)}}>
      <div className='rr-review-sorter'>
        { reviews.length } reviews, <label htmlFor='rr-sort-select'>sorted by most</label>
        <select className='rr-selector' onChange={ (e) => sortList(e.target.value) } style={{display: 'inline'}} name='sort-by' id='rr-sort-select'>
          <option value='relevant' defaultValue>relevant</option>
          <option value='helpful'>helpful</option>
          <option value='recent'>recent</option>
        </select>
      </div>
      <div className='rr-reviews-list-all-reviews'>
      {reviews.slice(0, displayCount)
        .map(review => <Review key={ review.review_id } review={ review } />)}
      </div>
      <div className='rr-reviews-list-buttons'>
        {displayCount < reviews.length && <button onClick={ () => setDisplayCount(displayCount + 2)}>MORE REVIEWS</button>}
        <AddReview productID={ productID } productName={ productName } characteristics={ characteristics } retrieveFreshReviews={ retrieveFreshReviews }/>
      </div>
    </div>
  );
};

export default ReviewsList;