import React from 'react';
import { Link } from 'react-router-dom';
import './Css/AdviceCentre.css';


import AAHeroImg from './Img/AA-hero-Img.png';

import SearchIcon from './Img/search-icon.svg';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AdviceIcon from './Img/advice.png';
import Authenticity from './Img/authenticity.png';

const AdviceCentre = () => {
  return (
   <div className='advice-page'>
    <div className='AA-page-header'>
        <div className='site-container'>
            <div className='AA-Hero-Sec'>
            <div className='AA-Hero-Sec-1'>
            <div className="hero-dlts-main">
                <h2 className="big-text">
                <span>Inspiration</span> & Advice Centre 
                </h2>
                <p>Looking for ideas and guidance? Visit our Advice Centre for industry insights, expert tips, and inspiration from our vetted Artisan.</p>

                <Link to="/"><img src={SearchIcon}></img>Search for a trade</Link>
                </div>
            </div>
            <div className='AA-Hero-Sec-2'>
                <img src={AAHeroImg}></img>
            </div>
            </div>
        </div>
    </div>

    <div className='navigating-ttarvs'>
        <div className='site-container'>
            <p><Link to="/">Simservicehub</Link>  <ChevronRightIcon /> <Link to="/advice-centre">Advice Centre</Link> </p>
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
      <Link to="/benefits" className="IIai-1-Box-Card">
        <img src={Authenticity} alt="Authenticity Icon" />
        <p>How This Platform Benefits Nigerian Customers</p>
      </Link>
        </div>
        </div>
        <div className='IIai-2'>
            <div className='Ooo-header'>
                <h3 className='mid-text'>Tailored Tips For Home Projects</h3>
                <p>We understand that each home improvement job is unique. That’s why our app includes specific advice and resources for a wide range of home projects. Here’s how we support Customers in finding the right experts for each job:</p>
            </div>

            <div className='Ooo-Body'>
                <h4>Electricians</h4>
                <p>From rewiring to lighting installation, find professionals who can safely handle all your electrical needs.</p>
                <h4>Plumbers</h4>
                <p>Whether it’s fixing leaks or installing new pipes, you’ll find trustworthy plumbers to keep your home running smoothly.</p>
                <h4>Painters & Decorators</h4>
                <p>Add a fresh look to your space with skilled painters who can bring your vision to life.</p>
                <h4>Gardeners & Landscapers</h4>
                <p>Keep your outdoor spaces lush and beautiful by hiring experts in gardening, tree surgery, and landscaping.</p>
                <h4>Carpenters & Joiners</h4>
                <p>Perfect for custom furniture, cabinetry, and woodwork projects that require a skilled hand. </p>
                <h4>Handypeople & Appliance Repair</h4>
                <p>Whether it’s a small fix or a full appliance repair, handypeople are here to make your life easier.</p>
                <h4>Builders and Construction Workers</h4>
                <p>For bigger projects like extensions or remodelling, we connect you with qualified builders you can trust.</p>



            </div>
        </div>
        </div>
        </div>
    </div>


   </div>
  );
};

export default AdviceCentre;
