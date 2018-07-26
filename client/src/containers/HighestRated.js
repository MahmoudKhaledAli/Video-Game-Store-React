import { connect } from 'react-redux';

import { HighestRatedSelector } from "selectors";
import { FeaturedProducts } from 'components';

function mapStateToProps(state) {
  return {
    title: "Highest Rated",
    gridSize: 3,
    products: HighestRatedSelector(state)
  };
}

export default connect(mapStateToProps)(FeaturedProducts);