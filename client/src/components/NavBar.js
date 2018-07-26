import React from 'react';

import { Link, withRouter } from "react-router-dom";

import 'styles/style.css';

export default withRouter(({ location, onLoginClick, onRegisterClick }) => {
  const homeClass = location.pathname === "/" ? "active" : "";
  const browseClass = location.pathname.match(/^\/browse/) ? "active" : "";
  const cartClass = location.pathname.match(/^\/cart/) ? "active" : "";
  const accountClass = location.pathname.match(/^\/account/) ? "active" : "";

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Video Game Store</Link>
        </div>
        <ul className="navbar-nav nav">
          <li className={homeClass}><Link to="/"><span className="glyphicon glyphicon-home" /> Home</Link></li>
          <li className={browseClass}><Link to="/browse">Browse</Link></li>
          <li className={cartClass}><Link to="/cart"><span className="glyphicon glyphicon-shopping-cart" /> Cart</Link></li>
          <li className={accountClass}><Link to="/account"><span className="glyphicon glyphicon-user" /> Account</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="" onClick={onRegisterClick}><span className="glyphicon glyphicon-user" /> Sign Up</Link></li>
          <li><Link to="" onClick={onLoginClick}><span className="glyphicon glyphicon-log-in" /> Login</Link></li>
        </ul>
      </div>
    </nav>
  );
});