import React from 'react';

import { ReviewsList } from 'components';

import 'styles/style.css';

function renderPrice(product) {
  if (product.sale === 0) {
    return <h2>{product.price} EGP</h2>;
  } else {
    return (
      <h2>
        <strike>{product.price} EGP</strike> {product.price * (100 - product.sale) / 100} EGP
        </h2>
    );
  }
}

export default ({ product, reviews, platforms, children }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row div-margin">
        <div className="card mt-4">
        </div>
        <div className="col-lg-6" align="center" style={{ paddingLeft: '110px' }}>
          <h1 className="card-title">{product.name}</h1>
          <br />
          <img className="card-img-top img-fluid img-rounded img-responsive" src={product.imgpath} alt="" width="450" />
        </div>
        <div className="card-body col-lg-6" style={{ paddingLeft: '80px' }} align="left">
          <br /><br /><br /><br /><br />
          {renderPrice(product)}
          <h4>Sale: {product.sale} %</h4>
          <h4>Available stock: {product.stock}</h4>
          <h4>Platform: {platforms[product.platform]}</h4>
          <h4>Average Rating: {product.avg_score}
          </h4>
          {children}
        </div>
      </div >
      <div className="row">
        <div className="col-lg-12">
          <br />
          <h2>Description:</h2>
          <big><p>{product.descripton}</p></big>
        </div>
      </div>
      <ReviewsList reviews={reviews} />
    </div>
  );
}