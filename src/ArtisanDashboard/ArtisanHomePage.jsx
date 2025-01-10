// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";

// import MyLocation from '@mui/icons-material/MyLocation';
// import Handyman from '@mui/icons-material/Handyman';
// import CallIcon from '@mui/icons-material/Call';
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ChatIcon from '@mui/icons-material/Chat';

// import ChatWithClient from './ChatWithClient';

// import CloseIcon from '@mui/icons-material/Close';

// import Star from '@mui/icons-material/Star';
// import AccessTimeIcon from "@mui/icons-material/AccessTime";

// const ArtisanHomePage = () => {


    
//     const last_name = localStorage.getItem('user_last_name');
//     const first_name = localStorage.getItem('user_first_name');
//     const user_email = localStorage.getItem('user_email');
//     const user_phone = localStorage.getItem('user_email');
//     const unique_user_id = localStorage.getItem('unique_user_id');



//     const [showClientDetails, setShowClientDetails] = useState(false);
//     const [showChatSection, setShowChatSection] = useState(false);

//     const handleTradeClick = () => {
//         setShowClientDetails(true);
//         setShowChatSection(false); // Reset chat section when opening client details
//     };

//     const handleCloseClick = () => {
//         setShowClientDetails(false);
//         setShowChatSection(false); // Close chat section when closing client details
//     };

//     const handleChatClick = () => {
//         setShowChatSection(true); // Show chat section
//     };

//     const CloseChatClick = () => {
//         setShowChatSection(false); 
//         setShowChatSection(false)
//         setShowClientDetails(false)
//     };

//     return (
//         <div className="Artisan_Dashbaord_Page">
//             <div className="large-container">
//                 <div className="Artisan_Dashbaord_Page_Grid">
//                     <div className="Artisan_Dashbaord_Page_Left">
//                         <div className="AA_Dash_Left_Box">
//                             <div className="recent_trades_sec">
//                                 <div className="AA_Dash_Left_Top">
//                                     <h3>Recent Trades <span>4</span></h3>
//                                 </div>
                                
//                                 <div className="Trade_Secs">
//                                     <div className="Trade_Box" onClick={handleTradeClick}>
//                                         <h4>Felix John <span>O</span></h4>

//                                         <h3>Electrical Repairs <span>Pending</span></h3>
//                                         <ul>
//                                             <li><AccessTimeIcon /> 05 May 2024</li>
//                                             <li><ChatIcon /> Chats 200</li>
//                                             <li><Star /> 0</li>
//                                         </ul>
//                                     </div>
//                                     <div className="Trade_Box" onClick={handleTradeClick}>
//                                         <h4>Felix John <span>F</span></h4>
//                                         <h3>Electrical Repairs <span>pending</span></h3>
//                                         <ul>
//                                             <li><AccessTimeIcon /> 05 Feb 2024</li>
//                                             <li><ChatIcon /> Chats 200</li>
//                                             <li><Star /> 0</li>
//                                         </ul>
//                                     </div>
//                                     <div className="Trade_Box" onClick={handleTradeClick}>
//                                         <h4>Daniel Okechukwu <span>D</span></h4>
//                                         <h3>Electrical Repairs <span>Completed</span></h3>
//                                         <ul>
//                                             <li><AccessTimeIcon /> 12 Jun 2023</li>
//                                             <li><ChatIcon /> Chats 200</li>
//                                             <li><Star /> 0</li>
//                                         </ul>
//                                     </div>
//                                     <div className="Trade_Box" onClick={handleTradeClick}>
//                                         <h4>Ucee Dany <span>U</span></h4>
//                                         <h3>Electrical Repairs <span>Completed</span></h3>
//                                         <ul>
//                                             <li><AccessTimeIcon /> 20 May 2022</li>
//                                             <li><ChatIcon /> Chats 200</li>
//                                             <li><Star /> 0</li>
//                                         </ul>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

                    
//                     <div
//                         className={`Artisan_Dashbaord_Page_Right ${
//                             showClientDetails ? 'Show_Clit_Dlt' : ''
//                         } ${showChatSection ? 'Show_Client_Chat_Sec' : ''}`}
//                     >
//                         <div className="Client_Dlts">
//                             <div className="Chattt-Topp-3 jjhs-close">
//                                 <button
//                                     className="active-togl-atti"
//                                     onClick={handleCloseClick}
//                                 >
//                                     <CloseIcon />
//                                 </button>
//                             </div>



//                             <div className="Top_DltIm">
//                                 <div className="Top_DltIm_1">
//                                     <span>P</span>
//                                 </div>
//                                 <div className="Top_DltIm_2">
//                                     <h3>{first_name} {last_name}</h3>
//                                     <p><span><CallIcon /></span> <b>{user_phone}</b></p>
//                                     <p><span><MyLocation /></span> <b>{localStorage.getItem('Address')}</b></p>
//                                     <p><span><Handyman /></span> <b>Electrical Repairs</b></p>
//                                 </div>
//                             </div>


//                             <div className="Top_DltIm_Btns">
//                                 <button className="compley-bbTann">
//                                     <CheckCircleIcon /> Complete
//                                 </button>
//                                 <button onClick={handleChatClick}>
//                                     <ChatIcon />
//                                 </button>
//                                 <button className="remove-Btnnna">
//                                     <DeleteIcon />
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="Client_Chat_Sec">
                                                                
//                             <div className="Chattt-Topp-3">
//                                     <button className="active-togl-atti" onClick={CloseChatClick}><CloseIcon /></button>
//                                 </div>
//                             <ChatWithClient />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ArtisanHomePage;



import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import MyLocation from '@mui/icons-material/MyLocation';
import Handyman from '@mui/icons-material/Handyman';
import CallIcon from '@mui/icons-material/Call';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from '@mui/icons-material/Chat';

import ChatWithClient from './ChatWithClient';

import CloseIcon from '@mui/icons-material/Close';

import Star from '@mui/icons-material/Star';
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ArtisanHomePage = () => {


    const [selectedPerson, setSelectedPerson] = useState({
        first_name: '',
        last_name: '',
        user_phone: '',
        address: '',
        service: ''
    });

    
    
    const last_name = localStorage.getItem('user_last_name');
    const first_name = localStorage.getItem('user_first_name');
    const user_email = localStorage.getItem('user_email');
    const user_phone = localStorage.getItem('user_email');
    const unique_user_id = localStorage.getItem('unique_user_id');



    const [showClientDetails, setShowClientDetails] = useState(false);
    const [showChatSection, setShowChatSection] = useState(false);

    // const handleTradeClick = () => {
    //     setShowClientDetails(true);
    //     setShowChatSection(false); // Reset chat section when opening client details
    // };
    const handleTradeClick = (person) => {
        setSelectedPerson(person);
        setShowClientDetails(true);
        setShowChatSection(false); // Reset chat section when opening client details
    };
    

    const handleCloseClick = () => {
        setShowClientDetails(false);
        setShowChatSection(false); // Close chat section when closing client details
    };

    const handleChatClick = () => {
        setShowChatSection(true); // Show chat section
    };

    const CloseChatClick = () => {
        setShowChatSection(false); 
        setShowChatSection(false)
        setShowClientDetails(false)
    };

    return (
        <div className="Artisan_Dashbaord_Page">
            <div className="large-container">
                <div className="Artisan_Dashbaord_Page_Grid">
                    <div className="Artisan_Dashbaord_Page_Left">
                        <div className="AA_Dash_Left_Box">
                            <div className="recent_trades_sec">
                                <div className="AA_Dash_Left_Top">
                                    <h3>Recent Trades <span>4</span></h3>
                                </div>
                                
                                <div className="Trade_Secs">
                                    {/* <div className="Trade_Box" onClick={handleTradeClick}>
                                        <h4>Felix John <span>O</span></h4>

                                        <h3>Electrical Repairs <span>Pending</span></h3>
                                        <ul>
                                            <li><AccessTimeIcon /> 05 May 2024</li>
                                            <li><ChatIcon /> Chats 200</li>
                                            <li><Star /> 0</li>
                                        </ul>
                                    </div> */}
                                    <div className="Trade_Box" onClick={() => handleTradeClick({
                                            first_name: 'Felix',
                                            last_name: 'John',
                                            user_phone: '123-456-7890',
                                            address: '123 Main St',
                                            service: 'Electrical Repairs'
                                        })}>
                                            <h4>Felix John <span>O</span></h4>
                                            <h3>Electrical Repairs <span>Pending</span></h3>
                                            <ul>
                                                <li><AccessTimeIcon /> 05 May 2024</li>
                                                <li><ChatIcon /> Chats 200</li>
                                                <li><Star /> 0</li>
                                            </ul>
                                        </div>

                                    <div className="Trade_Box" onClick={handleTradeClick}>
                                        <h4>Felix John <span>F</span></h4>
                                        <h3>Electrical Repairs <span>pending</span></h3>
                                        <ul>
                                            <li><AccessTimeIcon /> 05 Feb 2024</li>
                                            <li><ChatIcon /> Chats 200</li>
                                            <li><Star /> 0</li>
                                        </ul>
                                    </div>
                                    <div className="Trade_Box" onClick={handleTradeClick}>
                                        <h4>Daniel Okechukwu <span>D</span></h4>
                                        <h3>Electrical Repairs <span>Completed</span></h3>
                                        <ul>
                                            <li><AccessTimeIcon /> 12 Jun 2023</li>
                                            <li><ChatIcon /> Chats 200</li>
                                            <li><Star /> 0</li>
                                        </ul>
                                    </div>
                                    <div className="Trade_Box" onClick={handleTradeClick}>
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
                        </div>
                    </div>

                    
                    <div
                        className={`Artisan_Dashbaord_Page_Right ${
                            showClientDetails ? 'Show_Clit_Dlt' : ''
                        } ${showChatSection ? 'Show_Client_Chat_Sec' : ''}`}
                    >
                        <div className="Client_Dlts">
                            <div className="Chattt-Topp-3 jjhs-close">
                                <button
                                    className="active-togl-atti"
                                    onClick={handleCloseClick}
                                >
                                    <CloseIcon />
                                </button>
                            </div>


{/* 
                            <div className="Top_DltIm">
                                <div className="Top_DltIm_1">
                                    <span>P</span>
                                </div>
                                <div className="Top_DltIm_2">
                                    <h3>{first_name} {last_name}</h3>
                                    <p><span><CallIcon /></span> <b>{user_phone}</b></p>
                                    <p><span><MyLocation /></span> <b>{localStorage.getItem('Address')}</b></p>
                                    <p><span><Handyman /></span> <b>Electrical Repairs</b></p>
                                </div>
                            </div> */}
                            <div className="Top_DltIm_2">
                                <h3>{selectedPerson.first_name} {selectedPerson.last_name}</h3>
                                <p><span><CallIcon /></span> <b>{selectedPerson.user_phone}</b></p>
                                <p><span><MyLocation /></span> <b>{selectedPerson.address}</b></p>
                                <p><span><Handyman /></span> <b>{selectedPerson.service}</b></p>
                            </div>

                            <div className="Top_DltIm_Btns">
                                <button className="compley-bbTann">
                                    <CheckCircleIcon /> Complete
                                </button>
                                <button onClick={handleChatClick}>
                                    <ChatIcon />
                                </button>
                                <button className="remove-Btnnna">
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                        <div className="Client_Chat_Sec">
                                                                
                            <div className="Chattt-Topp-3">
                                    <button className="active-togl-atti" onClick={CloseChatClick}><CloseIcon /></button>
                                </div>
                            <ChatWithClient />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanHomePage;

