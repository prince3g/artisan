import React from 'react';
import { Link } from 'react-router-dom';
import './Css/ArtisanOverview.css';


import AAHeroImg from './Img/ARtA-hero-Img.png';



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






   </div>
  );
};

export default ArtisanOverview;
