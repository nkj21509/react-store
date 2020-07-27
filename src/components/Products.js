import React from "react";
import axios from "commons/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ToolBox from "components/ToolBox";
import Product from "components/Product";
import Panel from "components/Panel";
import Addinventory from "components/Addinventory";

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0,
  };

  search = (text) => {
    // 1.拿到新數組
    let _products = [...this.state.sourceProducts];
    _products = _products.filter((p) => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return matchArray !== null;
    });
    this.setState({
      products: _products,
    });
  };

  toAdd = () => {
    Panel.open({
      component: Addinventory,
      callback: (data) => {
        if (data) {
          this.add(data);
        }
      },
    });
  };

  add = (product) => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sproducts = [...this.state.sourceProducts];
    _sproducts.push(product);
    this.setState({
      products: _products,
      sourceProducts: _sproducts,
    });
  };

  update = (product) => {
    const _products = [...this.state.products];
    const _index = _products.findIndex((p) => p.id === product.id);
    _products.splice(_index, 1, product);
    const _sproducts = [...this.state.sourceProducts];
    const _sindex = _sproducts.findIndex((p) => p.id === product.id);
    _sproducts.splice(_sindex, 1, product);
    this.setState({
      products: _products,
      sourceProducts: _sproducts,
    });
  };

  delete = (id) => {
    const _products = this.state.products.filter((p) => {
      return p.id !== id;
    });
    const _sproducts = this.state.sourceProducts.filter((p) => {
      return p.id !== id;
    });
    this.setState({
      products: _products,
      sourceProducts: _sproducts,
    });
  };

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({
      cartNum: cartNum,
    });
  };

  initCartNum = async () => {
    const user = global.auth.getUser() || { }; 
    const res = await axios.get(`/carts?userId=${user.email}`);
    const carts = res.data || [];
    const cartNum = carts
      .map((cart) => cart.mount)
      .reduce((a, value) => a + value, 0);
    return cartNum;
  };

  componentDidMount() {
    axios
      .get("/products")
      .then((response) => {
        console.log(response.data);
        this.setState({
          products: response.data,
          sourceProducts: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.updateCartNum();
  }
  renderAddBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <button className="button is-primary add-btn" onClick={this.toAdd}>
          add
        </button>
      );
    }
  };

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map((product) => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={product.id}
                  >
                    <div className="column is-3" key={product.id}>
                      <Product
                        product={product}
                        update={this.update}
                        delete={this.delete}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
          {this.renderAddBtn()}
        </div>
      </div>
    );
  }
}

export default Products;
