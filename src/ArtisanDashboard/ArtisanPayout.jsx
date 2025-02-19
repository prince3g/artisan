import React from "react";
import "../LandingPages/Css/Main.css";
import { Link } from "react-router-dom";

const ArtisanPayout = () => {
  return (
    <div className="Gradnded-page">
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header uupoa">
              <h2 className="big-text">Payout Settings</h2>
              <p>Enter your bank details here</p>
              <p><Link to="/artisan-dashboard/">Go back</Link></p>
            </div>

            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label>Bank Name</label>
                  <input type="text" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Account Number</label>
                  <input type="text" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Account Name</label>
                  <input type="text" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Account Type</label>
                 <select>
                   <option>Savings</option>
                    <option>Current</option>
                 </select>
                </div>


                <div className="Gland-Cnt-Btn">
                  <button type="submit" className="post-job-btn">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanPayout;

