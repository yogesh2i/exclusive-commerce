import React from 'react';
import './cartItem.scss';
import {MdClose} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { handleQtyCart, removeFomCart } from '../../counter/counterSlice';

function CartItem() {
    const cartData = useSelector((state)=>(state.counter.cartItems));
    const dispatch = useDispatch();
    function handleRemove(tcin){
        dispatch(removeFomCart(tcin))
    }
    function incQty(tcin,qtys){
        
        dispatch(handleQtyCart({tcin:tcin,qty:qtys+1}))
        
      }
      function decQty(tcin,qtys){
        
        dispatch(handleQtyCart({tcin:tcin,qty:qtys>1?qtys-1:1}))
      }
     
  return (
      <div className='cart-products'>
       
        {cartData && cartData.map((item,i)=>{
         return (<div className="cart-product" key={i}>
            <div className="img-container">
                <img src={item.img} alt="" />
            </div>
            <div className="prod-details">
                <span className="name">{item.title}</span>
                <MdClose className='close-btn' onClick={()=>handleRemove(item.tcin)}/>
                <div className="quantity-buttons">
                    <span onClick={()=>decQty(item.tcin,item.qty)}>-</span>
                    <span>{item.qty}</span>
                    <span onClick={()=>incQty(item.tcin,item.qty)}>+</span>
                </div>
                <div className="text">
                    <span>{item.qty}</span>
                    <span>x</span>
                    <span className='highlight'>${item.price}</span>
                    <span>=</span>
                    <span className='highlight'>${Number.parseFloat(item.price*item.qty).toFixed(2)}</span>
                </div>
            </div>
        </div>)
       })}
    </div>
  )
}

export default CartItem
