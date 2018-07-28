import React from 'react';

export default ({ item: { name, quantity } }) => {
  return (
    <div>
      {name} x{quantity}<br />
    </div>
  );
}