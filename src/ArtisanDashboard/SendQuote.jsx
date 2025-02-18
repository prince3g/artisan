import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendQuote = () => {
  const [bidAmount, setBidAmount] = useState();
  const navigate = useNavigate();

  // Calculate service fee and amount to receive
  const serviceFee = (bidAmount * 0.1).toFixed(2);
  const receiveAmount = (bidAmount - serviceFee).toFixed(2);

  return (
    <div className="ooUserdashbaord-Page">
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Send Quote</h2>
            </div>

            <div className="Habgb-sec">
              <div className="My-Artisan-Body">
                <div className="garoo-Gird-part2">

                  {/* Bid Input */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Bid</h3>
                      <p>What is the total amount you'd like to bid for this job?</p>
                    </div>
                    <div className="hggah-req-2">
                      <h3>NGN</h3>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Service Fee Calculation */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>10% Freelancer Service Fee</h3>
                    </div>
                    <div className="hggah-req-2 muteddd-inpt">
                      <h3>NGN</h3>
                      <input type="number" value={`-${serviceFee}`} placeholder="0.00" readOnly />
                    </div>
                  </div>

                  {/* Amount to Receive Calculation */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>You'll Receive</h3>
                      <p>The estimated amount you'll receive after service fees</p>
                    </div>
                    <div className="hggah-req-2 muteddd-inpt">
                      <h3>NGN</h3>
                      <input type="number" value={receiveAmount} placeholder="0.00" readOnly />
                    </div>
                  </div>

                  {/* Duration Dropdown */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Duration</h3>
                      <p>How long do you think this project will take?</p>
                    </div>
                    <div className="hggah-req-2">
                      <select>
                        <option>1 week</option>
                        <option>2 weeks</option>
                        <option>3 weeks</option>
                        <option>1 month</option>
                        <option>2 months</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="aaggs-sec-btns">
                    <button className="accpt-qqut">Send Quote</button>
                    <button className="dec-qqut" onClick={() => navigate(-1)}>Cancel</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SendQuote;
