import React from 'react';
import './about.scss';
import image from '../../assets/imges/about_top.png';
import f1 from '../../assets/imges/founder-1.png';
import f2 from '../../assets/imges/founder-2.png';
import f3 from '../../assets/imges/founder-3.png';
import { BsShop } from 'react-icons/bs'
import { FaFunnelDollar, FaShopify } from 'react-icons/fa'
import { BiDollarCircle } from 'react-icons/bi'
import Extra from '../Extra/Extra';


export default function About() {
 

  return (
    <div className='about__container'>
        <div className='top'>
            <div className="text__content">
                <p className='heading'>Our Story</p>
                <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                <br />
                <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
            </div>
            <img src={image} alt="" />
        </div>
        <div  className={`center`}>
            <div className="content">
                <p className='row-1'><BsShop/></p>
                <p className='row-2'>10.5k</p>
                <p className='row-3'>Sellers active on our site</p>
            </div>
            <div className="content">
                <p className='row-1'><BiDollarCircle/></p>
                <p className='row-2'>33k</p>
                <p className='row-3'>Monthly sale on our site</p>
            </div>
            <div className="content">
                <p className='row-1'><FaShopify/></p>
                <p className='row-2'>45.5k</p>
                <p className='row-3'>Customers active on our site</p>
            </div>
            <div className="content">
                <p className='row-1'><FaFunnelDollar/></p>
                <p className='row-2'>25k</p>
                <p className='row-3'>Annual gross sale in our site</p>
            </div>
        </div>

        <div className={`bottom `}>
            <div className="row">
            <p><img src={f1} alt="" /></p>
                <p className="name">Tom Cruise</p>
                <p className="role">Founder & Chairman</p>
            </div>
            <div className="row">
            <p><img src={f2} alt="" /></p>
                <p className="name">Emma Watson</p>
                <p className="role">Managing Director</p>
            </div>
            <div className="row">
                 <p><img src={f3} alt="" /></p>
                <p className="name">Will Smith</p>
                <p className="role">Product Designer</p>
            </div>
        </div>
        <div style={{overflow:"hidden"}}>

          <Extra/>
        </div>
    </div>
  )
}
