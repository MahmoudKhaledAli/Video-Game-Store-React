import React from 'react';

import { Review } from 'components'

export default ({ reviews }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <h2>Reviews:</h2>
        <div style={{ paddingLeft: '20px' }}>
          {reviews.map(review => <Review key={review.username} review={review} />)}
        </div>
      </div>
    </div>
  );
}