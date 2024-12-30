import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Css/FAQPage.css';
import SearchIcon from './Img/search-icon.svg';


import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';  // For Billing
import GroupAddIcon from '@mui/icons-material/GroupAdd';  // For Join SimserviceHub
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';  // For Payments
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RateReviewIcon from '@mui/icons-material/RateReview';  // For Reviews
import ErrorIcon from '@mui/icons-material/Error';  // For Technical Issues
import EditIcon from '@mui/icons-material/Edit';  // For Update My Details

const FAQPage = () => {

    // Set the default activeBox to 'customer' to show the Customer Help section by default
    const [activeBox, setActiveBox] = useState('customer');

    // Handle the click event on a box
    const handleBoxClick = (box) => {
      setActiveBox(activeBox === box ? null : box); // Toggle between active and inactive
    };


  return (
    <div className='FaqPage-SS'>
                  <div className='AA-page-header'>
        <div className='site-container'>
            <div className="hero-dlts-main">
                <h2 className="big-text">
                   How can we assist you today?
                </h2>

                <div className='gsggs-Sarcg'>
                    <input type='text' name='' placeholder='Search for help or ask a question' />
                    <button><img src={SearchIcon}></img>Search</button>
                </div>

                </div>
            </div>

    </div>

    <div className='site-container'>
    <div className='Galnd-SeCs'>
        <div className='Galnd-Top'>
           {/* Customer Box */}
      <div
        className={`Galnd-Box ${activeBox === 'customer' ? 'active-Galnd-Box' : ''}`}
        onClick={() => handleBoxClick('customer')}
      >
        <span><PersonIcon /></span>
        <p>I’m a customer</p>
      </div>

      {/* Service Provider Box */}
      <div
        className={`Galnd-Box ${activeBox === 'serviceProvider' ? 'active-Galnd-Box' : ''}`}
        onClick={() => handleBoxClick('serviceProvider')}
      >
        <span><WorkIcon /></span>
        <p>I’m a service provider</p>
      </div>
    </div>
      {/* Customer Help Section (shown if activeBox is 'customer') */}
      {activeBox === 'customer' && (
        <div className="Kank-Sec">
          <h4>Customer Help</h4>
          <ul>
            <li>
              <span><SettingsIcon /></span>
              <p>My Account and Technical Issues <ChevronRightIcon /></p>
            </li>
            <li>
              <span><PersonIcon /></span>
              <p>My Jobs <ChevronRightIcon /></p>
            </li>
            <li>
              <span><MonetizationOnIcon /></span>
              <p>Payments <ChevronRightIcon /></p>
            </li>
            <li>
              <span><RateReviewIcon /></span>
              <p>Reviews and Guarantee <ChevronRightIcon /></p>
            </li>
          </ul>
        </div>
      )}

      {/* Artisan Help Section (shown if activeBox is 'serviceProvider') */}
      {activeBox === 'serviceProvider' && (
        <div className="Kank-Sec">
          <h4>Artisan Help</h4>
          <ul>
            <li>
              <span><AccountBalanceWalletIcon /></span>
              <p>Billing <ChevronRightIcon /></p>
            </li>
            <li>
              <span><WorkIcon /></span>
              <p>Jobs <ChevronRightIcon /></p>
            </li>
            <li>
              <span><GroupAddIcon /></span>
              <p>Join SimserviceHub <ChevronRightIcon /></p>
            </li>
            <li>
              <span><MonetizationOnIcon /></span>
              <p>Payments <ChevronRightIcon /></p>
            </li>
            <li>
              <span><AutorenewIcon /></span>
              <p>Renewals <ChevronRightIcon /></p>
            </li>
            <li>
              <span><RateReviewIcon /></span>
              <p>Reviews <ChevronRightIcon /></p>
            </li>
            <li>
              <span><ErrorIcon /></span>
              <p>Technical Issues <ChevronRightIcon /></p>
            </li>
            <li>
              <span><EditIcon /></span>
              <p>Update My Details <ChevronRightIcon /></p>
            </li>
          </ul>
        </div>
      )}
        

    <div className='OOua-secla'>
        <h3 className='mid-text'>Still need support?</h3>
        <a href='#'><WhatsAppIcon /> Mesage us on WhatsApp</a>
    </div>


    </div>
    </div>
    </div>

  );
};

export default FAQPage;
