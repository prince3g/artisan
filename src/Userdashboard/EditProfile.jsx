import React, { useState } from "react";
import "../LandingPages/Css/Main.css";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const EditProfile = () => {
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
            <Link to="/user-dashboard/"> Customer dashboardd</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/edit-profile">Edit profile</Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header uupoa">
              <h2 className="big-text">Edit your profile</h2>
              <p><Link to="/user-dashboard/">Go back</Link></p>
            </div>

            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label>First name</label>
                  <input type="text" value="Prince" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Last name</label>
                  <input type="text" value="Godson" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Phone number</label>
                  <input type="text" value="09037494084" />
                </div>

                <div className="Gland-Quest-data">
                  <label>Address</label>
                  <input type="text" value="Umuahia Abia State" />
                </div>

                <div className="Gland-Quest-data all-prolFilw">
                  <label>Upload Profile Photo (Optional)</label>
                  <input type="file" name=""/>
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

export default EditProfile;
