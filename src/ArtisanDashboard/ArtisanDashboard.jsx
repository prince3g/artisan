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
  return (
   <div className="ArtisanDashboard-Page">
      <div className="navigating-ttarvs">
                <div className="large-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/artisan-dashboard/"> Artisan dashboardd</Link> <ChevronRightIcon />
                        <Link to="/artisan-dashboard/">
                        Ndubuisi Prince Godson </Link>
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
