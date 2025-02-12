import React, { useState, useEffect, useRef} from "react";
import "./Css/Main.css";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";


const VettingPage = () => {
    return (
        <div className="Gradnded-page">
              <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Artisan Vetting</h2>
            </div>
            <div className="Gradnded-Box-Body filska">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">Proof of Address</label>

                  <input
                    type="file"
                  />
                  </div>

                  <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">Proof of Identity</label>

                  <select>
                    <option>NIN</option>
                    <option>Others</option>
                  </select>

                  <input
                    type="file"
                  />
                  </div>

                  <div className="Consit-sec">
                  <input type="checkbox" />
                  <p>By clicking this box, you are confirming that you have read and agree to SimserviceHub's <Link to="/privacy-policy">Data & Privacy Policy</Link>,   <a href="/INFORMED-CONSENT-FORM.pdf" target="_blank" rel="noopener noreferrer">Informed Consent Form</a>, And <Link to="/contract-agreement">Contract Agreement</Link>.
                  </p>
                  </div>

                  <div className="Gland-Cnt-Btn">
            <button
                  type="submit"
                  className="post-job-btn"
                >
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

export default VettingPage;
