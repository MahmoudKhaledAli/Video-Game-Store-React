import React, { Component } from 'react';

import SweetAlert from 'react-bootstrap-sweetalert';

export default ({ title, successMsg }) => WrappedComponent => {
  class ComposedComponent extends Component {
    constructor(props) {
      super(props);

      this.state = { alert: null };
    }

    alert(alertMsg, callback = () => {}) {
      const getAlert = alertMsg => (
        <SweetAlert
          danger={alertMsg}
          success={!alertMsg}
          title={alertMsg ? `${title} failed!` : title}
          onConfirm={() => {
            this.hideAlert();
            callback();
          }}
        >
          {alertMsg || successMsg}
        </SweetAlert>
      );

      this.setState({ alert: getAlert(alertMsg) });
    }

    hideAlert() {
      this.setState({ alert: null });
    }
    render() {
      return <div><WrappedComponent {...this.props} alert={this.alert.bind(this)} />{this.state.alert}</div>;
    }
  }

  return ComposedComponent;
};
