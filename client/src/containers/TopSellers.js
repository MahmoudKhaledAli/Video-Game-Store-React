import { connect } from 'react-redux';
import { compose } from 'redux';

import { TopSellersSelector } from "selectors";
import { FeaturedProducts } from 'components';

function mapStateToProps(state) {
  return {
    title: "Top Sellers",
    gridSize: 3,
    products: TopSellersSelector(state)
  };
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(FeaturedProducts);