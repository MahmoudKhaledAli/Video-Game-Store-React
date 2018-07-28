import React, { Component } from 'react';
import { compose } from 'redux';

import { Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { requireAuth } from 'components';

class ReviewFrom extends Component {
  renderForm(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className="form-group" onSubmit={props.handleSubmit}>
          <select
            className="form-control"
            name="rating"
            style={{ width: '5%' }}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.rating}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="review"
            rows="8" cols="80"
            placeholder="Write a comment (optional)"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.review}
          />
        </div>
        <Button type="submit" bsSize="lg" bsStyle="primary">Submit</Button>
      </form>
    );
  }

  handleFormSubmit(values, actions) {
    console.log(values);

    actions.setSubmitting(false);
  }

  render() {
    return (
      <div>
        <h1>Rate This Product</h1>
        <Formik
          initialValues={{ rating: '5', review: '' }}
          onSubmit={this.handleFormSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }
}

const enhance = compose(
  requireAuth(false)
);

export default enhance(ReviewFrom);