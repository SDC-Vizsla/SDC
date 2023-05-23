import React, { useState, useEffect } from 'react';
import ReviewsSummary from './ReviewsSummary.jsx';
import ReviewsList from './ReviewsList.jsx';
import sortReviews from '../../lib/sortReviews.js';
import inferTotalPossibleReviews from '../../lib/inferTotalPossibleReviews.js';
import { getPageOfReviews, getReviewsMetaData } from './controllerReviews.js';
const defaultSort = 'relevant';  // relevant is the default sort option

const Reviews = ({ productID, productName }) => {
  const [reviewsMetaData, setReviewsMetaData] = useState(undefined);  // no data to display until it is fetched
  const [reviewsData, setReviewsData] = useState({});
  const [filters, setFilters] = useState([]);  // empty array means no filters will be applied
  const [sortBy, setSortBy] = useState(defaultSort);
  const [reviewsList, setReviewsList] = useState(undefined);  // no data to display until it is fetched
  const [reviewAdded, setReviewAdded] = useState(0);  // track when a review is added, so that new reviews data can be pulled
  const retrieveFreshReviews = () => {
    setReviewAdded(reviewAdded + 1);
  }

  useEffect(() => {
    getReviewsMetaData(productID)
      .then(metaData => {
        setReviewsMetaData(metaData);
        return inferTotalPossibleReviews(metaData);
      })
      .then(totalReviewsCount => getPageOfReviews(productID, 1, totalReviewsCount, defaultSort))
      .then(data => {
        setReviewsData(data);
        setReviewsList(filters.length === 0 ? data.results : data.results.filter(review => filters.includes(review.rating)));
      })
      .catch(err => console.log('there was an error getting the reviews-related data. msg: ', err));
  }, [productID, reviewAdded]);

  const filterClick = (star) => {
    let newFilters = filters;
    if (filters.includes(star)) {
        newFilters = newFilters.filter(option => option !== star);  // remove this star from the filters
    } else {
        newFilters.push(star); // add this star to the filters
    }
    setFilters(newFilters);
    setReviewsList(newFilters.length === 0 ? reviewsData.results : reviewsData.results.filter(review => newFilters.includes(review.rating)));
  };

  const removeFilters = () => {
    setFilters([]);
    setReviewsList(reviewsData.results);
  }

  const sortList = (criteria) => {
    if (criteria !== sortBy) {
        setSortBy(criteria);
        let newReviewsList = sortReviews(reviewsList, criteria);
        setReviewsList(newReviewsList);
    }
  }

  return (
    <div className='ratings-and-reviews'>
      <div className='rr-title'>RATINGS & REVIEWS</div>
      <div className='rr-content'>
        {/*
          prevent rendering until we have data
          otherwise, the subcomponents will cause errors
        */}
        {reviewsMetaData && <ReviewsSummary metaData={ reviewsMetaData } filters={ filters } filterClick={ filterClick } removeFilters={ removeFilters }/>}
        {reviewsList && <ReviewsList reviews={ reviewsList } sortList={ sortList } productID={ productID } productName={ productName } characteristics={ reviewsMetaData && reviewsMetaData.characteristics } retrieveFreshReviews={ retrieveFreshReviews } />}
      </div>
    </div>
  )
};

export default Reviews;