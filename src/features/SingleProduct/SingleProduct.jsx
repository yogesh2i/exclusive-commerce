import React, { useEffect, useRef, useState } from 'react';
import './singleProduct.scss';
import { AiFillHeart } from 'react-icons/ai'
import parse from 'html-react-parser';
import { BsTruck } from 'react-icons/bs';
import { BiRecycle } from 'react-icons/bi';
import Extra from '../Extra/Extra';
import ProductList from '../ProductList/ProductList';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addWishList, fetchCategoriesAsync, handleQtyCart, removeFomCart, updatecart } from '../counter/counterSlice';
import Loading from '../Loading/Loading';

function SingleProduct() {
  const[qtys,setQty] = useState(1);
  const { tcin } = useParams();
  const dispatch = useDispatch();
  const ref = useRef();
  useEffect(() => {
    dispatch(fetchCategoriesAsync({ type: 'product-details', tcin: `${tcin}` }))
  }, [tcin, dispatch]);
  const fetchedDetails = (useSelector((state) => (state.counter.productDetails)));
  const fetchedProducts = useSelector((state) => state.counter.items);
  const status = useSelector((state) => state.counter.status);
  const tcinList = useSelector((state)=>(state.counter.tcinList));
  const wishlisttcin = useSelector((state)=>state.counter.wishlistTcin);
  function handleCart(arg){
    dispatch(updatecart(arg));
  }
  function handleRemove(tcin){
    dispatch(removeFomCart(tcin));
  }
  function incQty(tcin,qtys){
    setQty(qtys+1);
    dispatch(handleQtyCart({tcin,qty:qtys+1}))
    
  }
  function decQty(tcin,qtys){
    setQty(qtys>1?qtys-1:1);
    dispatch(handleQtyCart({tcin,qty:qtys>1?qtys-1:1}))
  }
  function handleWishlist(arg){
    ref.current.style.color = "red";
    dispatch(addWishList(arg));

    }  return (

   
    <>
    {status==='loading'?<Loading/>:<>
    {!fetchedDetails ? null :
      <><div className='single__container'>
        <div className="img">
          <img src={fetchedDetails.product.item.enrichment.images.primary_image_url} alt="" />
        </div>
        <div className="details">
          <div className="name">{fetchedDetails.product.item.product_description.title}</div>
          <div >{Array(Math.round(parseInt(fetchedDetails.product.ratings_and_reviews.statistics.rating.average))).fill('⭐').map((i) => i)} <span className="rating">({fetchedDetails.product.ratings_and_reviews.statistics.rating.count} reviews)</span></div>
          <div className="price">${fetchedDetails.product.price.current_retail?fetchedDetails.product.price.current_retail:fetchedDetails.product.price.current_retail_max}</div>
          <div className="description">{fetchedDetails.product.item.product_description.bullet_descriptions.map((e, i) => {
            return (i<=5?<div key={i}>{parse(e)}</div>:null)
          })}</div>
          <hr />
          <div className="buttons">
            <span className='qty_btn'>
              <button onClick={()=>decQty(fetchedDetails.product.item.tcin,qtys)}>-</button>
              <span>{qtys}</span>
              <button onClick={()=>incQty(fetchedDetails.product.item.tcin,qtys)}>+</button>
            </span>
            {!tcinList.includes(fetchedDetails.product.tcin)?<button onClick={()=>{handleCart({img:fetchedDetails.product.item.enrichment.images.primary_image_url,title:fetchedDetails.product.item.product_description.title,price:fetchedDetails.product.price.current_retail?fetchedDetails.product.price.current_retail:fetchedDetails.product.price.current_retail_max,tcin:fetchedDetails.product.tcin,qty:qtys})}}>Add to Cart</button>:
            <button onClick={()=>{handleRemove(fetchedDetails.product.tcin)}}>Remove From Cart</button>}
            {!wishlisttcin.includes(fetchedDetails.product.tcin)?<span ref={ref} onClick={()=>{handleWishlist({img:fetchedDetails.product.item.enrichment.images.primary_image_url,title:fetchedDetails.product.item.product_description.title,price:fetchedDetails.product.price.current_retail?fetchedDetails.product.price.current_retail:fetchedDetails.product.price.current_retail_max,tcin:fetchedDetails.product.tcin})}}><AiFillHeart /></span>:<span><AiFillHeart style={{color:"red"}}/></span>}
          </div>
          <div className="delivery">
            <div>
              <span><BsTruck /></span>
              <span>
                <p className='heading'> Free Delivery</p>
                <p>Enter your postal code for Delivery Availiability</p>
              </span>
            </div>
            <div>
              <span><BiRecycle /></span>
              <span>
                <p className='heading'> Return Delivery</p>
                <p>Free 30 days Delivery Return.</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductList rating={true} category={'For You'} id={`category=${fetchedDetails.product.category.category_id}`} data={fetchedProducts}/>
      <div style={{overflow:"hidden"}}><Extra /></div></>}</>}
    </>
  )
}

export default SingleProduct
