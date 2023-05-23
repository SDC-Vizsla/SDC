import React from 'react';
import Card from './productCard.jsx';
import { useState, useEffect, useRef } from 'react';
import Comparison from './comparison.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const List =  ({setProductInfoData, setChosenStyle, setPickedImg, products, compare, productStyles, focusedItem, updateMain}) => {
  // console.log('productstyles', productStyles)

const [productImages, setProductImages] = useState({});
const [salePrices, setSalePrices] = useState({});
const [viewCounter, setViewCounter] = useState(0);

const containerRef = useRef(null);

const increaseView = () => {
  setViewCounter(viewCounter + 1);
  containerRef.current.scrollLeft += 250;
}

const decreaseView = () => {
  setViewCounter(viewCounter - 1);
  containerRef.current.scrollLeft -= 250;
}

const Internal = true;
// console.log(products);

useEffect(() => {
 let isMounted = true;
 let images = {};
 let sales = {}

 if (isMounted) {
  productStyles.map((product) => {

    let hasDefault = false;
    let onSale = false;

    for (var i = 0; i < product.results.length; i++) {
      let currentProduct = product.results[i];


      if (currentProduct.sale_price) {
        if (sales[product.product_id] > currentProduct.sale_price || !sales[product.product_id]) {
          sales[product.product_id] = currentProduct.sale_price;
        }
      }

      if (currentProduct['default?']) {
        hasDefault = true;
        images[product.product_id] = currentProduct.photos;
      }
    }

    if (!hasDefault) {
      images[product.product_id] = product.results[0].photos;

    }
  })
 };
 setProductImages(images);
 setSalePrices(sales);

 return () => {
  isMounted = false;
 };
}, [productStyles])


return (
  <div id="related-items">
  <div >
    <h4>Related Items</h4>
    <div
      className="related-container-list"
      ref={containerRef}
      style={{ overflowX: 'scroll' }}>
      {products.map((product) => {
        if (product) {
          let images = productImages[product.id];
          let salePrice = salePrices[product.id];
          return (
            <Card
              setProductInfoData={setProductInfoData}
              setChosenStyle={setChosenStyle}
              setPickedImg={setPickedImg}
              key={product.id}
              images={images}
              salePrice={salePrice}
              product={product}
              compare={compare}
              focusedItem={focusedItem}
              Internal={Internal}
              updateMain={updateMain}
            />
          );
        }
      })}
    </div>
  </div>
     {viewCounter > 0 ? (
      <FontAwesomeIcon icon={faChevronLeft} className="left-button" onClick={decreaseView}/>
    ) : null}
    {viewCounter < products.length ? (
      <FontAwesomeIcon icon={faChevronRight} className="right-button" onClick={increaseView}/>
    ) : null}
    </div>
);

    };

export default List;

