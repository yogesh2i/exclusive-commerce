import React, { useState } from 'react';
import './login.scss';
import image from '../../assets/imges/login-img.png';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addLoggedIn } from '../counter/counterSlice';

function Login() {
  const [selectWay,setWay] = useState('signIn');
  const [name,setName] = useState('');
  const [pass,setPass] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logIn = async()=>{
    const option = {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        name,
        email,
        password: pass
      })
   }
    if(selectWay==='login'){
       const res = await fetch("http://localhost:2000/login",option);
       const r = await res.json();
       if(res.ok){
        dispatch(addLoggedIn({'isLoggedIn': true}));
        navigate('/')
       }else{
        alert(r.message)
       }
    }else{
      const res = await fetch("http://localhost:2000/signIn",option);
       const r = await res.json();
       if(res.ok){
        alert('Account created successfully');
        dispatch(addLoggedIn({'isLoggedIn': true}));
        navigate('/')
       }else{
        alert(r.message)
       }
    }
  }
  const handleWay = ()=>{
    if(selectWay==='login'){
      setWay('signIn');
    }else{
      setWay('login');
    }
  }
  return (
    <div>
      <div className="login__container">
        <img src={image} alt="" />
        <div className="login__form">
            <h4>{selectWay==='signIn'?'Create an account':'Log In to your account'}</h4>
            <h3>Enter your details below</h3>
            <form>
                {selectWay==='signIn'?<input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name}/>:null}
                <input type="email" placeholder='Email' autoComplete='username' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder='Password' autoComplete='current-password' onChange={(e)=>setPass(e.target.value)} value={pass}/>
            </form>
            <button className='create__account' onClick={logIn}>{selectWay==='signIn'?'Create Account':'Log In'}</button>
            <button className='google__log'><FcGoogle/>Sign Up with Google</button>
            <div className='already__login' onClick={handleWay}> {selectWay==='signIn'?`Already have an account? `:'Dont have an account? '}&nbsp;<span>{selectWay==='login'?`Sign In`:'Log In'}</span></div>
        </div>
      </div>
    </div>
  )
}

export default Login
