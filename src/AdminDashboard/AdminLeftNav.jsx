import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminLeftNav = () => {
  const location = useLocation(); // Hook to get the current path

      const [showNavBar, setShowNavBar] = useState(false);
    
      const ClosetoggleNav = () => {
        showNavBar(false);
      };


  return (
    <div className="AdminLeftNav">
      <h3>Menu</h3>
      <ul>
        <li>
          <Link
            to="/admin/"
            className={location.pathname === "/admin/" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <DashboardIcon /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/artisans"
            className={location.pathname === "/admin/artisans" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <BuildIcon /> Artisans
          </Link>
        </li>
        <li>
          <Link
            to="/admin/registered-customers"
            className={location.pathname === "/admin/registered-customers" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <PeopleIcon /> Customers
          </Link>
        </li>
        <li>
          <Link
            to="/admin/view-quotes"
            className={location.pathname === "/admin/view-quotes" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <FormatQuoteIcon /> View Quotes
          </Link>
        </li>
        <li>
          <Link
            to="/admin/completed-trades"
            className={location.pathname === "/admin/completed-trades" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <AssignmentTurnedInIcon /> Completed Trades
          </Link>
        </li>
        <li>
          <Link
            to="/admin/posted-jobs"
            className={location.pathname === "/admin/posted-jobs" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <WorkIcon /> Posted Jobs
          </Link>
        </li>
        <li>
          <Link
            to="/admin/notification"
            className={location.pathname === "/admin/notification" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <NotificationsIcon /> Notification
          </Link>
        </li>
        <li>
          <Link
            to="/admin/profile-settings"
            className={location.pathname === "/admin/profile-settings" ? "Active_Admin_Nav_Icon" : ""}
            onClick={ClosetoggleNav}
          >
            <SettingsIcon /> Profile Settings
          </Link>
        </li>
        <li>
          <button>
            <LogoutIcon /> Logout
            </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminLeftNav;
