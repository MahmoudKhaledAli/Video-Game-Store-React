import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';

import { search } from 'actions';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { platform: "-1" };

    this.handleButton = this.handleButton.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    this.props.search({
      name: "",
      pageNo: 1,
      field: "product.idproduct",
      order: "desc",
      platform: -1
    });
  }

  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);
    this.props.search({ ...values, platform: this.state.platform, pageNo: 1 });
  }

  handleButton(event) {
    this.setState({ platform: event.target.value });
  }

  renderForm(props) {
    return (
      <form className="form-group" onSubmit={props.handleSubmit}>
        <div className="list-group">
          <button style={{ marginBottom: '0px' }} type="submit" onClick={this.handleButton} value="-1" className="list-group-item">All</button>
          <button style={{ marginBottom: '0px' }} type="submit" onClick={this.handleButton} value="1" className="list-group-item">PC</button>
          <button style={{ marginBottom: '0px' }} type="submit" onClick={this.handleButton} value="2" className="list-group-item">PS4</button>
          <button style={{ marginBottom: '0px' }} type="submit" onClick={this.handleButton} value="3" className="list-group-item">Xbox One</button>
        </div>
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Search by name.."
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name}
        />
        <br /> Sort by:
        <br />
        <br />
        <select
          name="field"
          className="form-control"
          style={{ width: "55%" }}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name}
        >
          <option value='product.idproduct'>Latest</option>
          <option value='avg_score'>Highest Rated</option>
          <option value='sales'>Top Sellers</option>
          <option value='price'>Price</option>
        </select>
        <select
          name="order"
          className="form-control"
          style={{ width: "55%" }}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name}
        >
          <option value='ASC'>Ascending</option>
          <option value='DESC'>Descending</option>
        </select>
      </form>
    );
  }

  render() {
    return (
      <div>
        <h1 className="my-4">Search</h1>
        <Formik
          initialValues={{ name: '', field: 'product.idproduct', order: 'DESC' }}
          onSubmit={this.handleFormSubmit.bind(this)}
          render={this.renderForm}
        />
      </div>
    );
  }
}

export default connect(null, { search })(SearchForm);