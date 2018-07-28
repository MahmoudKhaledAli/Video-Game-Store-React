import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Button } from 'react-bootstrap';
import { Formik } from 'formik';

class UpdateAddress extends Component {
  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);
    console.log(values);
    
  }

  renderForm(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <textarea
            name="address"
            className="form-control"
            rows="5"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.address}
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
          initialValues={{ address: this.props.address }}
          onSubmit={this.handleFormSubmit.bind(this)}
          render={this.renderForm}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    address: state.auth.address
  };
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(UpdateAddress);