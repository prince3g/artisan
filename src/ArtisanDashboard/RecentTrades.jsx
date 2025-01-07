import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import Star from '@mui/icons-material/Star'; 
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MyLocation from '@mui/icons-material/MyLocation';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';




const RecentTrades = () => {
  return (
   <div className="recent_trades_sec">
                <div className="AA_Dash_Left_Top">
                    <h3>Recent Trades <span>4</span></h3>
                </div>

                <div className="Trade_Secs">

                    <div className="Trade_Box">
                    <h4>Prince Godson <span>P</span></h4>
                        <h3>Electrical Repairs <span>Pending</span></h3>
                        <ul>
                            <li><AccessTimeIcon /> 05 May 2024</li>
                            <li><ChatIcon /> Chats 200</li>
                            <li><Star /> 0</li>
                        </ul>
                    </div>

                    <div className="Trade_Box">
                    <h4>Fekix John <span>F</span></h4>
                        <h3>Electrical Repairs <span>pending</span></h3>
                        <ul>
                            <li><AccessTimeIcon /> 05 Feb 2024</li>
                            <li><ChatIcon /> Chats 200</li>
                            <li><Star /> 0</li>
                        </ul>
                    </div>


                    <div className="Trade_Box">
                    <h4>Daniel Okechukwu <span>D</span></h4>
                        <h3>Electrical Repairs <span>Completed</span></h3>
                        <ul>
                            <li><AccessTimeIcon /> 12 Jun 2023</li>
                            <li><ChatIcon /> Chats 200</li>
                            <li><Star /> 0</li>
                        </ul>
                    </div>


                    <div className="Trade_Box">
                    <h4>Ucee Dany <span>U</span></h4>
                        <h3>Electrical Repairs <span>Completed</span></h3>
                        <ul>
                            <li><AccessTimeIcon /> 20 May 2022</li>
                            <li><ChatIcon /> Chats 200</li>
                            <li><Star /> 0</li>
                        </ul>
                    </div>


                    


                </div>
            
   </div>
  );
};

export default RecentTrades;
