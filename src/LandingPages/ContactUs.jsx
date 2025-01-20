import React from 'react';

import ChatIcon from './Img/contact-chat-icon.svg';
import LocationIcon from './Img/location-icon.svg';
import CallIcon from './Img/call-icon.svg';

import { Link } from 'react-router-dom';

function ContactUs() {

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
                  <img src={ChatIcon} alt='Chat icon'></img>
                </span>
                <div className='DDl_Div'>
                  <h3>Lorem Email</h3>
                  <h4><a href='#'>lorem@ipsum.com</a></h4>
                </div>
              </li>


              <li>
                <span className='DDl_Span'>
                  <img src={CallIcon} alt='Call icon'></img>
                </span>
                <div className='DDl_Div'>
                  <h3>Lorem Call</h3>
                  <h4>+123 456 7890, +987 654 3210</h4>
                </div>
              </li>

              <li>
                <span className='DDl_Span'>
                  <img src={LocationIcon} alt='Location icon'></img>
                </span>
                <div className='DDl_Div'>
                  <h3>Lorem Location</h3>
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                </div>
              </li>


              <li>
                <span className='DDl_Span'>
                  <img src={LocationIcon} alt='Location icon'></img>
                </span>
                <div className='DDl_Div'>
                  <h3>Lorem Ipsum Location</h3>
                  <h4>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</h4>
                </div>
              </li>


            </ul>
          </div>


          <div className='message_Sec'>
            <h2>Send us message</h2>
            <form className='message-form'>
              <div className='message-DFlex'>
              <div className='message-form-input'>
                <input type='text' name='' placeholder='Lorem Name' required></input>
              </div>
              <div className='message-form-input'>
              <input type='text' name='' placeholder='Lorem Email' required></input>
              </div>
              </div>
              <div className='message-DFlex'>
              <div className='message-form-input'>
              <input type='text' name='' placeholder='Lorem Phone' required></input>
              </div>
              <div className='message-form-input'>
              <select required>
                    <option>--Lorem Select--</option>
                    <option>Lorem Option 1</option>
                    <option>Lorem Option 2</option>
                    <option>Lorem Option 3</option>
                    <option>Lorem Option 4</option>
                   </select>
              </div>
              </div>
              <div className='message-form-input'>
                <textarea placeholder='Lorem Message' required></textarea>
              </div>
              <div className='message-form-input'>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Visit <Link to='/privacy-policy' className='ploc-ahhs'>Lorem Privacy Policy</Link>
                </p>
              </div>
              <div className='message-form-input'>
                      <button>Lorem Submit</button>
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
