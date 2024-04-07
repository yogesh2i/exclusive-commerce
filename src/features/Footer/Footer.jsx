import React from 'react';
import './footer.scss';
import {AiOutlineSend} from 'react-icons/ai'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer__container'>
        <div className="footer__navigation">
      <div className="col col-1">
        <ul>
            <li><h3>Exclusive</h3></li>
            <li>Subscribe</li>
            <li>Get 10% off your first order</li>
            <li className='mail__footer'><input type="text" placeholder='Enter your email'/><AiOutlineSend/></li>
        </ul>
      </div>
      <div className="col col-2">
        <ul>
            <li><h3>Support</h3> </li>
            <li>111 Gokuldham Society, Mumbai,  DH 1515, India.</li>
            <li>exclusive@gmail.com</li>
            <li>+88085-5672-9999</li>
        </ul>
      </div>
      <div className="col col-3">
        <ul>
            <li><h3>Account</h3></li>
            <li>My Account</li>
            <li><Link to='/login'>Login/Register</Link></li>
            <li><Link to='/wishlist'>Wishlist</Link></li>
            <li><Link to='/'>Shop</Link></li>
        </ul>
      </div>
      <div className="col col-4">
        <ul>
            <li><h3>Ouick Link</h3></li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
      </div>
      <div className="copyrights">&copy; Copyright Rimel 2022. All right reserved</div>
    </div>
  )
}

export default Footer
