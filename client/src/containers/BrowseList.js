import { connect } from 'react-redux';
import { compose } from 'redux';

import { ProductsList } from 'components';
import { SearchResultsSelector } from 'selectors';

function mapStateToProps(state) {
  return { 
    gridSize: 4,
    products: SearchResultsSelector(state)
  };
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(ProductsList);