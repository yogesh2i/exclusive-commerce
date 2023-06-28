import React, { useEffect } from 'react';
import '../ProductList/productList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { BsCart2 } from 'react-icons/bs';
import { fetchCategoriesAsync, removeFomCart, updatecart } from '../counter/counterSlice';
import Loading from '../Loading/Loading';

export default function CategoryItems() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {id,text} = useParams();
    const tcinList = useSelector((state)=>(state.counter.tcinList));
    useEffect(()=>{
        dispatch(fetchCategoriesAsync({type:'products',category:`${id}`,count:50}))
    },[id,dispatch]);
    const fetchedProducts = useSelector((state) => state.counter.items);
    const status = useSelector((state) => state.counter.status);
    function handleCart(arg){
      dispatch(updatecart(arg));
    }
    function handleRemove(arg){
      dispatch(removeFomCart(arg));
    }
  
    return (
        <div className='productList__container'>
    
          <div className="top">
            <span>{text}</span>
           
          </div>
          {status==='loading'?(<div style={{display:"flex",flexWrap:"wrap",flexDirection:"row",gap:"20px"}}><Loading/><Loading/><Loading/></div>):
          <div className="center">
            {fetchedProducts!==null && !fetchedProducts.hasOwnProperty('errors') &&fetchedProducts.data.search.products.map((entry, index) => {
              return (
                <div className="content" key={index}>
                  <div className="img" onClick={() => { navigate(`/product-view/${entry.item.tcin}`) }}><img src={entry.item.enrichment.images.primary_image_url} alt="" /></div>
                  {!tcinList.includes(entry.item.tcin)?<div className='add_to_cart' onClick={(e)=>{e.stopPropagation(); handleCart({img:entry.item.enrichment.images.primary_image_url,title:entry.item.product_description.title,price:entry.price.current_retail,tcin:entry.item.tcin,qty:1})}}><BsCart2 />&nbsp;Add To Cart</div>:
              <div className='add_to_cart' onClick={(e)=>{e.stopPropagation() ;handleRemove(entry.item.tcin)}}><BsCart2 />&nbsp;Remove From Cart</div>}
                  <p className='name'>{entry.item.product_description.title}</p>
                  <p className='price'>${entry.price.current_retail}</p>
                  {<p className="rating">{Array(Math.round(parseInt(entry.parent ? entry.parent.ratings_and_reviews.statistics.rating.average : entry.ratings_and_reviews.statistics.rating.average))).fill('⭐').map((i) => i)} &nbsp;({(entry.parent ? entry.parent.ratings_and_reviews.statistics.rating.count : entry.ratings_and_reviews.statistics.rating.count)})</p> }
                </div>
    
              )
            })
            }
    
          </div>}
        </div>
      )
}
