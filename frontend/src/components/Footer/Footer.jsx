import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
         <img src={assets.logo} alt=''/>
         <p>Crispy App envisions transforming food delivery by offering fast, reliable service, diverse cuisines, and seamless user experience, connecting customers with their favorite local restaurants.</p>
         <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
         </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
           <h2>GET IN TOUCH</h2>
           <ul>
            <li>+91-9835776958</li>
            <li>contact@crispy.com</li>
           </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">copyright 2024 © Crispy.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
