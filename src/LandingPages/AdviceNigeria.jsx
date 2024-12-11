import React from 'react';
import { Link } from 'react-router-dom';
import './Css/AdviceCentre.css';


import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AdviceIcon from './Img/advice.png';
import Authenticity from './Img/authenticity.png';

import ooAdi1 from './Img/ooAdi1.jpg';

const AdviceNigeria = () => {
  return (
   <div className='advice-page ddd-aha'>


    <div className='navigating-ttarvs'>
        <div className='site-container'>
            <p><Link to="/">Simservicehub</Link>  <ChevronRightIcon /> <Link to="/advice-centre">Advice Centre</Link> <ChevronRightIcon /> <Link to="/advice-nigeria">Essential Advice for Nigerian Customers</Link> </p>
          </div>
          </div>

    <div className='IIai-sec'>
        <div className='site-container'>
        <div className='IIai-Main'>
        <div className='IIai-1'>
        <div className='IIai-1-Box'>
        <Link to="/advice-nigeria" className="IIai-1-Box-Card active-IIai-1-Box-Card">
        <img src={AdviceIcon} alt="Advice Icon" />
        <p>Essential Advice for Nigerian Customers</p>
      </Link>
      <Link to="/benefits" className="IIai-1-Box-Card">
        <img src={Authenticity} alt="Authenticity Icon" />
        <p>How This Platform Benefits Nigerian Customers</p>
      </Link>
        </div>
        </div>
        <div className='IIai-2'>
            <div className='Ooo-header'>
                <h3 className='mid-text'>Essential Advice for Nigerian Customers</h3>
                <p>Looking to hire reliable professionals to work on your home? This platform is your one-stop solution, connecting you with trusted tradespeople across Nigeria. Our platform brings together top-quality service providers to make sure your home improvement and repair needs are handled with excellence and care. </p>
                <p>Settle in with a cup of tea, and explore these tips designed to help you find the right Artisan for every job in your home.</p>
            </div>

            <div className='Ooo-Body'>
                <img src={ooAdi1}></img>
                <h4>Starting Your Home Improvement Journey</h4>
                <p>From finding the right professional to understanding the job requirements, planning your home improvement is crucial. Whether it’s a major renovation or a minor repair, this app makes it easy to browse reliable service providers in your area, check their ratings, and choose the perfect match for your project.</p>
                <h4>Choosing the Right Artisan</h4>
                <p>When it comes to your home, trust is everything. All tradespeople on our platform go through a thorough screening process before joining, ensuring that you only hire professionals with proven skills and reliability. Each Artisan’s profile includes verified reviews, making it simple for you to pick the best.</p>
    	        <h4>Smart Budgeting and Project Planning</h4>
                <p>Taking on a home improvement project can feel overwhelming, but with our financial advice and budgeting tips, you can stay on top of costs. Our platform provides quotes from different Artisan, so you can make informed choices without breaking the bank. Additionally, with our project planning resources, you can keep track of timelines and ensure everything goes smoothly.</p>
                <h4>Enjoy Reliable and Consistent Quality</h4>
                <p>Every Artisan on our platform meets rigorous quality standards. With this app, you can expect top-quality work delivered on time. Plus, if any issues arise during or after the job, we’re here to support you in resolving them quickly.</p>

            </div>
        </div>
        </div>
        </div>
    </div>


   </div>
  );
};

export default AdviceNigeria;
