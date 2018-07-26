import { connect } from 'react-redux';

import { ProductsList } from 'components';

function mapStateToProps({ products }) {
  return { 
    gridSize: 4,
    products
  };
}

export default connect(mapStateToProps)(ProductsList);