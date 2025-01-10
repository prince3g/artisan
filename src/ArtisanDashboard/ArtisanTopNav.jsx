import React, { useState } from "react";
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

  const last_name = localStorage.getItem('user_last_name');
  const first_name = localStorage.getItem('user_first_name');


  return (
  <div className="Artisan-TopNav">
    <div className="large-container">
    <div className="Artisan-TopNav-Main">
    <div className="Artisan-TopNav-Main-1">
        <img src={UserPlaceholder}></img>
        <h3>{last_name} {first_name} <a href="#">SimserviceHub Artisan</a></h3>
    </div>
    <div className="Artisan-TopNav-Main-2">
        <ul>
           <li><Link to='/artisan-dashboard/'><DashboardIcon /> Dashboard</Link></li>
            <li><Link to='/artisan-dashboard/jobs'><WorkIcon /> Jobs</Link></li>
            <li><Link to='/artisan-dashboard/profile-settings'> <SettingsIcon /> Profile Settings</Link></li>
        </ul>
    </div>
    </div>
    </div>
  </div>
  );
};

export default ArtisanTopNav;
