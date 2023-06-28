import React from 'react';
import './wishlist.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { BsCart2, BsX } from 'react-icons/bs';
import {BsCartX} from 'react-icons/bs';
import { removeFomCart, updatecart,removeWishlist } from '../counter/counterSlice';
function Wishlist() {
  const wishlist = useSelector((state)=>state.counter.wishlist);

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
        {wishlist && (wishlist.length>0?wishlist.map((entry, index) => {
         return (
            <div className="content" key={index}>
              <div className='remove-btn' onClick={()=>{dispatch(removeWishlist(entry.tcin));console.log('ko')}}><BsX></BsX></div>
              <div className="img" onClick={() => {navigate(`/product-view/${entry.tcin}`) }}><img src={entry.img} alt="" /></div>
              {!tcinList.includes(entry.tcin)?<div className='add_to_cart' onClick={(e)=>{e.stopPropagation() ;handleCart({img:entry.img,title:entry.title,price:entry.price,tcin:entry.tcin,qty:1})}}><BsCart2 />&nbsp;Add To Cart</div>:
              <div className='add_to_cart' onClick={(e)=>{e.stopPropagation() ;handleRemove(entry.tcin)}}><BsCart2 />&nbsp;Remove From Cart</div>}
              <p className='name'>{entry.title}</p>
              <p className='price'>${entry.price}</p>
            </div>

          )
        }):<div className='empty-cart'>
          <BsCartX/>
          <span>Looks empty!</span>
        </div>
        )}
        </div>
        
    </div>
     
    </div>
  )
}

export default Wishlist;
