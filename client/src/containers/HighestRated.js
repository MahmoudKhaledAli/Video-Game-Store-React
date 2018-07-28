import { connect } from 'react-redux';
import { compose } from 'redux';

import { HighestRatedSelector } from "selectors";
import { FeaturedProducts } from 'components';

function mapStateToProps(state) {
  return {
    title: "Highest Rated",
    gridSize: 3,
    products: HighestRatedSelector(state)
  };
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(FeaturedProducts);