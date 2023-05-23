// calculates and returns the percentage of recommenders for a product, rounded to 0 decimal points

// INPUT - Reviews Meta Data API response: e.g.,
  // GET /reviews/meta?product_id={integer id value}
  // const reviewsMetaData = {
  //   "product_id": "37312",
  //   "ratings": {
  //       "1": "16",
  //       "2": "13",
  //       "3": "7",
  //       "4": "3",
  //       "5": "10"
  //   },
  //   "recommended": {
  //       "false": "5",
  //       "true": "44"
  //   },
  //   "characteristics": {
  //       "Quality": {
  //           "id": 125035,
  //           "value": "3.1428571428571429"
  //       }
  //   }
  // }

export default function(data) {
  if (Object.keys(data).length !== 0) {
    // console.log(data);
    const nonRecommendersCount = parseInt(data.recommended.false);
    const recommendersCount = parseInt(data.recommended.true);
    const percentage = 100 * (recommendersCount / (nonRecommendersCount + recommendersCount));
    return Math.round(percentage);
  } else {
    return undefined;
  }
}