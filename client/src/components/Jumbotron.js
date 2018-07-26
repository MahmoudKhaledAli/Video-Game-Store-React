import React from 'react';

import { Link } from 'react-router-dom';

import 'styles/style.css';

export default () => {
  return (
    <header className="jumbotron my-4">
      <h1 className="display-3">Hello there!</h1>
      <p className="lead">Welcome to our video game store.</p>
      <Link to="/browse" className="btn btn-primary btn-lg">Browse!</Link>
    </header>
  );
}