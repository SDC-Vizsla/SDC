import React from 'react';
import Card from './productCard.jsx';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const Outfit = ({ userProducts, productStyles, filterUserProducts }) => {

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

  const Internal = false;

  return (
    <div>
      <h4>Your Outfit</h4>
      <div
        className="related-container-list"
        ref={containerRef}
        style={{ overflowX: 'scroll' }}
      >
        { userProducts.length > 0 ? userProducts.map((product) => {
          if (product) {
            let images = productImages[product.id];
            let salePrice = salePrices[product.id];
            return (
              <Card
                key={product.id}
                images={images}
                salePrice={salePrice}
                product={product}
                Internal={Internal}
                filterUserProducts={filterUserProducts}
              />
            )
          }
        }) : <h4>Add a product...</h4> }
      </div>
      {viewCounter > 0 ? (
      <FontAwesomeIcon icon={faChevronLeft} className="left-button" onClick={decreaseView}/>
    ) : null}
    {viewCounter < userProducts.length ? (
      <FontAwesomeIcon icon={faChevronRight} className="right-button" onClick={increaseView}/>
    ) : null}
    </div>
  );
}

export default Outfit;

