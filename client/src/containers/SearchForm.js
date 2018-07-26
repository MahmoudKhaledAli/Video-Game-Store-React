import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div>
        <h1 className="my-4">Search</h1>
        <form className="form-group" method="get">
          <div className="list-group">
            <a href="/browse?no=0&platform=-1&name=<%=name%>&field=<%=field%>&order=<%=order%>" className="list-group-item">All</a>
            <a href="/browse?no=0&platform=0&name=<%=name%>&field=<%=field%>&order=<%=order%>" className="list-group-item">PC</a>
            <a href="/browse?no=0&platform=1&name=<%=name%>&field=<%=field%>&order=<%=order%>" className="list-group-item">PS4</a>
            <a href="/browse?no=0&platform=2&name=<%=name%>&field=<%=field%>&order=<%=order%>" className="list-group-item">Xbox One</a>
          </div>
          <input className="form-control" type="text" name="name" placeholder="Search by name.." />
          <br /> Sort by:
        <br />
          <br />
          <select className="form-control" style={{ width: "55%" }}>
            <option value='product.idproduct'>Latest</option>
            <option value='avg_score'>Highest Rated</option>
            <option value='sales'>Top Sellers</option>
            <option value='price'>Price</option>
          </select>
          <select className="form-control" style={{ width: "55%" }}>
            <option value='ASC'>Ascending</option>
            <option value='DESC'>Descending</option>
          </select>
        </form>
      </div>
    );
  }
}