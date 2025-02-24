

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CompletedImg from "./Img/completed-banner.svg";

const CompletedReg = ({ userData }) => {
  const navigate = useNavigate();



  const handleBackClick = () => {
    navigate("/subscription");
  };

  return (
    <div className="Arrri-Pahgs">
      <div className="large-container">
        <div className="Arrri-Pahgs-main Succ-Sec">
          <div className="Succ-Box">
            <img src={CompletedImg} alt="Completed" />
            <h3>Congratulations {userData?.user?.first_name}  {userData?.user?.last_name}</h3>
            <p>You have successfully completed the process</p>
            <h6>Your identification code:</h6>
            <h2>{userData?.identification_code}</h2>
            <button className="oo-finish-btn" onClick={handleBackClick}>
              Finish
            </button>
            <h5>
              For information and assistance <Link to="/contact-us">Help</Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedReg;
