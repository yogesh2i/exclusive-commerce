import React from 'react';
import './wishlist.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { BsCart2 } from 'react-icons/bs';
import { removeFomCart, updatecart } from '../counter/counterSlice';
function Wishlist() {
  const wishlist = useSelector((state)=>(state.counter.wishlist));
  const tcinList = useSelector((state)=>(state.counter.tcinList));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleCart(arg){
    dispatch(updatecart(arg));
  }
  function handleRemove(tcin){
    dispatch(removeFomCart(tcin))
  }
  return (
    <div className='wishlist__container'>
      <div className='productList__container'>
      <div className="top">
        <span>Wishlist</span>
      </div>
      <div className="center">
        {wishlist && wishlist.map((entry, index) => {
         return (
            <div className="content" key={index}>
              <div className="img" onClick={() => {navigate(`/product-view/${entry.tcin}`) }}><img src={entry.img} alt="" /></div>
              {!tcinList.includes(entry.tcin)?<div className='add_to_cart' onClick={(e)=>{e.stopPropagation() ;handleCart({img:entry.img,title:entry.item.title,price:entry.price,tcin:entry.tcin,qty:1})}}><BsCart2 />&nbsp;Add To Cart</div>:
              <div className='add_to_cart' onClick={(e)=>{e.stopPropagation() ;handleRemove(entry.tcin)}}><BsCart2 />&nbsp;Remove From Cart</div>}
              <p className='name'>{entry.title}</p>
              <p className='price'>${entry.price}</p>
            </div>

          )
        })
        }
        </div>
        
    </div>
     
    </div>
  )
}

export default Wishlist;
