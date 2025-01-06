import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './Userdashbaord.css';
import { Link, useLocation } from "react-router-dom";


import Star from '@mui/icons-material/Star'; 
import Favorite from '@mui/icons-material/Favorite'; 
import Handyman from '@mui/icons-material/Handyman';
import MyLocation from '@mui/icons-material/MyLocation';
import Visibility from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import HghImg1 from '../LandingPages/Img/hghImgs/1.png';
import HghImg2 from '../LandingPages/Img/hghImgs/2.png';
import HghImg3 from '../LandingPages/Img/hghImgs/3.png';



const JobArtisans = () => {
  return (
   <div className="ooUserdashbaord-Page">
     <div className="navigating-ttarvs">
                <div className="site-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/"> Customer dashboardd</Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/jobs">Posted Jobs </Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/jobs">Eletrical </Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/job-artisans">Artisans </Link>
                    </p>
                </div>
            </div>

            <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Artisans (Electrical)</h2>
            </div>

            <div className="Habgb-sec">

            <div className="My-Artisan-Body">
             
             <div className='garoo-Gird-part2'>
           <div className='Carded-Box'>
           <div className='Carded-Box-Grid'>
           <div className='Carded-Box-1'>
             <img src={HghImg1}></img>
           </div>
           <div className='Carded-Box-2'>
             <div className='oo-dlsts'>
               <h3>Ndubusis Prince Godson <span><Handyman /> Electrician</span></h3>
               <div className='oo-dlsts-110'>
               <div className='oo-dlsts-OO1'>
               <h5><MyLocation /> Umuahia Abia state</h5>
               </div>
               <div className='oo-dlsts-OO2'>
               <h4><span> <Visibility /> 16.2k</span> <span><Star />16</span></h4>
               </div>
               </div>
             </div>
             <div className='GLnad-btns'>
               <div className='GLnad-btns-1'>
                <span>Actively Searching</span>
                <span><Star /> Top Rated</span>
                 </div>
                 <div className='GLnad-btns-2'>
                 <button><Favorite /></button>
                 <Link to="/artisan-profile">View Profile</Link>
                 </div>
               </div>
           </div>
           </div>
     
           </div>
 
           <div className='Carded-Box'>
           <div className='Carded-Box-Grid'>
           <div className='Carded-Box-1'>
             <img src={HghImg2}></img>
           </div>
           <div className='Carded-Box-2'>
             <div className='oo-dlsts'>
               <h3>Ndubusis Prince Godson <span><Handyman /> Electrician</span></h3>
               <div className='oo-dlsts-110'>
               <div className='oo-dlsts-OO1'>
               <h5><MyLocation /> Umuahia Abia state</h5>
               </div>
               <div className='oo-dlsts-OO2'>
               <h4><span> <Visibility /> 16.2k</span> <span><Star />16</span></h4>
               </div>
               </div>
             </div>
             <div className='GLnad-btns'>
               <div className='GLnad-btns-1'>
                <span>Actively Searching</span>
                <span><Star /> Top Rated</span>
                 </div>
                 <div className='GLnad-btns-2'>
                 <button><Favorite /></button>
                 <Link to="/artisan-profile">View Profile</Link>
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

export default JobArtisans;
