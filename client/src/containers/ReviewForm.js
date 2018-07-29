import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { addReview } from 'actions';
import { requireAuth, alert } from 'components';

class ReviewFrom extends Component {
  renderForm(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className="form-group" onSubmit={props.handleSubmit}>
          <select
            className="form-control"
            name="score"
            style={{ width: '5%' }}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.score}
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
            name="comment"
            rows="8" cols="80"
            placeholder="Write a comment (optional)"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.comment}
          />
        </div>
        <Button type="submit" bsSize="lg" bsStyle="primary">Submit</Button>
      </form>
    );
  }

  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);

    this.props.addReview({ idproduct: this.props.productId, ...values }, () => {
      this.props.alert();
    });
  }

  render() {
    return (
      <div>
        <h2>Rate This Product</h2>
        <Formik
          initialValues={{ score: '5', review: '' }}
          onSubmit={this.handleFormSubmit.bind(this)}
          render={this.renderForm}
        />
      </div>
    );
  }
}

const enhance = compose(
  requireAuth(false),
  connect(null, { addReview }),
  alert({ title: 'Add review', successMsg: 'Review added successfully!' })
);

export default enhance(ReviewFrom);