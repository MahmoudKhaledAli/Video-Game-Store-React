import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import { Jumbotron } from 'components';
import { TopSellers, HighestRated } from 'containers';
import { fetchFeatured } from 'actions'

class Home extends Component {
  componentDidMount() {
    this.props.fetchFeatured();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Video Game Store</title>
        </Helmet>
        <Jumbotron />
        <TopSellers />
        <HighestRated />
      </div>
    );
  }
}

export default connect(null, { fetchFeatured })(Home);