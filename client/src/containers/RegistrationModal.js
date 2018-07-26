import React, { Component } from 'react';

import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import 'styles/login.css';

export default class extends Component {
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

  handleFormSubmit(values, actions) {
    console.log(values);
    
    actions.setSubmitting(false);
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
              onSubmit={this.handleFormSubmit}
              render={this.renderForm}
            />
          </Modal.Body>
        </Modal>
      </div >
    );
  }
}
