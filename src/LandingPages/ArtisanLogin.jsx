import React from 'react';
import { Link } from 'react-router-dom';
import WhyBanner from './Img/why-Banner.png';
import InfoIcon from '@mui/icons-material/Info';

const Footer = () => {
  return (
    <div className='Arrri-Pahgs'>
        <div className='large-container'>
          <div className='Arrri-Pahgs-main'>
          <div className='Arrri-Pahgs-1'>
          <div className='Arrri-Pahgs-1-Main'>
            <div className='jja-Info'>
            <div className='jja-Info-1'>
                 <InfoIcon />
            </div>
            <div className='jja-Info-2'>
                <h3>Login made easy</h3>
                <p>We've added email and phone verification codes for a faster and easier login</p>
            </div>
            </div>

            <div className='hha-btn'>
                <Link to="/login">Log in</Link>
            </div>

            <div className='hha-Info'>
                <p>Not a SimserviceHub member?</p>
                <Link to="/artisan-sign-up">Sign up</Link>
            </div>

          </div>
          </div>
          <div className='Arrri-Pahgs-2'><img src={WhyBanner}></img></div>
          </div>
        </div>
    </div>
  );
};

export default Footer;
