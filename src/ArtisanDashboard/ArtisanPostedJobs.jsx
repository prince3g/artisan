import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import Visibility from '@mui/icons-material/Visibility';

import MyLocation from '@mui/icons-material/MyLocation';
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import UserPlaceholder from './Img/user-placeholder.png';

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";



const ArtisanPostedJobs = () => {



  return (
   <div className="ooUserdashbaord-Page">

            <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Jobs</h2>
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
               <h5><MyLocation /> Umuahia Abia state</h5>
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
                 <Link to="/artisan-dashboard/job-description">Job Description</Link>

                 </div>
               </div>
               <div className="ahhgs-sec">
                <h3><img src={UserPlaceholder} /> Prince Godson</h3>
                <p><CheckCircleIcon /> Active</p>
               </div>
           </div>
           </div>
     
           </div>



           <div className='Carded-Box'>
           <div className='Carded-Box-Gridd'>
   
           <div className='Carded-Box-2'>
             <div className='oo-dlsts'>
               <h3>Plumbering <span><AccessTimeIcon /> 12/12/2024</span></h3>
               <div className='oo-dlsts-110'>
               <div className='oo-dlsts-OO1'>
               <h5><MyLocation /> Umuahia Abia state</h5>
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
                 <Link to="/artisan-dashboard/job-description">Job Description</Link>

                 </div>
               </div>
               <div className="ahhgs-sec">
                <h3><img src={UserPlaceholder} /> Prince Godson</h3>
                <p><CheckCircleIcon /> Active</p>
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

export default ArtisanPostedJobs;