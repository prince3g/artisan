import React, { useState } from 'react';
import axios from 'axios';
import ChatIcon from './Img/contact-chat-icon.svg';
import LocationIcon from './Img/location-icon.svg';
import CallIcon from './Img/call-icon.svg';
import { Link } from 'react-router-dom';
import FlashMessage from "../FlashMessage/FlashMessage.jsx"


function ContactUs() {

  const [flash, setFlash] = useState(null);
    
  const showMessage = (message, type) => {
      setFlash({ message, type });
  };

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${djangoHostname}/api/accounts/auth/send-contact-email/`, {
        fullName,
        email,
        phone,
        // serviceInterest,
        message,
      });

      if (response.status === 200) {
        showMessage('Your message has been sent successfully!', 'success');
        // Optionally, reset the form
        setFullName('');
        setEmail('');
        setPhone('');
        setServiceInterest('');
        setMessage('');
      }
    } catch (err) {
      setError('There was an error submitting your message. Please try again later.');
      showMessage('There was an error submitting your message. Please try again later.', 'failure');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className='Contact_Pappa'>
        <div className='contact-Dlts'>
          <div className='site-container'>
            <div className='contact-Dlts-header'>
              <h2 className='big-text'>Contact us</h2>
              <p>If you have any concerns or questions about your data, please contact the SimserviceHub Data Protection Team at the address below: 
              </p>
            </div>

            <div className='Contact_SeccO_1'>
              <ul>
                <li>
                  <span className='DDl_Span'>
                    <img src={ChatIcon} alt='Chat icon' />
                  </span>
                  <div className='DDl_Div'>
                    <h3>Email</h3>
                    <h4><a href='mailto:info@simservicehub.com'>Info@simservicehub.com </a></h4>
                  </div>
                </li>
                <li>
                  <span className='DDl_Span'>
                    <img src={CallIcon} alt='Call icon' />
                  </span>
                  <div className='DDl_Div'>
                    <h3>Phone/whatsapp</h3>
                    <h4>0201 330 9262</h4>
                    <h4>+2349066484496</h4>
                  </div>
                </li>
                <li>
                  <span className='DDl_Span'>
                    <img src={LocationIcon} alt='Location icon' />
                  </span>
                  <div className='DDl_Div'>
                    <h3>Location</h3>
                    <h4>Simul Management Solutions <br></br>SimserviceHub Head Office, </h4>
                  </div>
                </li>
              </ul>
            </div>

            <div className='message_Sec'>
  
            {flash && (
                  <FlashMessage
                  message={flash.message}
                  type={flash.type}
                  onClose={() => setFlash(null)} // Remove flash message after timeout
                  />
              )}

              <h2>Send us a message</h2>
              <form className='message-form' onSubmit={handleSubmit}>
                <div className='message-DFlex'>
                  <div className='message-form-input'>
                    <input
                      type='text'
                      name='fullName'
                      placeholder='Your Name'
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className='message-form-input'>
                    <input
                      type='email'
                      name='email'
                      placeholder='Your Email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className='message-DFlex'>
                  <div className='message-form-input'>
                    <input
                      type='tel'
                      name='phone'
                      placeholder='Your Phone'
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className='message-form-input'>
                    <select
                      name='serviceInterest'
                      required
                      value={serviceInterest}
                      onChange={(e) => setServiceInterest(e.target.value)}
                    >
                      <option value=''>-- Select Service --</option>
                      <option value='Customer'>Customer</option>
                      <option value='Artisan'>Artisan</option>
                    </select>
                  </div>

                  </div>

                <div className='message-form-input'>
                  <textarea
                    name='message'
                    placeholder='Your Message'
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {error && <div className='error-message'>{error}</div>}

                <div className='message-form-input'>
                  <p>If you feel that we have not processed your data fairly or you are not satisfied with how we have handled your personal information, please contact our privacy team.</p>
                </div>
 
                <div className='message-form-input'>
                  <button type='submit' disabled={loading}>
                    {loading ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
