import React, { useState, useEffect, useRef} from "react";
import "./Css/Main.css";



const ChangePass = () => {
    return (
        <div className="Gradnded-page">
              <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Reset Password</h2>
            </div>
            <div className="Gradnded-Box-Body filska">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">Email Address</label>

                  <input
                    type="text"
                    placeholder="Enter your email"
                  />
                  </div>


                  <div className="Gland-Cnt-Btn">
            <button type="submit" className="post-job-btn">
                  Continue
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

export default ChangePass;
