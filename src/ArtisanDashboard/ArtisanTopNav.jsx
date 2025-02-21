import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './ArtisanDashboard.css';
import { Link, useLocation } from "react-router-dom";

import UserPlaceholder from './Img/user-placeholder.png';

import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';



const ArtisanTopNav = () => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
   const [userImage, setUserImage] = useState(UserPlaceholder); // Default placeholder image
  const last_name = sessionStorage.getItem('user_last_name');
  const first_name = sessionStorage.getItem('user_first_name');
  const user_id= sessionStorage.getItem('user_id');
  const Address= sessionStorage.getItem('Address');
  const user_unique_user_id = localStorage.getItem('unique_user_id');
  const user_phone = sessionStorage.getItem('user_phone');
  const artisanCategoryName = sessionStorage.getItem('artisanCategoryName');


  const userData = {

    user_id,
    Address,
    first_name,
    last_name,
    user_unique_user_id,
    user_phone

  };

    // Fetch user image
    useEffect(() => {
      const user_unique_user_id = sessionStorage.getItem('unique_user_id');
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${djangoHostname}/api/accounts/auth/api/users/${user_unique_user_id}/`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          // console.log("data QWERTY")
          //  console.log(data)
          //  console.log("data QWERTY")
          
          // Update user image if available
          if (data.user_image) {
            setUserImage(data.user_image);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      if (user_unique_user_id) {
        fetchUserData();
      }
    }, [user_unique_user_id]);
  

  return (
  <div className="Artisan-TopNav">
    <div className="large-container">
    <div className="Artisan-TopNav-Main">
    <div className="Artisan-TopNav-Main-1">
        <img src={userImage}></img>
        <h3>{last_name} {first_name} <span>{artisanCategoryName}</span></h3>
    </div>
    <div className="Artisan-TopNav-Main-2">
        <ul>
           <li><Link to='/artisan-dashboard/'><DashboardIcon /> Dashboard</Link></li>
            <li><Link to='/artisan-dashboard/jobs'><WorkIcon /> Jobs</Link></li>
            <li> <Link to="/artisan-dashboard/profile-settings" state={userData}> <SettingsIcon /> Profile Settings</Link></li>
        </ul>
    </div>
    </div>
    </div>
  </div>
  );
};

export default ArtisanTopNav;
