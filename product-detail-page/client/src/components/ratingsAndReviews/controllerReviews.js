const axios = require('axios');

module.exports = {
  getPageOfReviews: (productID = 37311, page, count, sort = 'relevant') => {
    // check inputs before making the request
    if (page && (typeof page !== 'number' || typeof parseInt(page) !== 'number')) page = 1;
    if (count && (typeof count !== 'number' || typeof parseInt(count) !== 'number')) count = 5;
    if (sort !== 'relevant' && sort !== 'helpful' && sort !== 'recent') sort = 'relevant';

    return axios.get('http://localhost:3000/reviews', {
      params: {
        'product_id': productID,
        'page': page,
        'count': count,
        'sort': sort
      }
    })
    .then((reviews) => {
      return reviews.data;
    })
    .catch((err) => {
      return err;
    })
  },

  getReviewsMetaData: (productID = 37311) => {
    return axios.get('http://localhost:3000/reviews/meta', {
      params: {
        'product_id': productID,
      }
    })
    .then((reviewsMeta) => {
      return reviewsMeta.data;
    })
    .catch((err) => {
      return err;
    })
  },

  updateReview: (reviewID, update) => {
    if (typeof reviewID !== 'number' || typeof parseInt(reviewID) !== 'number') {
      console.log("you need to provide a review id to be able to mark it as helpful");
      return undefined;
    }
    return axios.put(`http://localhost:3000/reviews/${update}`,
        {'review_id': reviewID}
      );
  },

  submitReview: (newReviewData) => {
    return axios.post('http://localhost:3000/reviews', newReviewData)
      .then(res => console.log('status for post: ', res))
      .catch(err => console.log("there was an error posting the review"));
  }
};