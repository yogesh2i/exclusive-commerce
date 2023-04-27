
import { TbTruckDelivery } from 'react-icons/tb'
import { RiCustomerService2Line, RiSecurePaymentFill } from 'react-icons/ri'
import './extra.scss';
import React, { useRef, useEffect, useState } from 'react';




function Extra() {


  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const elementTop = elementRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div  ref={elementRef} className={` extra__container animation ${isVisible ? 'slide-in' : ''}`}>
      <div className="row">
        <p className='r1'><TbTruckDelivery/></p>
        <p className="r2">
            FREE AND FAST DELIVERY
        </p>
        <p className="r3">Free delivery for orders over $140</p>
        
      </div>
      <div className="row">
        <p className='r1'><RiCustomerService2Line/></p>
        <p className="r2">
            24/7 CUSTOMER SERVICE
        </p>
        <p className="r3">Friendly 24/7 customer support</p>
        
      </div>
      <div className="row">
        <p className='r1'><RiSecurePaymentFill/></p>
        <p className="r2">
            MONEY BACK GUARANTEE
        </p>
        <p className="r3">We reurn money within 30 days</p>
        
      </div>
    </div>
  )
}

export default Extra
