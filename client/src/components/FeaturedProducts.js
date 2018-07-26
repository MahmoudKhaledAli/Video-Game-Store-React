import React, { Component } from 'react';

import { ProductsList } from "components";

import 'styles/style.css';

export default class extends Component {
  render() {
    return (
      <div className="row text-center jumbotron my-4">
        <div className="div-center div-margin">
          <h2>{this.props.title}</h2>
          <br />
        </div>
        <ProductsList products={this.props.products} gridSize={this.props.gridSize} />
      </div>
    );
  }
}