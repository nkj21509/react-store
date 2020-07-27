import React, { useState, useMemo } from "react";
import axios from "commons/axios";
import { formatePrice } from "commons/heiper";

const CartItem = (props) => {
  const [mount, setMount] = useState(props.cart.mount);
  const { id, name, image, price } = props.cart || {};
  const sumPrice = useMemo(() => {
    return formatePrice(mount * parseInt(price));
  },[mount, price])
  

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setMount(value);
    const newCart = {
      ...props.cart,
      mount: value,
    };
    axios.put(`/carts/${id}`, newCart).then((res) => props.updateCart(newCart));
  };
  const deleteCart = () => {
      axios.delete(`/carts/${id}`).then(res => {
          console.log(res.data)
          props.deleteCart(props.cart)
      })
  };
  return (
    <div className="columns is-vcentered">
      <div className="column is-narrow" onClick={deleteCart}>
        <span className="close">x</span>
      </div>
      <div className="column is-narrow">
        <img src={image} alt={name} width="100" />
      </div>
      <div className="column cart-name is-narrow">{name}</div>
      <div className="column">
        <span className="price">{formatePrice(price)}</span>
      </div>
      <div className="column">
        <input
          type="number"
          className="input num-input"
          min={1}
          value={mount}
          onChange={handleChange}
        />
      </div>
      <div className="column">
        <span className="sum-price">{sumPrice}</span>
      </div>
    </div>
  );
};

export default CartItem;
