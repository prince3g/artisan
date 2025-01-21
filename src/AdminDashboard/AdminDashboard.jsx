import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './AdminDashboard.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

import AdminNav from './AdminNav';
import AdminLeftNav from './AdminLeftNav';

import AdminHomePage from './AdminHomePage';

import AdminFooter from './AdminFooter';

const AdminDashboard = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  const toggleNav = () => {
    setShowNavBar(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.AdminLeftNav') && !event.target.closest('.AA_Toggle_NAV')) {
        setShowNavBar(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`AdminDashboard-Page ${showNavBar ? 'Show_Nav_Bar' : ''}`}>

      <AdminNav toggleNav={toggleNav} />

      <div className="large-container">
        <div className="Admin_Main">
          <div className="Admin_Main_Left">
            <div className="Admin_Main_Left_Nav">
              <AdminLeftNav />
            </div>
          </div>
          <div className="Admin_Main_Right">
            <Routes>
              <Route path="/" element={<AdminHomePage />} />
              {/* Other routes */}
            </Routes>

            <AdminFooter />
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
