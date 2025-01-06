import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './Userdashbaord.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";

import Visibility from '@mui/icons-material/Visibility';

import DeleteIcon from "@mui/icons-material/Delete"; 

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";



const PostedJobs = () => {
  return (
   <div className="ooUserdashbaord-Page">
     <div className="navigating-ttarvs">
                <div className="site-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/"> Customer dashboardd</Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/jobs">
                        Posted Jobs </Link>
                    </p>
                </div>
            </div>

            <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Posted Jobs</h2>
            </div>

            <div className="Habgb-sec">

            <div className="My-Artisan-Body">
             
             <div className='garoo-Gird-part2'>


           <div className='Carded-Box'>
           <div className='Carded-Box-Gridd'>
   
           <div className='Carded-Box-2'>
             <div className='oo-dlsts'>
               <h3>Plumbering <span><AccessTimeIcon /> 12/12/2024</span></h3>
               <div className='oo-dlsts-110'>
               <div className='oo-dlsts-OO1'>
               <h5><CheckCircleIcon /> Active Post</h5>
               </div>
               <div className='oo-dlsts-OO2'>
               <h4><span> <Visibility /> 16.2k</span></h4>
               </div>
               </div>
             </div>
             <div className='GLnad-btns'>
               <div className='GLnad-btns-1'>
                <span>Complex Job</span>
                <span><BusinessCenterIcon /> 20 Applications</span>
                 </div>
                 <div className='GLnad-btns-2'>
                 <Link to="/user-dashboard/job-artisans">View Artisans</Link>
                 <button className="rwmovooo-btn"><DeleteIcon />Remove Job</button>

                 </div>
               </div>
           </div>
           </div>
     
           </div>

           <div className='Carded-Box'>
           <div className='Carded-Box-Gridd'>
   
           <div className='Carded-Box-2'>
             <div className='oo-dlsts'>
               <h3>Electrical <span><AccessTimeIcon /> 3/1/2025</span></h3>
               <div className='oo-dlsts-110'>
               <div className='oo-dlsts-OO1'>
               <h5><CheckCircleIcon /> Active Post</h5>
               </div>
               <div className='oo-dlsts-OO2'>
               <h4><span> <Visibility /> 100.2k</span></h4>
               </div>
               </div>
             </div>
             <div className='GLnad-btns'>
               <div className='GLnad-btns-1'>
                <span>Simple Job</span>
                <span><BusinessCenterIcon /> 23k Applications</span>
                 </div>
                 <div className='GLnad-btns-2'>
                 <Link to="/user-dashboard/job-artisans">View Artisans</Link>
                 <button className="rwmovooo-btn"><DeleteIcon />Remove Job</button>

                 </div>
               </div>
           </div>
           </div>
     
           </div>





 

 
 
         </div>
 
              
             </div>


            </div>

            </div>
            </div>
            </div>



   </div>
  );
};

export default PostedJobs;
