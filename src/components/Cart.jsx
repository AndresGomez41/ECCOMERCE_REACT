import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { buyCartThunk, deleteProductThunk, getCartThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose}) => {

  const cart = useSelector(state => state.cart)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect( () =>{
    dispatch(getCartThunk())
  },[])  


  const getTotal = (cart) => {
    let total = 0 
    cart.forEach( product => {
      total += (Number(product.price) * Number(product.productsInCart.quantity))
    });
    return total
  }

  

  console.log(cart)

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CART</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.map((product) => (
            <div
              className="product-cart-cont"
              key={product.id}
              onClick={() => {
                navigate(`/product/${product.id}`);
                handleClose();
              }}
            >
              <div className="product-cart-title"> {product.title} </div>
              <div className="product-cart-qt">
                {product.productsInCart.quantity}
              </div>
              <div className="product-cart-price">$ {product.price}</div>
              <div
                className="cart delete-btn"
                onClick={() => dispatch(deleteProductThunk(product.id))}
              >
                <i className="fa-regular fa-trash-can"></i>
              </div>
            </div>
          ))}
          <h5>total $ {getTotal(cart)}</h5>
          <button className="cart purchase-btn" onClick={() => dispatch(buyCartThunk())}>PURCHASE</button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;