import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './ArtisanDashboard.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";

import ArtisanTopNav from './ArtisanTopNav';

import ArtisanHomePage from './ArtisanHomePage';




const ArtisanDashboard = () => {
  return (
   <div className="ArtisanDashboard-Page">
      <div className="navigating-ttarvs">
                <div className="site-container">
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
                {/* <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/jobs" element={<PostedJobs />} />
                <Route path="/job-artisans" element={<JobArtisans />} /> */}
             </Routes>


   </div>
  );
};

export default ArtisanDashboard;
