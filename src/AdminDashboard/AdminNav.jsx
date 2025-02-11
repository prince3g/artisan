import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminIcon from './Img/admin-icon.svg';
import AllIcon from './Img/all-arrow.svg';
import HomeIcon from './Img/home-icon.svg';
import NoticeIcon from './Img/nofi-icon.svg';
import Logo from '../assets/Img/site-logo.png';
import SearchIcon from './Img/search-icon.svg';
import AdminUu from './Img/admin_uu.jpg';


function AdminNav({ toggleNav }) {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;



  const email = sessionStorage.getItem("email");
  const userId = sessionStorage.getItem("user_id");

  const [userImage, setUserImage] = useState(""); // State to store the user image URL

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${djangoHostname}/api/accounts/auth/api/users/${userId}/`
        );
        setUserImage(response.data.user_image); // Update the state with the user image URL
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [djangoHostname, userId]);

  return (
    <div className="AdminNav">
      <div className="large-container">
        <div className="AA_Nav_Content">
          <div className="AA_LEfffa">
            <button className="AA_Toggle_NAV" onClick={toggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <Link to="/admin/" className="Amin_Logo">
              <img src={Logo} alt="Site Logo" />
            </Link>
          </div>
          <div className="AA_Nav_Icons">
            <div className="Aa_L_Dd">
              <ul>
                <li>
                  <Link to="/" className="mM_Home_aa">
                    <img src={HomeIcon} alt="Home Icon" />
                    Home
                  </Link>
                </li>
                <li>
                  <img src={AllIcon} alt="All Icon" />
                </li>
                <li>
                  <Link to="/admin/" className="AdM_Dash">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="Aa_R_Dd">
              <div className="Admin_Search_Sec">
                <button>
                  <img src={SearchIcon} alt="Search Icon" />
                </button>
                <input type="text" placeholder="Search" />
              </div>
              <ul>
                <li>
                  <Link to="/admin/notification">
                    <img src={NoticeIcon} alt="Notice Icon" />
                  </Link>
                </li>
                <li>
                  <button className="logoOut_Aa">Logout</button>
                </li>
              </ul>

              <div className="Admin_Prol">
                <div className="Aa_pp_1">
                  <img
                    src={userImage || AdminUu} // Fallback to default image
                    alt="Admin Profile"
                  />
                </div>
                <div className="Aa_pp_2">
                  <div>
                    <p>Simservicehub Admin</p>
                    <span>{email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
