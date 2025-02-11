import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './ArtisanDashboard.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";

import ArtisanTopNav from './ArtisanTopNav';

import ArtisanHomePage from './ArtisanHomePage';

import ArtisanPostedJobs from './ArtisanPostedJobs';

import JobDescription from './JobDescription';

import ProfileSettings from './ProfileSettings';




const ArtisanDashboard = () => {



    const last_name = sessionStorage.getItem('user_last_name');
    const first_name = sessionStorage.getItem('user_first_name');


  return (
   <div className="ArtisanDashboard-Page">
      <div className="navigating-ttarvs">
                <div className="large-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/artisan-dashboard/"> Artisan dashboardd</Link> <ChevronRightIcon />
                        <Link to="/artisan-dashboard/">
                        {last_name} {first_name} </Link>
                    </p>
                </div>
            </div>

            <ArtisanTopNav />


            <Routes>
                <Route path="/" element={<ArtisanHomePage />} />
                <Route path="/jobs" element={<ArtisanPostedJobs />} />
                <Route path="/job-description" element={<JobDescription />} />
                <Route path="/profile-settings" element={<ProfileSettings />} />
             </Routes>


   </div>
  );
};

export default ArtisanDashboard;
