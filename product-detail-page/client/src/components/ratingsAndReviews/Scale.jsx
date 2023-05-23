import React from 'react';

const Scale = ({ name, value, lowLabel, highLabel }) => {
  const percentShift = Math.round((value / 5)*100).toString().concat('%');
  return (
    <div className='rr-scale'>
      <div className='rr-scale-characteristic'>{ name }</div>
      <div className='rr-scale-bars-and-slider'>
        <div className='rr-scale-slider-position' style={{left: percentShift}}>
          <div className='rr-scale-slider'></div>
        </div>
        <div className='rr-scale-bar-container'>
          <div className='rr-scale-bar'></div>
          <div className='rr-scale-bar'></div>
          <div className='rr-scale-bar'></div>
        </div>
      </div>
      <div className='rr-scale-label-container'>
        <div className='rr-scale-label-low'>{ lowLabel } </div>
        <div className='rr-scale-label-high'>{ highLabel }</div>
      </div>
    </div>
  );
};

export default Scale;