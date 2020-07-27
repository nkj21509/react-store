import React from "react";
import { withRouter } from "react-router-dom";
import axios from "commons/axios";
import { toast } from "react-toastify";
import { formatePrice } from "commons/heiper";
import Panel from "components/Panel";
import Editinventory from "components/Editinventory";

class Product extends React.Component {
  toEdit = () => {
    Panel.open({
      component: Editinventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete,
      },
      callback: (data) => {
        if (data) {
          this.props.update(data);
        }
      },
    });
  };

  addCart = async () => {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.info("Please login first");
      return;
    }
    try {
      const user = global.auth.getUser() || { }; 
      const { id, name, image, price } = this.props.product;
      const res = await axios.get(`/carts?productId=${id}`);
      const carts = res.data;
      if (carts && carts.length > 0) {
        console.log("test");
        let cart = carts[0];
        console.log(cart);
        cart.mount += 1;
        console.log(cart.mount);
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1,
          userId: user.email
        };
        console.log(cart);
        await axios.post("/carts", cart);
      }
      this.props.updateCartNum();
      toast.success("Add cart success");
    } catch (error) {
      console.log(error);
      toast.error("Add cart failed");
    }
  };

  renderManageBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right" onClick={this.toEdit}>
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      );
    }
  };

  render() {
    const { name, image, tags, price, status } = this.props.product;
    const _pClass = {
      available: "product",
      unavailable: "product out-stock",
    };

    return (
      <div className={_pClass[status]}>
        <div className="p-content">
          {this.renderManageBtn()}
          <div className="img-wrapper">
            <div className="out-stock-text">Out of Stock</div>
            <figure className="image is-4by3">
              <img src={image} alt={name} />
            </figure>
          </div>
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
        </div>
        <div className="p-footer">
          <p className="price">{formatePrice(price)}</p>
          <button
            className="add-cart"
            onClick={this.addCart}
            disabled={status === "unavailable"}
          >
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
