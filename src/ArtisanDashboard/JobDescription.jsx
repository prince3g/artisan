import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import Visibility from '@mui/icons-material/Visibility';

import DeleteIcon from "@mui/icons-material/Delete"; 

import MyLocation from '@mui/icons-material/MyLocation';
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import UserPlaceholder from './Img/user-placeholder.png';

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";



const JobDescription = () => {


  return (
   <div className="ooUserdashbaord-Page">
    
            <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Plumbering</h2>
            </div>

            <div className="Habgb-sec">

            <div className="My-Artisan-Body">
             
             <div className='garoo-Gird-part2'>


           <div className='Carded-Box'>
           <div className='Carded-Box-Gridd'>
   
           <div className='Carded-Box-2'>
             <div className='oo-dlsts'>
               <h3>Plumbering <span><AccessTimeIcon /> 12/12/2024</span></h3>
             </div>

               <div className="ahhgs-sec">
                <h3><img src={UserPlaceholder} /> Prince Godson</h3>
                <p><CheckCircleIcon /> Active</p>
               </div>

               <div className="kklauis-seds">
                <h3>What to do</h3>
                <p>Electrical fault repairs</p>
                <h3>Issues description</h3>
                <p>Simple (Items which trips the electrics identified, issues with single appliance or a few sockets)</p>
                <h3>More decription</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae laboriosam omnis molestias, eius eos nam possimus dolorem beatae laborum voluptate culpa debitis in sit similique deleniti voluptatem modi necessitatibus? Fugiat.</p>
               </div>


               <div className='GLnad-btns ggfa-btns'>
               <div className='GLnad-btns-1'>
                <span>Simple Job</span>
                <span><BusinessCenterIcon /> 20 Applications</span>
                 </div>
                 <div className='GLnad-btns-2'>
                 <button className="apply-brnsns">Apply now</button>

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

export default JobDescription;