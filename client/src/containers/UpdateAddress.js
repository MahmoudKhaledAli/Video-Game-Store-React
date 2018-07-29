import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { alert } from 'components'
import { updateAddress } from 'actions';

class UpdateAddress extends Component {
  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);
    this.props.updateAddress(values.address, () => {
      this.props.alert();
    });
  }

  RenderForm(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <textarea
            name="address"
            className="form-control"
            rows="3"
            style={{ fontSize: '20px' }}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.address}
            required
          />
        </div>
        <Button type="submit" bsStyle="primary" bsSize="lg">Update</Button>
      </form >
    );
  }
  render() {
    return (
      <div>
        <h2>Update Address</h2>
        <Formik
          onSubmit={this.handleFormSubmit.bind(this)}
          render={props => <this.RenderForm {...props} address={this.props.address} />}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    address: state.auth.address,
  };
}

const enhance = compose(
  connect(mapStateToProps, { updateAddress }),
  alert({ title: 'Update address', successMsg: 'Address updated successfully!' })
);

export default enhance(UpdateAddress);