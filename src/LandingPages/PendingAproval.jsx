import React from 'react';
import { Link } from 'react-router-dom';
import PendingImg from './Img/pending-banner.svg';

const PendingAproval = () => {
  return (
    <div className='Arrri-Pahgs'>
        <div className='large-container'>
          <div className='Arrri-Pahgs-main Succ-Sec'>

            <div className='Succ-Box'>
                <img src={PendingImg}></img>
                <h3>Profile pending</h3>
                <h6>Verification ongoing (This will be for 24hours)</h6>
            </div>
        
          </div>
        </div>
    </div>
  );
};

export default PendingAproval;
