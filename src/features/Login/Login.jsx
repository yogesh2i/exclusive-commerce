import React from 'react';
import './login.scss';
import image from '../../assets/imges/login-img.png';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  return (
    <div>
      <div className="login__container">
        <img src={image} alt="" />
        <div className="login__form">
            <h4>Create an account</h4>
            <h3>Enter your details below</h3>
            <form>
                <input type="text" placeholder='Name' />
                <input type="email" placeholder='Email' autoComplete='username'/>
                <input type="password" placeholder='Password' autoComplete='current-password'/>
            </form>
            <button className='create__account'>Create Account</button>
            <button className='google__log'><FcGoogle/>Sign Up with Google</button>
            <div className='already__login'> Already have an account? &nbsp;<span>Log In</span></div>
        </div>
      </div>
    </div>
  )
}

export default Login
