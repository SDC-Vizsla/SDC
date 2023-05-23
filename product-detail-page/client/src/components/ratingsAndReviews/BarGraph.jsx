import React from 'react';

const BarGraph = ({ star, ratings, filterClick }) => {
  const totalNumOfRatings = Object.values(ratings).reduce((sum, countForEachStar) => sum + parseInt(countForEachStar), 0);
  const countForStar = ratings[star] || 0; // get the count for this star; if it doesn't exist, assume it is 0
  const ratioToDisplay = parseInt(countForStar) / totalNumOfRatings;
  const positivePercentageString = Math.round(ratioToDisplay*100) + '%';
  const negativePercentageString = Math.round((1 - ratioToDisplay)*100) + '%';
  return (
    <div onClick={() => filterClick(star)} className='rr-star-bar'>
      <div className='rr-bar-graph-text'>{star} star{star > 1 && 's'}</div>
      <div className='rr-bar-graph-100'>
        <div className='rr-bar-graph-positive' style={{width: positivePercentageString}}></div>
        <div className='rr-bar-graph-negative' style={{width: negativePercentageString}}></div>
      </div>
    </div>
  );
};

export default BarGraph;