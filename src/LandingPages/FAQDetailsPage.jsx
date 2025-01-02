import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/FAQPage.css';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FAQDetailsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { title } = state || {};

  const faqDataMap = {
      'My Account and Technical Issues': [
        {
          question: "I'm struggling to attach photos to my job.",
          answer: "To attach photos, go to the Inbox tab and tap the Add Attachments button in the chat. You can either take a new photo or upload one from your device's library. Ensure you grant the app permission to access your photo library if prompted."
        },
        {
          question: "I can't log-in to my account or I haven't received the email with my login code.",
          answer: "Make sure your email address is entered correctly. Check your junk or spam folder for the code. If you don’t receive the code within 2 minutes, click Resend."
        },
        {
          question: "How do I delete my SimserviceHub account?",
          answer: "To delete your account, navigate to the Account section within your profile settings on the web app. Select Close Account and follow the on-screen instructions to complete the process."
        },
        {
          question: "How do I send feedback about the website or the app?",
          answer: "We value your feedback and suggestions to improve your experience on SimserviceHub. Please email your ideas to info@simservicehub.com."
        }
      ],
      'My Jobs': [
        {
          question: "How can I remove my job from other trades now I have agreed to a quote with someone?",
          answer: "If you’ve had a conversation with a service provider, are satisfied with their quote, and have decided to book the job, you can remove the job from other service providers by: \n1. Tapping on 'My Jobs.' \n2. Selecting the three dots (...) next to the service provider you wish to remove the job from. \n3. Tapping 'Withdraw Request.' \n4. This action will remove your job request from that service provider. If there are multiple providers you would like to remove, you will need to repeat these steps for each one."
        },
        {
          question: "Can I block or report trades if I receive inappropriate or abusive messages?",
          answer: "Yes, you can block and report a service provider if you're receiving inappropriate or abusive messages. Follow these steps: \n1. Open the chat with the service provider. \n2. Tap the three dots (…) in the top-right corner of the screen. \n3. Select 'Block and Report Service Provider.' Your safety and the security of your messages are our top priority. We will review the report, investigate the issue, and stop any further messages from being sent to you."
        },
        {
          question: "Can I edit or delete a message to a trade?",
          answer: "Yes, you can delete or edit a message through the Inbox tab of your account. Follow these steps: \n1. Open the chat with the service provider where you want to delete or edit the message. \n2. Press and hold the specific message until a menu appears. \n3. Select either 'Edit Message' or 'Delete Message.' Please note that this can only be done within 15 minutes of sending the message."
        },
        {
          question: "How do I cancel an appointment or job that I have with a trade?",
          answer: "To cancel an appointment, simply send a message to the service provider through the chat feature, and they will handle the cancellation for you."
        },
        {
          question: "What happens after I've posted my job?",
          answer: "After posting your job, nearby service providers will be notified and can decide whether to express interest. Additionally, you have the option to invite up to 10 service providers yourself. Once providers express interest, you will receive email notifications. You can then review their profiles and ratings before shortlisting those you would like to connect with. Contact details will only be shared once you approve."
        },
        {
          question: "Can I post jobs for multiple homes using one account?",
          answer: "Yes, you can create job postings for multiple properties using a single account. Be sure to input the correct area for each job to ensure it is shared with local service providers near the property location."
        },
        {
          question: "How long should I usually expect to wait before a trade replies to my message?",
          answer: "Most service providers typically respond within 1-2 working days. If you haven’t received a response, you can send a follow-up message through the chat feature. To ensure timely assistance, you can also expand your search by adding more service providers to your job posting. Simply go to the job details, tap the three dots, and select 'Add more providers.' This action will notify additional professionals who may be interested in your job, giving you more options to choose from. For the best experience, consider reaching out to multiple providers to secure a prompt reply."
        },
        {
          question: "I don't want to proceed with a trade, what should I do?",
          answer: "To cancel a request with a service provider, navigate to the ‘My Jobs’ tab in your account. Select the job you wish to update and locate the service provider’s name you no longer want to proceed with. Tap the three dots (...) next to their name, select ‘Withdraw Request,’ and follow the on-screen instructions to complete the process. If you are managing multiple jobs or providers, repeat this action for each one as needed. Withdrawing requests helps ensure your job listing remains accurate and visible to other interested providers. For further assistance, feel free to contact our support team through the Help & Support section in the app."
        },
        {
          question: "Does it cost anything to post my job?",
          answer: "Posting a job on SimserviceHub is entirely free for customers. You can create and publish job requests without any charges, allowing you to find reliable service providers quickly and easily. By posting a job, you open the door to connecting with skilled professionals in your area who can meet your specific needs. The process is simple, transparent, and designed to prioritize your convenience, letting you focus on finding the best match for your job requirements."
        }
      ],
    
    'Payments': [
      { question: 'How do I get a receipt?', answer: 'Go to "Payment History".' },
      { question: 'How do I get a receipt?', answer: 'Go to "Payment History".' },
    ],
    'Reviews and Guarantee': [
      { question: 'How do I leave a review?', answer: 'Click "Leave a Review" after a job is completed.' },
      { question: 'What is the guarantee policy?', answer: 'Issues reported within 30 days are covered.' },
    ],
    'Billing': [
      { question: 'How do I view my billing history?', answer: 'Go to the "Billing" section in your dashboard.' },
      { question: 'How do I update my billing info?', answer: 'Click "Update Billing Info".' },
    ],
    'Jobs': [
      { question: 'How do I apply for a job?', answer: 'Visit the "Jobs" section and click "Apply".' },
      { question: 'How do I track job status?', answer: 'Job status is visible in your dashboard.' },
    ],
    'Join SimserviceHub': [
      { question: 'What is SimserviceHub?', answer: 'It is a platform connecting service providers with customers.' },
      { question: 'How do I join?', answer: 'Click "Join Now" on the homepage.' },
    ],
    'Renewals': [
      { question: 'How do I renew my subscription?', answer: 'Go to the "Subscription" section and click "Renew".' },
      { question: 'Can I set up auto-renewal?', answer: 'Yes, enable auto-renewal in the billing settings.' },
    ],
    'Reviews': [
      { question: 'How do I read customer reviews?', answer: 'Go to the "Reviews" section on your profile.' },
      { question: 'How do I respond to reviews?', answer: 'Click "Respond" below the review.' },
    ],
    'Technical Issues': [
      { question: 'What should I do if I encounter a technical issue?', answer: 'Contact support via the "Help" section.' },
      { question: 'How do I report bugs?', answer: 'Submit a bug report under "Feedback".' },
    ],
    'Update My Details': [
      { question: 'How do I update my contact information?', answer: 'Go to "My Profile" and click "Edit Details".' },
      { question: 'Can I change my email address?', answer: 'Yes, go to account settings to update your email.' },
    ],
  };


  const faqData = faqDataMap[title] || [];
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="FaqPage-SS">
      <div className="AA-page-header">
        <div className="site-container">
          <div className="hero-dlts-main">
            <h2 className="big-text">FAQ - {title}</h2>
            <div className="gsggs-Sarcg">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="site-container">
        <div className="Galnd-SeCs">
          <button className="back-button" onClick={() => navigate('/faq')}>
            <ArrowBackIcon /> Back to FAQ
          </button>

          <div className="faq-accordion">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button className="faq-question" onClick={() => toggleAccordion(index)}>
                    <span>{faq.question}</span>
                    {openIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </button>
                  {openIndex === index && (
                    <div className="faq-answer">
                      <h3>Answer:</h3>
                      {faq.answer.split('\n').map((line, i) => {
                        if (line.trim().startsWith('0.')) {
                          const items = line.split(/\d+\./).filter((item) => item.trim());
                          return (
                            <ol key={`ol-${i}`}>
                              {items.map((item, j) => (
                                <li key={`ol-item-${j}`}>{item.trim()}</li>
                              ))}
                            </ol>
                          );
                        } else if (line.trim().startsWith('- ')) {
                          const items = line.split('- ').filter((item) => item.trim());
                          return (
                            <ul key={`ul-${i}`}>
                              {items.map((item, j) => (
                                <li key={`ul-item-${j}`}>{item.trim()}</li>
                              ))}
                            </ul>
                          );
                        } else if (line.trim().length > 0) {
                          return <p key={`paragraph-${i}`}>{line}</p>;
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>

        <div className="OOua-secla">
          <h3 className="mid-text">Still need support?</h3>
          <a href="#">
            <WhatsAppIcon /> Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQDetailsPage;
