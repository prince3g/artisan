import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './ArtisanDashboard.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";

import ArtisanTopNav from './ArtisanTopNav';

import ArtisanHomePage from './ArtisanHomePage';

import ArtisanPostedJobs from './ArtisanPostedJobs';

import JobDescription from './JobDescription';
import JobDescription1 from './JobDescription1';

import ViewJobDescription from './ViewJobDescription';


import ProfileSettings from './ProfileSettings';

import ArtisanSubscription from './ArtisanSubscription';

import ArtisanReview from './ArtisanReview';

import ArtisanAvailability from './ArtisanAvailability';

import ArtisanPayout from './ArtisanPayout';


import SendQuote from './SendQuote';

import BookingList from './BookingList';





const ArtisanDashboard = () => {



    const last_name = sessionStorage.getItem('user_last_name');
    const first_name = sessionStorage.getItem('user_first_name');


  return (
   <div className="ArtisanDashboard-Page">
      <div className="navigating-ttarvs">
                <div className="large-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/artisan-dashboard/"> Artisan dashboard</Link> <ChevronRightIcon />
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
                <Route path="/job-description1" element={<JobDescription1 />} />
                <Route path="/view-job-description" element={<ViewJobDescription />} />
                <Route path="/profile-settings" element={<ProfileSettings />} />
                <Route path="/artisan-subscription" element={<ArtisanSubscription />} />
                <Route path="/availability" element={<ArtisanAvailability />} />
                <Route path="/reviews" element={<ArtisanReview />} />
                <Route path="/payout-setting" element={<ArtisanPayout />} />
                <Route path="/send-quote" element={<SendQuote />} />
                <Route path="/booking-list" element={<BookingList />} />
             </Routes>


   </div>
  );
};



export default ArtisanDashboard;
