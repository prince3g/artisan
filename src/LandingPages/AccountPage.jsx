import React from 'react';
import { Link } from 'react-router-dom';
import WhyBanner from './Img/why-Banner.png';
import InfoIcon from '@mui/icons-material/Info';

const AccountPage = () => {
  return (
    <div className='Arrri-Pahgs'>
        <div className='large-container'>
          <div className='Arrri-Pahgs-main'>
          <div className='Arrri-Pahgs-1'>
          <div className='Arrri-Pahgs-1-Main'>
            <div className='jja-Info'>
                <h2 className='big-text'>Login</h2>
                <div className='hha-btn'>
                <Link to="/login">Customer Login</Link>
            </div>
            <p>Don't have an account? <Link to="/customer-signup">Create account</Link></p>

            <div className='gland-pal'>
            <div className='hha-btn'>
                <Link to="/login">Artisan Login</Link>
            </div>
            <p>Want to join SimserviceHub? <Link to="/artisan-sign-up">Sign Up</Link></p>
            </div>
            </div>

          </div>
          </div>
          <div className='Arrri-Pahgs-2'><img src={WhyBanner}></img></div>
          </div>
        </div>
    </div>
  );
};

export default AccountPage;
