import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';

import { BrowseList, SearchForm } from 'containers';

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = { pageNo: 0 };
  }

  handlePageChange(data) {
    this.setState({ pageNo: data.selected });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Video Game Store - Browse Products</title>
        </Helmet>
        <div className="row">
          <div className="col-lg-3">
            <SearchForm pageNo={this.state.pageNo} />
          </div>
          <div className="col-lg-9">
            <div align='center' style={{ marginBottom: "30px" }}>
              <br />
            </div>
            <BrowseList />
            <div className="div-center">
              <ReactPaginate
                pageCount={this.props.pageCount}
                forcePage={this.state.pageNo}
                onPageChange={this.handlePageChange.bind(this)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { pageCount: state.search.pageCount };
}

export default connect(mapStateToProps, {})(Browse);