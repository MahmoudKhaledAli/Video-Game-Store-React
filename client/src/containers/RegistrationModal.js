import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import SweetAlert from 'react-bootstrap-sweetalert';

import { signup } from 'actions';

import 'styles/login.css';

class RegistrationModal extends Component {
  constructor(props) {
    super(props);

    this.state = { alert: null };
  }

  alert(alertMsg) {
    const getAlert = alertMsg => (
      <SweetAlert
        danger={alertMsg}
        success={!alertMsg}
        title={alertMsg ? "Sign up failed!" : "Sign up"}
        onConfirm={() => {
          this.hideAlert();
          this.props.onHide();
          this.props.history.push('/');
        }}
      >
        {alertMsg || "Sign up successfull"}
      </SweetAlert>
    );

    this.setState({ alert: getAlert(alertMsg) });
  }

  hideAlert() {
    this.setState({ alert: null });
  }

  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);
    this.props.signup(values, () => {
      this.alert(this.props.errorMessage);
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
            type="password"
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
      <div className="static-modal">
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
        {this.state.alert}
      </div >
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default withRouter(connect(mapStateToProps, { signup })(RegistrationModal));