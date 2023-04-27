import React, { useEffect} from 'react';
import './home.scss';
import { BsApple } from 'react-icons/bs'
import { AiOutlineArrowRight } from 'react-icons/ai'
import ProductList from '../ProductList/ProductList';
import iphone from '../../assets/imges/home.png';
import Extra from '../Extra/Extra';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAsync} from '../counter/counterSlice';
import { useNavigate } from 'react-router';




function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(fetchCategoriesAsync({type:'products',category:'category=5xtg6'}));
     dispatch(fetchCategoriesAsync({type:'categories'}));
     dispatch(fetchCategoriesAsync({type:'top',category:'category=5xt1a'}));
    
  },[dispatch])
  const fetchedCategories = useSelector((state) => state.counter.categories);
  const fetchedProducts = useSelector((state) => state.counter.items);
  const fetchedTopProducts = useSelector((state) => state.counter.topItems);

  
 
  return (
    <>
    
      <div className="main">
        <div className="top_home">
          <div className="text">
            <span><BsApple />&nbsp;iPhone 14 Series</span>
            <span>Up to 10% off Voucher</span>
            <span>Shop Now &nbsp; <AiOutlineArrowRight /></span>
          </div>
          <div className="image">
            <img src={iphone} alt="" />
          </div>
        </div>
        <div style={{marginTop:"60px"}}>
        <ProductList rating={true} category={'Today`s Picks'} data={fetchedProducts} id={'category=5xtg6'}/>
        </div>
        { fetchedCategories &&
        <div className="category-section">
          <div className="header">
            <span>Browse By Categories</span>
          </div>
          <div className="categories">
            {fetchedCategories && fetchedCategories.components[0].cells.items.map((item,index)=>{
              return (
            <div className="row" key={index} onClick={()=>{navigate(`/${item.actions[0].target.split('?')[1]}/${item.displayText}`)}}>
              <img src={item.image.uri} alt="" />
              <p>{item.displayText}</p>
            </div>

              )
            })}
            
          </div>
        </div>
}
      </div>
      <div  style={{marginTop:"60px",overflow:"hidden"}}>
      <ProductList rating={true} category={'Try Groceries'} data={fetchedTopProducts} id={'category=5xt1a'}/>
      <Extra/>
      </div>
    </>
  )
}

export default Home
