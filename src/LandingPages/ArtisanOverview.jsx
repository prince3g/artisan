import React from 'react';
import { Link } from 'react-router-dom';
import './Css/ArtisanOverview.css';


import AAHeroImg from './Img/ARtA-hero-Img.png';

import GGFAGImg from './Img/GGfag-img.png';

import HghImg1 from './Img/UooaImgs/1.png';
import HghImg2 from './Img/UooaImgs/2.png';
import HghImg3 from './Img/UooaImgs/3.png';


import StatVid from './Img/stats.gif'



const ArtisanOverview = () => {
  return (
   <div className='artisan-page'>
    <div className='AA-page-header'>
        <div className='site-container'>
            <div className='AA-Hero-Sec'>
            <div className='AA-Hero-Sec-1'>
            <div className="hero-dlts-main">
                <h2 className="big-text">
                Win Local Jobs and Expand Your Business with <span>SimserviceHub</span>
                </h2>
                <p>We’re here to connect you with homeowners across Nigeria who are actively searching for trusted tradespeople like you. Join our growing platform to gain visibility and unlock access to clients looking for services in your field.</p>

                </div>
            </div>
            <div className='AA-Hero-Sec-2'>
                <img src={AAHeroImg}></img>
            </div>
            </div>
        </div>
    </div>


    <div className='GGfag-sec'>
      <div className='site-container'>
      <div className='GGfag-Top'>
        <h2 className='big-text'>Looking to find work the dependable way?</h2>
        <p>There's plenty of demand for skilled tradespeople but getting the right job at the right time can be a challenge. SimserviceHub is here to simplify the process, connecting you with leads that match your skills and availability.</p>
       <img src={GGFAGImg} />
       </div>

       <div className='GGfag-Grid'>
       <div className='GGfag-Card'>
        <h3>Find All the Work You Need</h3>
        <ul>
          <li>Thousands of Job Opportunities: With hundreds of jobs posted monthly, there’s always work waiting for you.</li>
          <li>Job Matches for Your Skills: Receive leads specifically suited to your trade and expertise.</li>
          <li>Choose Your Location: Decide where you want to work and get leads only from your chosen areas.</li>
          <li>Flexibility in Job Size: Whether it’s a large project or a quick job to fill your schedule, you’re in control of what you take on.</li>
        </ul>
       </div>
       <div className='GGfag-Card'>
        <h3>Stay in Control</h3>
        <ul>
          <li>Join Without Obligations: Sign up for free with zero commitment.</li>
          <li>Flexible Engagement: Respond to job leads only when it works for you.</li>
          <li>No Limits on Interest: Show interest in as many jobs as you want, without any cost.</li>
          <li>Be Recognized with Premium Service: Upgrade to premium and get prioritized at the top of homeowner searches for maximum visibility.</li>
        </ul>
       </div>
       <div className='GGfag-Card'>
        <h3>Build Your Reputation</h3>
        <ul>
          <li>Showcase Your Skills: Create a free profile to highlight your expertise and experience.</li>
          <li>Gain Customer Trust: Let positive reviews from satisfied clients boost your credibility.</li>
          <li>Attract More Clients: A strong reputation draws in more job opportunities, helping your business grow.</li>
        </ul>
       </div>
       </div>
       
       <div className='Jhsia-sec'>
        <h2 className='big-text'>Say Yes To Work You Want</h2>
        <Link to="artisan-sign-up">Join Now</Link>
       </div>


       <div className='Gakajs-sec'>
       <div className='Gakajs-Header'>
        <h3 className='mid-text'>Business Growth & Advice Centre</h3>
        <p>Take your business to the next level! Explore expert tips, industry insights, and strategies to build a strong reputation and attract more customers</p>
       </div>

       <div className='hgahgs-sec hash-Op'>
  <div className='hgahgs-Card'>
    <img src={HghImg1}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>Essential Tips and Tool For Tradespeople</h3>
    <Link to="/business-tips" >Read</Link>
  </div>
  </div>

  <div className='hgahgs-Card'>
    <img src={HghImg2}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>Comprehensive Vetting Process for Nigerian Tradesperson: Ensuring Trust, Quality, and Reliability</h3>
    <Link to="/vetting-process" >Read</Link>
  </div>
  </div>


  <div className='hgahgs-Card'>
    <img src={HghImg3}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>How Will Work Come My Way?</h3>
    <Link to="/how-work-comes-your-way" >Read</Link>
  </div>
  </div>


  </div>

       </div>


    <div className='Start_Vid'>
      <img src={StatVid}></img>
    </div>

      </div>
    </div>





   </div>
  );
};

export default ArtisanOverview;
