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
        serviceInterest,
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <div className='Contact_SeccO_1'>
              <ul>
                <li>
                  <span className='DDl_Span'>
                    <img src={ChatIcon} alt='Chat icon' />
                  </span>
                  <div className='DDl_Div'>
                    <h3>Lorem Email</h3>
                    <h4><a href='#'>lorem@ipsum.com</a></h4>
                  </div>
                </li>
                <li>
                  <span className='DDl_Span'>
                    <img src={CallIcon} alt='Call icon' />
                  </span>
                  <div className='DDl_Div'>
                    <h3>Lorem Call</h3>
                    <h4>+123 456 7890, +987 654 3210</h4>
                  </div>
                </li>
                <li>
                  <span className='DDl_Span'>
                    <img src={LocationIcon} alt='Location icon' />
                  </span>
                  <div className='DDl_Div'>
                    <h3>Lorem Location</h3>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
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
                      <option value='Service 1'>Service 1</option>
                      <option value='Service 2'>Service 2</option>
                      <option value='Service 3'>Service 3</option>
                      <option value='Service 4'>Service 4</option>
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
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Visit{' '}
                    <Link to='/privacy-policy' className='ploc-ahhs'>Lorem Privacy Policy</Link>
                  </p>
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
