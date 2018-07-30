import React from 'react';

export default ({ review }) => {
  return (
    <div>
      <b><big>{review.username}</big></b>
      {[...Array(parseInt(review.score, 10))].map((_, i) => <img key={i} src="/star-128.png" height="16" alt="" />)}
      <br />
      <div>
        <big><p>{review.comment}</p></big>
      </div>
    </div>
  );
}