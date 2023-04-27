import React from 'react';
import './contact.scss';
import {MdOutlineCallEnd} from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai';

function Contact() {
  return (
    <div className='contact__container'>
        <div className="left">
            <div className="upper">
            <p className='f1'><MdOutlineCallEnd/>&nbsp;Call To Us</p>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: &nbsp; +888-7889-9999</p>
            </div>
            <div className="lower">
                <p className='f1'><AiOutlineMail/> &nbsp; Write to Us</p>
                <p>Fill out our form we will contact you within 24 hours.</p>
                <p>Email: &nbsp;exclusive@gmail.com</p>
                <p>Email: &nbsp;exclusiveExpert@gmail.com</p>
            </div>
        </div>
        <div className="right">
            <div className="info">
                <input type="text" placeholder='Your Name' />
                <input type="email" placeholder='Your Email' />
                <input type="number" placeholder='Your Phone' />
            </div>
            <textarea  cols="20" rows="10" placeholder='Your Message'></textarea>
            <div className="submit__btn">
                <button>Send Message</button>
            </div>
        </div>
      
    </div>
  )
}

export default Contact
