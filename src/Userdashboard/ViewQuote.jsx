import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import './Userdashbaord.css';

const ViewQuote = () => {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handleAcceptQuote = () => {
    setShowPaymentOptions(true);
  };

  const handleClosePaymentOptions = () => {
    setShowPaymentOptions(false);
  };

  return (
    <div className="ooUserdashbaord-Page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/"> Customer dashboardd</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/jobs">Posted Jobs </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/jobs">Eletrical </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/job-artisans">Artisans </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/view-quote">Request Quote </Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main user-quote">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Request Quote</h2>
            </div>

            <div className="Habgb-sec">
              <div className="My-Artisan-Body">
                <div className='garoo-Gird-part2'>
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Bid</h3>
                      <p>The total Amount the Artisan is Bidding for this Job</p>
                    </div>
                    <div className="hggah-req-2">
                      <h3>NGN</h3>
                      <input type="text" value="20,000" readOnly />
                    </div>
                  </div>

                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Duration</h3>
                      <p>How long it will take to complete the Job</p>
                    </div>
                    <div className="hggah-req-2">
                      <input type="text" value="1 Week" readOnly />
                    </div>
                  </div>

                  <div className="aaggs-sec-btns">
                    <button className="accpt-qqut" onClick={handleAcceptQuote}>Accept Quote</button>
                    <button className="dec-qqut">Decline Quote</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentOptions && (
        <div className="qquqps-drops">
          <div className="site-container">
            <div className="qquqps-Box">
              <span className="Close-qquqps-Box" onClick={handleClosePaymentOptions}><CloseIcon /></span>

              <div className="qquqps-Cont exctip-pay">
                <h3>PAY VIA ESCROW</h3>
                <p>Escrow holds your payment, as soon as the artisan completes their job, the payment is made to the artisan</p>
              </div>

              <div className="qquqps-Cont">
                <h3>PAY DIRECTLY TO ARTISAN</h3>
                <p>You can pay the artisan directly for their services. This ensures a fast, secure transaction while supporting their work without intermediaries.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewQuote;