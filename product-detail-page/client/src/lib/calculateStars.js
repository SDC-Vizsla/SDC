// calculates and returns the average number of stars for a product, rounded to n decimal places

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

export default function(data, decimalPlaces) {
  const ratings = data.ratings;
  let totalCount = 0;
  let totalStars = 0;
  for (let starKey in ratings) {
    let count = parseInt(ratings[starKey]);
    totalCount += count;
    totalStars += parseInt(starKey) * count;
  }
  return Number.parseFloat(totalStars / totalCount).toFixed(decimalPlaces); // return average to one decimal place
}
