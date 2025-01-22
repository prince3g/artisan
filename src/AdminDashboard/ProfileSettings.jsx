import React from "react";
import "../LandingPages/Css/Main.css";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
  return (
    <div className="Gen_Admin_BBD">

<div className="top-sec-main Gen_Admin_Header">
        <h3>Profile Settings</h3>
      </div>

      <div className="tran-card">
      <div className="tran-card-tableSec">
                <div className="Gland-Quest-data">
                  <label>First name</label>
                  <input type="text" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Last name</label>
                  <input type="text" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Phone number</label>
                  <input type="text" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Address</label>
                  <input type="text" />
                </div>

                <div className="Gland-Quest-data all-prolFilw">
                  <label>Upload Profile Photo (Optional)</label>
                  <input type="file" />
                </div>

                <div className="Gland-Cnt-Btn">
                  <button type="submit" className="post-job-btn">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
  );
};

export default ProfileSettings;
