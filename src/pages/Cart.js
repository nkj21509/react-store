import React, { useState, useEffect, useMemo } from "react";
import axios from "commons/axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { formatePrice } from "commons/heiper";
import Layout from "Layout";
import CartItem from "components/CartItem";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const totalPrice = useMemo(() => {
    const totalPrice = carts
      .map((cart) => {
        return parseInt(cart.price) * cart.mount;
      })
      .reduce((a, value) => a + value, 0);
    return formatePrice(totalPrice);
  }, [carts]);

  const updateCart = (cart) => {
    const newCarts = [...carts];
    const _index = newCarts.findIndex((c) => c.id === cart.id);
    newCarts.splice(_index, 1, cart);
    setCarts(newCarts);
  };
  const deleteCart = (cart) => {
    const newCarts = carts.filter((c) => {
      return cart.id !== c.id;
    });
    setCarts(newCarts);
  };

  useEffect(() => {
    const user = global.auth.getUser() || { }; 
    axios.get(`/carts?userId=${user.email}`).then((res) => {
      console.log(res.data);
      setCarts(res.data);
    });
  }, []);
  return (
    <Layout>
      <div className="cart-page">
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          <TransitionGroup component={null}>
            {carts.map((cart) => {
              return (
                <CSSTransition
                  classNames="cart-item"
                  timeout={300}
                  key={cart.id}
                >
                  <CartItem
                    key={cart.id}
                    cart={cart}
                    updateCart={updateCart}
                    deleteCart={deleteCart}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
        {carts.length === 0 ? <p className="no-cart">No Goods</p> : ""}
        <div className="cart-total">
          Total:
          <span className="total-price">{totalPrice}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
