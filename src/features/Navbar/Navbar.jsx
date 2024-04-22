import React, { useEffect, useState } from 'react';
import './navbar.scss';
import {AiOutlineClose, AiOutlineHeart, AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai';
import {BsCart2} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search/Search';
import { removeLoggedIn, setQuery } from '../counter/counterSlice';



function Navbar() {
  const [showSearch,setSearch] = useState(false);
  const [showMenu,setShowMenu] = useState(false);
  const [showCart,setShowCart] = useState(false);
  const [getScrolled,setScrolled] = useState(false);
  const showCartCount = useSelector((state)=>(state.counter.cartItems));
  const wishlist = useSelector((state)=>(state.counter.wishlist));
  const loggedin = useSelector((state)=>(state.counter.loggedIn));
  const dispatch = useDispatch();
  const handleScroll=()=>{
    const offset = window.scrollY;
    if(offset>80){
      setScrolled(true);
    }else{
      setScrolled(false);
    }
  }

  const handleSearch=(e)=>{
     dispatch(setQuery(e.target.value))
  }
  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
  },[]);

  function searchVisibility(state){
  
    setSearch(state)
  }
 
  return (
    <>
    
    {showCart && <Cart setShowCart={setShowCart}/>}
            <div className={`main__container ${getScrolled?'sticky-header':"stick-back"}`}>
    <div>
      {showMenu? <div className="hidden__nav">
        <div style={{textAlign: "end"}} onClick={()=>setShowMenu(!showMenu)}><AiOutlineClose/></div>
      <div className="center">
                <ul>
                    <li className="nav__Items"><Link to='/' onClick={()=>setShowMenu(!showMenu)} >Home</Link></li>
                    <li className="nav__Items"><Link to='/contact'  onClick={()=>setShowMenu(!showMenu)} >Contact Us</Link></li>
                    <li className="nav__Items"><Link to='/about'  onClick={()=>setShowMenu(!showMenu)} >About</Link></li>
                    {!loggedin?.isLoggedIn?<li className="nav__Items"><Link to='/login'  onClick={()=>setShowMenu(!showMenu)} >Sign Up</Link></li>:
                    <li className="nav__Items"><span  onClick={()=>{setShowMenu(!showMenu); dispatch(removeLoggedIn({"loggedIn":false}))}} >Logout</span></li>}
                </ul>
            </div>
            </div>
:null}


        <div className="content">
            <div className="left">
                <span className="logo"><Link to='/'>EXCLUSIVE</Link></span>
            </div>
            <div className="center">
                <ul>
                    <li className="nav__Items"><Link to='/'>Home</Link></li>
                    <li className="nav__Items"><Link to='/contact'>Contact Us</Link></li>
                    <li className="nav__Items"><Link to='/about'>About</Link></li>
                    {!loggedin?.isLoggedIn?<li className="nav__Items"><Link to='/login'>Sign Up</Link></li>:
                    <li className="nav__Items"><span style={{"cursor":"pointer"}}onClick={()=>{dispatch(removeLoggedIn({"loggedIn":false}))}}>Logout</span></li>}
                </ul>
            </div>
            <div className="right">
                <span onClick={(e)=>{ e.stopPropagation() ;setSearch(true)}} onChange={(e)=>handleSearch(e)} ><span  className='search__bar'><input type="text" placeholder='What are you looking for?' /><AiOutlineSearch/></span>
       {showSearch?<Search visibility={searchVisibility}/>:null}
   
                </span>
                <span className='count_box'><Link to='/wishlist'><AiOutlineHeart/> </Link>{wishlist && <span className='count' style={{visibility:wishlist.length===0?'hidden':'visible'}}>{wishlist.length}</span>}</span>
                <span className='count_box' onClick={()=>setShowCart(!showCart)}><BsCart2/>{ showCartCount && <span className='count' style={{visibility:showCartCount.length===0?'hidden':'visible'}}>{showCartCount.length}</span>}</span>
                <span className='nav__hider' onClick={()=>setShowMenu(!showMenu)} ><AiOutlineMenu/></span>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
