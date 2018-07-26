import React, { Component } from 'react';

import { NavBar, Footer, ScrollToTop } from 'components';
import { LoginModal, RegistrationModal } from 'containers';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { showLoginModal: false, showRegisterModal: false };

    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleLoginShow = this.handleLoginShow.bind(this);
    this.handleRegisterClose = this.handleRegisterClose.bind(this);
    this.handleRegisterShow = this.handleRegisterShow.bind(this);
  }

  handleLoginClose(event = null) {
    if (event) {
      event.preventDefault();
    }

    this.setState({ showLoginModal: false, showRegisterModal: false });
  }

  handleLoginShow(event = null) {
    if (event) {
      event.preventDefault();
    }

    this.setState({ showLoginModal: true, showRegisterModal: false });
  }

  handleRegisterClose(event = null) {
    if (event) {
      event.preventDefault();
    }

    this.setState({ showRegisterModal: false, showLoginModal: false });
  }

  handleRegisterShow(event = null) {
    if (event) {
      event.preventDefault();
    }

    this.setState({ showRegisterModal: true, showLoginModal: false });
  }

  render() {
    return (
      <div className="container">
        <NavBar onLoginClick={this.handleLoginShow} onRegisterClick={this.handleRegisterShow} />
        <LoginModal show={this.state.showLoginModal} onHide={this.handleLoginClose} />
        <RegistrationModal show={this.state.showRegisterModal} onHide={this.handleRegisterClose} />
        <ScrollToTop>
          {this.props.children}
        </ScrollToTop>
        <Footer />
      </div>
    );
  }
};