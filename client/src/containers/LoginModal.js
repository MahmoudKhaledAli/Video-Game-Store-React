import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import SweetAlert from 'react-bootstrap-sweetalert';

import { signin } from 'actions';

import 'styles/login.css';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = { alert: null };
  }

  alert(alertMsg) {
    const getAlert = alertMsg => (
      <SweetAlert
        danger={alertMsg}
        success={!alertMsg}
        title={alertMsg ? "Sign in failed!" : "Sign in"}
        onConfirm={() => {
          this.hideAlert();
          this.props.onHide();
        }}
      >
        {alertMsg ? alertMsg : 'Logged in successfully'}
      </SweetAlert>
    );

    this.setState({ alert: getAlert(alertMsg) });
  }

  hideAlert() {
    this.setState({ alert: null });
  }

  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);
    this.props.signin(values, () => {
      this.alert(this.props.errorMessage);
    });
  }

  renderForm(props) {
    return (
      <form className="form-signin" onSubmit={props.handleSubmit}>
        <span id="reauth-email" className="reauth-email"></span>
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          id="inputEmail"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name}
          required autoFocus
        />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          id="inputPassword"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.password}
          required
        />
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              name="remember"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.remember}
            /> Remember me
          </label>
        </div>
        <Button type="submit" bsStyle="primary" bsSize="lg" block>Sign in</Button>
      </form>
    );
  }

  render() {
    console.log(this.props);

    return (
      <div className="static-modal">
        <Modal show={this.props.show} onHide={this.props.onHide} dialogClassName="moderate-modal">
          <Modal.Header closeButton>
            <Modal.Title> Sign in to your account </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card card-container" style={{ padding: '10px 10px' }}>
              <img alt="" id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
              <p id="profile-name" className="profile-name-card"></p>
              <Formik
                initialValues={{ username: '', password: '', remember: false }}
                onSubmit={this.handleFormSubmit.bind(this)}
                render={this.renderForm}
              />
              <a href="" className="forgot-password">
                Forgot the password?
              </a>
            </div>
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

export default connect(mapStateToProps, { signin })(LoginModal);