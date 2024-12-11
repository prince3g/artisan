import React from 'react';
import { Link } from 'react-router-dom';
import './Css/AdviceCentre.css';

import ooAdi2 from './Img/ooAdi2.jpg';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AdviceIcon from './Img/advice.png';
import Authenticity from './Img/authenticity.png';

const Benefit = () => {
  return (
   <div className='advice-page ddd-aha'>

    <div className='navigating-ttarvs'>
        <div className='site-container'>
            <p><Link to="/">Simservicehub</Link>  <ChevronRightIcon /> <Link to="/advice-centre">Advice Centre</Link> <ChevronRightIcon /> <Link to="/benefits">How This Platform Benefits Nigerian Customers</Link> </p>
          </div>
          </div>

    <div className='IIai-sec'>
        <div className='site-container'>
        <div className='IIai-Main'>
        <div className='IIai-1'>
        <div className='IIai-1-Box'>
        <Link to="/advice-nigeria" className="IIai-1-Box-Card">
        <img src={AdviceIcon} alt="Advice Icon" />
        <p>Essential Advice for Nigerian Customers</p>
      </Link>
      <Link to="/benefits" className="IIai-1-Box-Card active-IIai-1-Box-Card">
        <img src={Authenticity} alt="Authenticity Icon" />
        <p>How This Platform Benefits Nigerian Customers</p>
      </Link>
        </div>
        </div>
        <div className='IIai-2'>
            <div className='Ooo-header'>
                <h3 className='mid-text'>How This Platform Benefits Nigerian Customers </h3>
                <p>With so many Artisan and service providers to choose from, it’s essential to find professionals who understand the local needs and deliver consistently high-quality work. Here’s how our platform ensures you get the best service for your home:</p>
            </div>

            <div className='Ooo-Body'>
            <img src={ooAdi2}></img>
                <h4>Verified Profiles and Reviews</h4>
                <p>Each Artisan’s profile comes with authentic reviews from other Customers, so you can see what to expect before hiring.</p>
                <h4>Safety and Peace of Mind</h4>
                <p>Our rigorous vetting process means that every professional you hire through our app is screened for reliability and skill, ensuring your home is in safe hands.</p>
                <h4>Transparent Quotes and No Hidden Fees</h4>
                <p>You’ll receive upfront quotes to keep your budget on track. No surprises or extra charges, just honest service.</p>
                <h4>Support and Dispute Resolution</h4>
                <p>If you ever need assistance or have an issue with the service provided, our support team is here to help make things right.</p>
                <p>Ready to make your home improvement plans a reality? Join our app today, find the perfect Artisan for any job, and enjoy a seamless experience from start to finish. With trusted professionals, fair pricing, and all the advice you need, we’re here to make sure your home is always in excellent hands.</p>





            </div>
        </div>
        </div>
        </div>
    </div>


   </div>
  );
};

export default Benefit;
