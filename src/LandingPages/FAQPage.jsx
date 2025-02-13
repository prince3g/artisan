import React, { useState } from 'react';
import './Css/FAQPage.css';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';

const faqData = {
  general: [
    { question: 'What is SimServiceHub?', answer: 'SimserviceHub is Nigeria\'s trusted platform for connecting Customers and businesses with skilled tradespeople.' },
    { question: 'How does SimServiceHub work?', answer: 'We work by connecting vetted, skilled & tested artisans with customers (homeowners, companies & businesses).' },
    { question: 'How do I register on SimServiceHub?', answer: 'As an Artisan, you register by clicking on the “Artisan Signup” button and following the prompt to register. As a Customer, you register by clicking on the “Customer Signup” button and following the prompt to register.' },
    { question: 'Is SimServiceHub available in all regions of Nigeria?', answer: 'For now, we are based in three states – Lagos, Abuja & PortHarcourt. We aim to expand to all 36 states in the country in due time.' },
    { question: 'Is the SimServiceHub App free to use?', answer: 'For customers, the App is free to use whereas for Artisans, there are several packages with discounts that you can subscribe to.' }
  ],
  privacy: [
    { question: 'Is my data secure on SimServiceHub?', answer: 'Yes, your data is secure on our platform as we use safe and secure storage clouds to hold your information, and this is only accessible to those that have the right to view your data.' },
    { question: 'What should I do if I think my account has been compromised?', answer: 'Kindly reach out to us via our various channels including chatbox, mobile number, email and social media handles and we will proffer a solution for you.' },
    { question: 'Do you share my data with third parties?', answer: 'As an Artisan, your data is only shared with the organization that does the vetting and verification of this data as well as with the customers that require your services.' },
    { question: 'How long is my data stored for?', answer: 'As a data subject, you have the right to inform us of how long you would like us to store your data. As an organization, we can only store your data for as long as you are still with the platform. If in the instance that you are no longer willing to work with the platform, we will erase your data from our systems.' },
    { question: 'What kind of data is required by SimServiceHub?', answer: 'Personal data such as full names, address, date of birth, NIN and more are required by SimServiceHub for both artisans & customers.' }
  ],
  "Artisans and Customers": [
    { question: 'Can I review the artisans I hire?', answer: 'As a customer, you have the right to review the artisans that you would like to hire to do a particular job for you as we (SimServiceHub) would have done the necessary vetting of these artisans.' },
    { question: 'What happens if an artisan doesn\'t complete the job as promised?', answer: 'As a customer, if an artisan does not complete a job as promised, you have the right to reach out to us (SimServiceHub) and lay a complaint, of which, we will carry out the necessary investigations and proffer a solution to the issue. E.g., getting the artisan to come and complete the job OR getting another artisan to do the job properly.' },
    { question: 'How do you ensure the quality of artisans listed on the platform?', answer: 'We carry out essential vetting of these artisans and their works before enrolling them in our platform, hence, we ensure that the artisans we enrol are qualified, experienced and can do the job properly.' },
    { question: 'How can I update my profile information?', answer: 'As an artisan and customer, you can update your profile by visiting your dashboard and making the necessary updates to your profile.' },
    { question: 'Do you provide support for disputes between clients and artisans?', answer: 'Our primary responsibility is to ensure a seamless transaction between clients and artisans; hence, we provide timely and effective support for any disputes between both parties.' },
    { question: 'How do I ensure that the client is genuine?', answer: 'As an artisan, you need not worry about the genuineness of the client as we would have done our thorough investigation before sending you out to meet them.' },
    { question: 'What if I need to cancel or reschedule an appointment with an artisan or a client?', answer: 'As a customer, if you need to reschedule an appointment with an artisan, it is imperative that you reach out to us in a timely and effective manner, so the necessary adjustments are made to the appointment. As an artisan, if you need to reschedule an appointment with a customer, it is also imperative that you reach out to us so we can liaise with the customer and see if it is feasible OR not for them.' }
  ],
  payments: [
    { question: 'What payment methods are accepted?', answer: 'We accept credit/debit cards and mobile payments...' },
    { question: 'Can I get a refund?', answer: 'Refunds are subject to our policy, which can be found...' }
  ]
};

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFAQs = activeCategory
    ? faqData[activeCategory].filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className='FaqPage-SS'>
      <div className='AA-page-header'>
        <div className='site-container'>
          <div className='hero-dlts-main'>
            <h2 className='big-text'>How can we assist you today?</h2>
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
        {!activeCategory ? (
          <div className='Galnd-SeCs'>
            <div className='Galnd-Top'>
              <div className='Galnd-Box' onClick={() => setActiveCategory('general')}>
                <span><PersonIcon /></span>
                <p>GENERAL</p>
              </div>
              <div className='Galnd-Box' onClick={() => setActiveCategory('privacy')}>
                <span><SecurityIcon /></span>
                <p>DATA & PRIVACY</p>
              </div>
              <div className='Galnd-Box' onClick={() => setActiveCategory('Artisans and Customers')}>
                <span><GroupIcon /></span>
                <p>ARTISANS & CUSTOMERS</p>
              </div>
              <div className='Galnd-Box' onClick={() => setActiveCategory('payments')}>
                <span><PaymentIcon /></span>
                <p>PAYMENTS</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='faq-section'>
            <button className='FF-back-button' onClick={() => setActiveCategory(null)}>← Back</button>
            <h3 className='FAQ_H3'>{activeCategory.toUpperCase()}</h3>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div key={index} className='faq-item'>
                  <details>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
        {!activeCategory && (
          <div className='OOua-secla'>
            <a href='/GUIDE-ON-HOW-TO-USE-THE-SITE.pdf' target='_blank' rel='noopener noreferrer'>
              How to use SimserviceHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
