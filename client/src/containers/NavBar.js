import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";

import SweetAlert from 'react-bootstrap-sweetalert';

import { signout } from 'actions';

import 'styles/style.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { alert: null };
  }

  alert(alertMsg = null) {
    const getAlert = alertMsg => (
      <SweetAlert
        success={!alertMsg}
        title="Sign out"
        onConfirm={() => this.hideAlert()}
      >
        {alertMsg ? alertMsg : 'Logged out successfully'}
      </SweetAlert>
    );

    this.setState({ alert: getAlert(alertMsg) });
  }

  hideAlert() {
    this.setState({ alert: null });
  }
  onLogoutClick(event) {
    event.preventDefault();
    this.props.signout(() => {
      this.alert();
    });
  }

  renderRightNav(accountClass) {
    if (this.props.loggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link className={accountClass} to="/account"><span className="glyphicon glyphicon-user" /> Account</Link></li>
          <li><Link to="" onClick={this.onLogoutClick.bind(this)}><span className="glyphicon glyphicon-log-out" /> Logout</Link></li>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="" onClick={this.props.onRegisterClick}><span className="glyphicon glyphicon-user" /> Sign Up</Link></li>
          <li><Link to="" onClick={this.props.onLoginClick}><span className="glyphicon glyphicon-log-in" /> Login</Link></li>
        </ul>
      );
    }
  }

  render() {
    const homeClass = this.props.location.pathname === "/" ? "active" : "";
    const browseClass = this.props.location.pathname.match(/^\/browse/) ? "active" : "";
    const cartClass = this.props.location.pathname.match(/^\/cart/) ? "active" : "";
    const accountClass = this.props.location.pathname.match(/^\/account/) ? "active" : "";

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Video Game Store</Link>
            </div>
            <ul className="navbar-nav nav">
              <li className={homeClass}><Link to="/"><span className="glyphicon glyphicon-home" /> Home</Link></li>
              <li className={browseClass}><Link to="/browse">Browse</Link></li>
              <li className={cartClass}><Link to="/cart"><span className="glyphicon glyphicon-shopping-cart" /> Cart</Link></li>
            </ul>
            {this.renderRightNav(accountClass)}
          </div>
        </nav>
        {this.state.alert}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { loggedIn: state.auth.authenticated }
}

export default connect(mapStateToProps, { signout })(withRouter(NavBar));