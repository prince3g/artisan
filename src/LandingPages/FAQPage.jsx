import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/FAQPage.css';
import SearchIcon from './Img/search-icon.svg';

import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorIcon from '@mui/icons-material/Error';
import EditIcon from '@mui/icons-material/Edit';

const FAQPage = () => {
  const [activeBox, setActiveBox] = useState('customer');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleBoxClick = (box) => {
    setActiveBox(activeBox === box ? null : box);
  };

  const handleFAQClick = (title) => {
    navigate('/faq-details', { state: { title, type: activeBox } });
  };

  // FAQ items for each category
  const faqData = {
    customer: [
      { title: 'My Account and Technical Issues', icon: <SettingsIcon /> },
      { title: 'My Jobs', icon: <PersonIcon /> },
      { title: 'Payments', icon: <MonetizationOnIcon /> },
      { title: 'Reviews and Guarantee', icon: <RateReviewIcon /> }
    ],
    serviceProvider: [
      { title: 'Billing', icon: <AccountBalanceWalletIcon /> },
      { title: 'Jobs', icon: <WorkIcon /> },
      { title: 'Join SimserviceHub', icon: <GroupAddIcon /> },
      { title: 'Payments', icon: <MonetizationOnIcon /> },
      { title: 'Renewals', icon: <AutorenewIcon /> },
      { title: 'Reviews', icon: <RateReviewIcon /> },
      { title: 'Technical Issues', icon: <ErrorIcon /> },
      { title: 'Update My Details', icon: <EditIcon /> }
    ]
  };

  // Filter FAQ items based on search query
  const filteredFAQs = faqData[activeBox].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='site-container'>
        <div className='Galnd-SeCs'>
          <div className='Galnd-Top'>
            <div
              className={`Galnd-Box ${activeBox === 'customer' ? 'active-Galnd-Box' : ''}`}
              onClick={() => handleBoxClick('customer')}
            >
              <span><PersonIcon /></span>
              <p>I’m a customer</p>
            </div>

            <div
              className={`Galnd-Box ${activeBox === 'serviceProvider' ? 'active-Galnd-Box' : ''}`}
              onClick={() => handleBoxClick('serviceProvider')}
            >
              <span><WorkIcon /></span>
              <p>I’m a service provider</p>
            </div>
          </div>

          <div className="Kank-Sec">
            <h4>{activeBox === 'customer' ? 'Customer Help' : 'Artisan Help'}</h4>
            <ul>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((item, index) => (
                  <li key={index} onClick={() => handleFAQClick(item.title)}>
                    <span>{item.icon}</span>
                    <p>{item.title} <ChevronRightIcon /></p>
                  </li>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </ul>
          </div>
        </div>

        <div className='OOua-secla'>
          <h3 className='mid-text'>Still need support?</h3>
          <a href='#'><WhatsAppIcon /> Message us on WhatsApp</a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
