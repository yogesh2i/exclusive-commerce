import React, {useEffect} from 'react';
import './home.scss';
import { BsApple } from 'react-icons/bs'
import { AiOutlineArrowRight } from 'react-icons/ai'
import iphone from '../../assets/imges/home.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAsync} from '../counter/counterSlice';
import { useNavigate } from 'react-router';
import ProductList from'../ProductList/ProductList';
import Extra from '../Extra/Extra';




function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let fetchedCategories = useSelector((state) => state.counter.categories);
  let fetchedProducts = useSelector((state) => state.counter.items);
  let fetchedTopProducts = useSelector((state) => state.counter.topItems);
  useEffect(()=>{
    dispatch(fetchCategoriesAsync({type:'categories'}));

    setTimeout(() => {
      
      dispatch(fetchCategoriesAsync({type:'top',category:'category=5xt1a'}));
    }, 3000);
    dispatch( fetchCategoriesAsync({type:'products',category:'category=5xtg6'}));
  },[dispatch]);
 
 
 
  return (
    <>
    
      <div className="main">
        <div className="top_home">
          <div className="text">
            <span><BsApple />&nbsp;iPhone 15 Series</span>
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
            {fetchedCategories && fetchedCategories.slots[1200].content.taxonomy_nodes.map((item,index)=>{
              return (
            <div className="row" key={index} onClick={()=>{navigate(`/${item.actions[0].target.split('?')[1]}/${item.name}`)}}>
              <img src={item.image_path} alt="" />
              <p>{item.name}</p>
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
