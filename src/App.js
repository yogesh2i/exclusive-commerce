import React from 'react';
import './App.scss';
import {  HashRouter, Routes } from 'react-router-dom';
import Navbar from './features/Navbar/Navbar';
import Footer from './features/Footer/Footer';
import { Route } from 'react-router';
import Home from './features/Home/Home';
import Login from './features/Login/Login';
import Contact from './features/Contact/Contact';
import About from './features/About/About';
import Wishlist from './features/Wishlist/Wishlist';
import SingleProduct from './features/SingleProduct/SingleProduct';
import CategoryItems from './features/CategoryItems/CategoryItems';
import SearchList from './features/Search/SearchList';


function App() {
 
  return (
    <div className="App">
    <HashRouter basename='/' >
      <Navbar/>
      <div className="app">

      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/product-view/:tcin' element={<SingleProduct/>}/>
          <Route path='/:id/:text' element={<CategoryItems/>}/>
          <Route path='/:keyword' element={<SearchList/>}/>
        
      </Routes>
      </div>
    <Footer/>
    </HashRouter>
    </div>
  );
}

export default App;
