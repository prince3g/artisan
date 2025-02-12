import React from 'react';
import './Css/FAQPage.css';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';

const FAQPage = () => {
  return (
    <div className='FaqPage-SS'>
      <div className='AA-page-header'>
        <div className='site-container'>
          <div className="hero-dlts-main">
            <h2 className="big-text">How can we assist you today?</h2>
            <div className='gsggs-Sarcg'>
              <input
                type='text'
                placeholder='Search for help or ask a question'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='site-container'>
        <div className='Galnd-SeCs'>
          <div className='Galnd-Top'>
            <div className='Galnd-Box'>
              <span><PersonIcon /></span>
              <p>GENERAL </p>
            </div>

            <div className='Galnd-Box'>
              <span><SecurityIcon /></span>
              <p>DATA & PRIVACY </p>
            </div>

            <div className='Galnd-Box'>
              <span><GroupIcon /></span>
              <p>ARTISANS & CUSTOMERS </p>
            </div>

            <div className='Galnd-Box'>
              <span><PaymentIcon /></span>
              <p>PAYMENTS  </p>
            </div>
          </div>
        </div>

        <div className='OOua-secla'>
          <a href='/GUIDE-ON-HOW-TO-USE-THE-SITE.pdf' target="_blank" rel="noopener noreferrer"> How to use SimserviceHub  </a>
        </div>

      </div>
    </div>
  );
};

export default FAQPage;
