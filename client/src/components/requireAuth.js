import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (redirect = true) => WrappedComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (!this.props.auth && redirect) {
        this.props.history.push('/');
      }
    }
    render() {
      return this.props.auth ? <WrappedComponent {...this.props} /> : null;
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }
  return withRouter(connect(mapStateToProps)(ComposedComponent));
};
