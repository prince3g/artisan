import React, { useState, useEffect, useRef} from "react";
import "./Css/Main.css";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";


const ForgotPassword = () => {
    return (
        <div className="Gradnded-page">
              <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Forgot Password</h2>
            </div>
            <div className="Gradnded-Box-Body filska">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">Password</label>

                  <input
                    type="password"
                    placeholder="Password"
                  />
                  </div>

                  <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">Confirm Password</label>

                  <input
                    type="password"
                    placeholder="Confirm Password"
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

export default ForgotPassword;
