import { connect } from 'react-redux';

import { TopSellersSelector } from "selectors";
import { FeaturedProducts } from 'components';

function mapStateToProps(state) {
  return {
    title: "Top Sellers",
    gridSize: 3,
    products: TopSellersSelector(state)
  };
}

export default connect(mapStateToProps)(FeaturedProducts);