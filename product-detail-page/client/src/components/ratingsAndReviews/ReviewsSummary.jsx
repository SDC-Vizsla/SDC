import React from 'react';
import BarGraph from './BarGraph.jsx';
import StarBar from './StarBar.jsx';
import Scale from './Scale.jsx';
import calculateStars from '../../lib/calculateStars.js';
import calculatePercentage from '../../lib/calculatePercentage.js';
import makeFilterMessage from '../../lib/makeFilterMessage.js';

const possibleCharacteristics = [
  {name: 'Size', lowLabel: 'too small', highLabel: 'too big'},
  {name: 'Width', lowLabel: 'too narrow', highLabel: 'too wide'},
  {name: 'Length', lowLabel: 'too short', highLabel: 'too long'},
  {name: 'Comfort', lowLabel: 'poor', highLabel: 'great'},
  {name: 'Quality', lowLabel: 'poor', highLabel: 'great'},
  {name: 'Fit', lowLabel: 'poor', highLabel: 'great'}
];

const ReviewsSummary = ({ metaData, filters, filterClick, removeFilters }) => {
  const characteristics = possibleCharacteristics.filter(c => metaData.characteristics[c.name]);
  return (
    <div className='rr-summary'>
      <div className='rr-summary-rollup'>
        <div className='rr-number-of-stars'>{ calculateStars(metaData, 1) }</div>
        <StarBar rating={ calculateStars(metaData, 2) } />
      </div>
      <div className='rr-filter-list'>
        {filters.length > 0 &&
        (<div className='rr-filter-message-container'>
          <div className='rr-filter-message'>Filtering for {makeFilterMessage(filters)} reviews</div>
          <div className='rr-remove-filters-link' onClick={ removeFilters }>remove filters</div>
        </div>)
        }
        <BarGraph filterClick={ filterClick } star={ 5 } ratings={ metaData.ratings }/>
        <BarGraph filterClick={ filterClick } star={ 4 } ratings={ metaData.ratings }/>
        <BarGraph filterClick={ filterClick } star={ 3 } ratings={ metaData.ratings }/>
        <BarGraph filterClick={ filterClick } star={ 2 } ratings={ metaData.ratings }/>
        <BarGraph filterClick={ filterClick } star={ 1 } ratings={ metaData.ratings }/>
      </div>
      <div className='rr-percentage-recommended'>{calculatePercentage(metaData)}% of reviews recommend this product</div>
      {characteristics.map(c => {
        return <Scale key={metaData.characteristics[c.name].id} name={c.name} value={metaData.characteristics[c.name].value} lowLabel={c.lowLabel} highLabel={c.highLabel} />
      })}
    </div>
  )
};

export default ReviewsSummary;