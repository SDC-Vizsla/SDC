import React, { useState } from 'react';
import StarBar from './StarBar.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import { updateReview } from './controllerReviews.js';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
const maxCollapsedChars = 250;
const maxTitleChars = 60;

const Review = ({ review }) => {
  const [collapsed, setCollapsed] = useState(review.body.length > maxCollapsedChars);
  const shortSummary = (review.summary.length <= maxTitleChars) ? review.summary : review.summary.slice(0, review.summary.indexOf(' ', maxTitleChars)) + '...';
  const restOfSummary = (review.summary.length <= maxTitleChars) ? null : '...' + review.summary.slice(review.summary.indexOf(' ', maxTitleChars));
  const sortedPhotos = review.photos.sort((a, b) => a.id < b.id);
  const [markedHelpfulAdd, setMarkedHelpfulAdd] = useState(0);
  const [reported, setReported] = useState(false);

  const markHelpful = () => {
    if (markedHelpfulAdd === 0) {
      setMarkedHelpfulAdd(1);
      updateReview(review.review_id, 'helpful');
    }
  }

  const report = () => {
    if (!reported) {
      setReported(true);
      updateReview(review.review_id, 'report');
    }
  }

  return (
    <>
    { !reported &&
    <div className='rr-review'>
      <div className='rr-review-header'>
        <StarBar rating={ Number.parseFloat(review.rating).toFixed(2) } />
        <div className='rr-review-user-date'> {review.reviewer_name}, {format(new Date(review.date), 'MMMM d, y')} </div>
      </div>
      <div className='rr-review-summary'>{ shortSummary }</div>
      <div className='rr-review-body'>
        { restOfSummary && <p>{ restOfSummary }</p> }
        <p>{ collapsed ? review.body.slice(0, review.body.indexOf(' ', maxCollapsedChars)) : review.body }</p>
        { review.body.length > maxCollapsedChars &&
        <button className='rr-review-show-more' onClick={ () => setCollapsed(!collapsed) }>
          { collapsed ? 'SHOW MORE' : 'SHOW LESS' }
        </button> }
      </div>
      { review.recommend && <div className='rr-review-recommended'><FontAwesomeIcon icon={ icon({name: 'check', style: 'solid'}) } /> I recommend this product.</div> }
      { review.photos.length > 0 && <ReviewPhotos photos={ sortedPhotos } /> }
      { review.response && <div className='rr-review-seller-response'><p className='rr-review-seller-response-title'>Seller response:</p><p>{ review.response }</p></div> }
      <div className='rr-mark-helpful'>
        {'Helpful? '}
        <span className='rr-mark-helpful-link' onClick={ markHelpful }>Yes ({ Number.parseInt(review.helpfulness) + markedHelpfulAdd })</span>
        {' | '}
        <span className='rr-mark-helpful-link' onClick={ report }>Report</span>
      </div>
      <hr />
    </div> }
    </>
  );
};

export default Review;