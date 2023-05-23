// determines the number of reviews based on the reviews meta data object
// returns the larger of:
// - total number of ratings
// - total number of recommenders vs. non-recommenders
// for the product

export default function(reviewsMetaData) {
  const ratingsCounts = Object.values(reviewsMetaData.ratings);
  const totalRatingsCount = ratingsCounts.reduce((sum, count) => sum + parseInt(count), 0);
  const totalRecsAndNonRecs = parseInt(reviewsMetaData.recommended.false) + parseInt(reviewsMetaData.recommended.true);
  return (totalRatingsCount > totalRecsAndNonRecs) ? totalRatingsCount : totalRecsAndNonRecs;
}