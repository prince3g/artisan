import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import RecentTrades from './RecentTrades';

import MyLocation from '@mui/icons-material/MyLocation';
import Handyman from '@mui/icons-material/Handyman';
import CallIcon from '@mui/icons-material/Call';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete"; 




const ArtisanHomePage = () => {
  return (
   <div className="Artisan_Dashbaord_Page">
    <div className="site-container">
    <div className="Artisan_Dashbaord_Page_Grid">
        <div className="Artisan_Dashbaord_Page_Left">
            <div className="AA_Dash_Left_Box">
                <RecentTrades />
            </div>
        </div>
        <div className="Artisan_Dashbaord_Page_Right">
            <div className="Client_Dlts">
                <div className="Top_DltIm">
                <div className="Top_DltIm_1">
                    <span>P</span>
                </div>
                <div className="Top_DltIm_2">
                    <h3>Prince Godson</h3>
                    <p><span><CallIcon /></span> <b>09037494084</b></p>
                    <p><span><MyLocation /></span> <b>Umuahia Abia state</b></p>
                    <p><span><Handyman /></span> <b>Electrical Repairs</b></p>
                </div>
                </div>
                <div className="Top_DltIm_Btns">
                    <button className="compley-bbTann"><CheckCircleIcon /> Complete trade</button>
                    <button><CallIcon /> </button>
                    <button className="remove-Btnnna"><DeleteIcon /></button>
                </div>
            </div>
            <div className="Client_Chat_Sec"></div>
        </div>
    </div>
    </div>
   </div>
  );
};

export default ArtisanHomePage;
