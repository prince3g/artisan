import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './Userdashbaord.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";

import UserPlaceholder from './Img/user-placeholder.png';

import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';

import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MyArtisan from './MyArtisan';



const UserHomePage = () => {
  return (
   <div className="ooUserdashbaord-Page">
     <div className="navigating-ttarvs">
                <div className="site-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/"> Customer dashboardd</Link> <ChevronRightIcon />
                        <Link to="/user-dashboard/">
                        Ndubuisi Prince Godson </Link>
                    </p>
                </div>
            </div>

            <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Welcome Prince!</h2>
            </div>

            <div className="Habgb-sec">
              <div className="Habgb-Top">
              <div className="Habgb-Top-00">
              <div className="Habgb-Top-1">
              <div className="Habgb-Top-10">
                <img src={UserPlaceholder}></img>
              </div>
              <div className="Habgb-Top-11">
                <div>
                <h3>Prince Godson</h3>
                <p>
                    <PhoneIcon /> 09037494084
                </p>
              </div>
              </div>
                </div>
                <Link to="/user-dashboard/edit-profile" className="edit-Bntnn">
                    <EditIcon /> Edit Profile
                </Link>
              </div>
              <div className="Habgb-Top-2">
                <Link to="/user-dashboard/" className="my-artisan">
                <PeopleIcon /> My Artisan
                </Link>

                <Link to="/user-dashboard/jobs">
                <WorkIcon /> Jobs
                </Link>

                <Link to="/saved-trades">
                <FavoriteIcon /> Saved Trades
                </Link>

              </div>
              </div>

              <MyArtisan />

            </div>

            </div>
            </div>
            </div>



   </div>
  );
};

export default UserHomePage;
