import React from 'react';

export default ({ review }) => {
  return (
    <div>
      <b><big>{review.username}</big></b>
      {[...Array(review.score)].map((e, i) => <img key={i} src="/star-128.png" height="16" alt="" />)}
      <br />
      <div>
        <big><p>{review.comment}</p></big>
      </div>
    </div>
  );
}