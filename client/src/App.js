import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchUserInfo } from 'actions';
import Layout from 'Layout';
import Routes from 'Routes';

class App extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.fetchUserInfo();
    }
  }

  render() {
    return (
      <Layout>
        <Routes />
      </Layout>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(({ auth: { authenticated } }) => { return { authenticated } }, { fetchUserInfo })
);

export default enhance(App);