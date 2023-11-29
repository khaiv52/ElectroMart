import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const cates = this.state.categories
    .filter(item => ['iPad', 'iPhone', 'Laptop', 'Macbook'].includes(item.name))
    .map(item => (
      <li key={item._id} className="menu">
        <Link to={'/product/category/' + item._id}>
          {item.name === 'iPad' ? (
            <span>
              {item.name} <i className="fa-solid fa-tablet-screen-button"></i>
            </span>
          ) : item.name === 'iPhone' ? (
            <span>
              {item.name} <i className="fa-solid fa-mobile-screen-button"></i>
            </span>
          ) : item.name === 'Laptop' ? (
            <span>
              {item.name} <i className="fa-solid fa-laptop"></i>
            </span>
          ) : item.name === 'Macbook' ? (
            <span>
              {item.name} <i className="fa-brands fa-apple"></i>
            </span>
          ) : (
            ""
          )}
        </Link>
      </li>
    ));


    return (
      <div className="navbar">
        <div className="navbar-left">
          <ul className="menu">
            <li className="menu">
              <Link to="/home">
                <i className="icon fire"></i>
                <p className="title_logo">Electro Mart</p>
              </Link>
            </li>
            {cates}
            <li className="menu">
              <Link to='/gmap'>Gmap
                <i class="fa-solid fa-map"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ display: "inline" }} class="form-switch">
          <input class="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp; Light / Dark mode
        </div>
        <div className="navbar-right pad1">
          <form className="search" onSubmit={(e) => this.btnSearchClick(e)}>
            <input
              type="search"
              placeholder="Enter keyword"
              className="keyword"
              value={this.state.txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
            />
            <button type="submit" className="search-btn">
              SEARCH
            </button>
          </form>
        </div>
      </div>
    );
  }
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
  componentDidMount() {
    this.apiGetCategories();
  }

  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  btnSearchClick(e) {
    e.preventDefault();

    // Check if the keyword is not empty before navigating
    if (this.state.txtKeyword.trim() !== '') {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
  }
}

export default withRouter(Menu);
