import { connect } from 'react-redux';
import { compose } from 'redux';

import { ProductsList } from 'components';

function mapStateToProps({ products }) {
  return { 
    gridSize: 4,
    products
  };
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(ProductsList);