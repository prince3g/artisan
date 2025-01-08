import React, { useState } from "react";
import "./Css/Main.css";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CostumerLogin3 = () => {
  // State to track which button is active
  const [activeButton, setActiveButton] = useState(null);

  // Function to toggle button active state
  const toggleActive = (button) => {
    setActiveButton((prev) => (prev === button ? null : button)); // Toggle the button's active state
  };

  return (
    <div className="Gradnded-page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />{" "}
            <Link to="/customer-login"> Customer Sign up or create account CostumerLogin3</Link>{" "}
            <ChevronRightIcon />
            <Link to="/complete-profile"> Complete profile</Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header uupoa">
              <h2 className="big-text">Complete your profile</h2>
              <p>Complete your account details for <strong>princegodson24@gmail.com</strong></p>
              <p>Not you? <Link to="/customer-login">Go back</Link></p>
            </div>

            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label>First name</label>
                  <input type="text" placeholder="Type your first name" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Last name</label>
                  <input type="text" placeholder="Type your last name" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Phone number</label>
                  <input type="text" placeholder="Type your phone number" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Address</label>
                  <input type="text" placeholder="Type your address" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Marketing communications</label>
                  <p className="hhoa-P">
                    Stay in the loop! Opt in to communications to receive new
                    alerts, helpful advice, and other marketing messages.
                  </p>
                  <ul className="jjhs-Ull">
                    <li>
                      Email{" "}
                      <button
                        className={activeButton === "email" ? "active-OOBtnPush" : ""}
                        onClick={() => toggleActive("email")}
                      >
                        {/* Optionally add text here if needed */}
                      </button>
                    </li>
                    <li>
                      Push notifications{" "}
                      <button
                        className={activeButton === "push" ? "active-OOBtnPush" : ""}
                        onClick={() => toggleActive("push")}
                      >
                    
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="Gland-Cnt-Btn">
                                    <button type="submit" className="post-job-btn">
                                        Create and account
                                    </button>
                                </div>

                <div className="ghha-foot">
                  <p>By creating an account you confirm that you agree to our website <Link to="/terms-of-use">terms of use</Link> and our <Link to="/privacy-policy"> privacy notice</Link>.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostumerLogin3;
