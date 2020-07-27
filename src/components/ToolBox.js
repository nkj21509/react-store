import React from "react";
import {withRouter} from "react-router-dom"
import { toast } from "react-toastify";

class ToolBox extends React.Component {
  state = {
    searchText: ''
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchText: value
    });
    this.props.search(value);
  }

  clearSearchText = () => {
    this.setState({
      searchText: ''
    });
    this.props.search('');
  }

  goCart = () => {
    if(!global.auth.isLogin()) {
      this.props.history.push('/login');
      toast.info('Please login first'); 
      return;
    } 
    this.props.history.push('/cart');
  }

  render() {
    return (
      <div className="tool-box">
        <div className="logo-text">Store</div>
        <div className="search-box">
          <div className="field has-addons">
            <p className="control">
              <input
                className="input search-input"
                type="text"
                placeholder="Search product"
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </p>
            <p className="control">
              <button className="button" onClick={this.clearSearchText}>X</button>
            </p>
          </div>
        </div>
        <div onClick={this.goCart} className="cart-box">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-num">({this.props.cartNum})</span>
        </div>
      </div>
    );
  }
}

export default withRouter(ToolBox);
