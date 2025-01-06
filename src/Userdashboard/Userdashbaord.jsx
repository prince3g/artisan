import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './Userdashbaord.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";


import EditProfile from './EditProfile';

import UserHomePage from './UserHomePage';

import PostedJobs from './PostedJobs';


import JobArtisans from './JobArtisans';



const Userdashbaord = () => {
  return (
   <div className="Userdashbaord-Page">

            <Routes>
                <Route path="/" element={<UserHomePage />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/jobs" element={<PostedJobs />} />
                <Route path="/job-artisans" element={<JobArtisans />} />
             </Routes>


   </div>
  );
};

export default Userdashbaord;
