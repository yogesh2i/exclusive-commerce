import React from 'react';
import './cart.scss';
import {MdClose} from 'react-icons/md';
import {BsCartX} from 'react-icons/bs';
import CartItem from './CartItem/CartItem';
import { useSelector } from 'react-redux';



export default function Cart({setShowCart}) {
  const cartData = useSelector((state)=>(state.counter.cartItems));
  return (
   <>
   <div className="cart-panel">
    <div className="opac-layer"></div>
    <div className="cart-content">
      <div className="cart-header">
        <span className="heading">Shopping Cart</span>
        <span className="close-btn" onClick={()=>setShowCart(false)}>
          <MdClose/>
          <span className="text">Close</span>
        </span>
      </div>
      {cartData && cartData.length<1?<div className="empty-cart">
        <BsCartX/>
        <span>No Products in the cart.</span>
        <button className='return-cart' onClick={()=>{setShowCart(false)}}>RETURN TO SHOP</button>
      </div>:null}
      <>
      <CartItem/>
      <div className="cart-footer">
        <div className="subtotal">
          <span className="text">SubTotal: </span>
          <span className="text total">${cartData && Number.parseFloat(cartData.reduce((acc,amt)=>{
            return (acc + (amt.price*amt.qty))
          },0)).toFixed(2)}</span>
        </div>
        <div className="button">
          <button className="checkout-cart">CheckOut</button>
        </div>
      </div>
      </>
    </div>
   </div>
   </>
  )
}
