import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { alert } from 'components';
import { signup } from 'actions';

import 'styles/login.css';

class RegistrationModal extends Component {
  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);
    this.props.signup(values, () => {
      this.props.alert(this.props.errorMessage, () => {
        this.props.onHide();
        this.props.history.push('/');
      });
    });
  }

  renderForm(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            name="username"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.username}
            required autoFocus
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter new email"
            name="email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Choose your Password"
            name="password"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Enter your address"
            name="address"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.address}
            required
          />
        </div>
        <Button type="submit" bsStyle="primary" bsSize="lg" block>Register</Button>
      </form>
    );
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} dialogClassName="moderate-modal">
        <Modal.Header closeButton>
          <Modal.Title>Create your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ username: '', email: '', password: '', address: '' }}
            onSubmit={this.handleFormSubmit.bind(this)}
            render={this.renderForm}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

const enhance = compose(
  alert({ title: 'Sign up', successMsg: 'Signed up successfully!' }),
  withRouter,
  connect(mapStateToProps, { signup })
);

export default enhance(RegistrationModal)