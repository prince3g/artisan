import React from 'react';
import { Link } from 'react-router-dom';
import CompletedImg from './Img/completed-banner.svg';

const CompletedReg = () => {
  return (
    <div className='Arrri-Pahgs'>
        <div className='large-container'>
          <div className='Arrri-Pahgs-main Succ-Sec'>

            <div className='Succ-Box'>
                <img src={CompletedImg}></img>
                <h3>Congratulations</h3>
                <p>You have successfully completed the process</p>
                <h6>Your identification code:</h6>
                <h2>SSH122401</h2>
                <button className='oo-finish-btn'>Finish</button>
                <h5>For information and assistance <Link to="/contact-us">Help</Link></h5>
            </div>
        
          </div>
        </div>
    </div>
  );
};

export default CompletedReg;
