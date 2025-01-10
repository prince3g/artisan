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

//     const tradesData = [
//         {
//             name: 'Felix John',
//             initial: 'O',
//             service: 'Electrical Repairs',
//             status: 'Pending',
//             date: '05 May 2024',
//             chats: 200,
//             rating: 0
//         },
//         {
//             name: 'Felix John',
//             initial: 'F',
//             service: 'Electrical Repairs',
//             status: 'Pending',
//             date: '05 Feb 2024',
//             chats: 200,
//             rating: 0
//         },
//         {
//             name: 'Daniel Okechukwu',
//             initial: 'D',
//             service: 'Electrical Repairs',
//             status: 'Completed',
//             date: '12 Jun 2023',
//             chats: 200,
//             rating: 0
//         },
//         {
//             name: 'Ucee Dany',
//             initial: 'U',
//             service: 'Electrical Repairs',
//             status: 'Completed',
//             date: '20 May 2022',
//             chats: 200,
//             rating: 0
//         }
//     ];
    
// const len = tradesData.length

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
//                                     <h3>Recent Trades <span>{len}</span></h3>
//                                 </div>
                                
//                                 {/* <div className="Trade_Secs">
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
//                                 </div> */}
//                                 <div className="Trade_Secs">
//                                     {tradesData.map((trade, index) => (
//                                         <div key={index} className="Trade_Box" onClick={() => handleTradeClick(trade)}>
//                                             <h4>{trade.name} <span>{trade.initial}</span></h4>
//                                             <h3>{trade.service} <span>{trade.status}</span></h3>
//                                             <ul>
//                                                 <li><AccessTimeIcon /> {trade.date}</li>
//                                                 <li><ChatIcon /> Chats {trade.chats}</li>
//                                                 <li><Star /> {trade.rating}</li>
//                                             </ul>
//                                         </div>
//                                     ))}
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
import MyLocation from '@mui/icons-material/MyLocation';
import Handyman from '@mui/icons-material/Handyman';
import CallIcon from '@mui/icons-material/Call';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Star from '@mui/icons-material/Star';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatWithClient from './ChatWithClient';

const ArtisanHomePage = () => {
    const tradesData = [
        { name: 'Felix John', initial: 'O', service: 'Electrical Repairs', status: 'Pending', date: '05 May 2024', chats: 200, rating: 0 },
        { name: 'Felix John', initial: 'F', service: 'Electrical Repairs', status: 'Pending', date: '05 Feb 2024', chats: 200, rating: 0 },
        { name: 'Daniel Okechukwu', initial: 'D', service: 'Electrical Repairs', status: 'Completed', date: '12 Jun 2023', chats: 200, rating: 0 },
        { name: 'Ucee Dany', initial: 'U', service: 'Electrical Repairs', status: 'Completed', date: '20 May 2022', chats: 200, rating: 0 }
    ];

    const [selectedTrade, setSelectedTrade] = useState(null);
    const [showClientDetails, setShowClientDetails] = useState(false);
    const [showChatSection, setShowChatSection] = useState(false);

    const handleTradeClick = (trade) => {
        setSelectedTrade(trade);
        setShowClientDetails(true);
        setShowChatSection(false);
    };

    const handleCloseClick = () => {
        setShowClientDetails(false);
        setShowChatSection(false);
    };

    const handleChatClick = () => {
        setShowChatSection(true);
    };

    const CloseChatClick = () => {
        setShowChatSection(false);
        setShowClientDetails(false);
    };

    return (
        <div className="Artisan_Dashbaord_Page">
            <div className="large-container">
                <div className="Artisan_Dashbaord_Page_Grid">
                    <div className="Artisan_Dashbaord_Page_Left">
                        <div className="AA_Dash_Left_Box">
                            <div className="recent_trades_sec">
                                <div className="AA_Dash_Left_Top">
                                    <h3>Recent Trades <span>{tradesData.length}</span></h3>
                                </div>
                                <div className="Trade_Secs">
                                    {tradesData.map((trade, index) => (
                                        <div key={index} className="Trade_Box" onClick={() => handleTradeClick(trade)}>
                                            <h4>{trade.name} <span>{trade.initial}</span></h4>
                                            <h3>{trade.service} <span>{trade.status}</span></h3>
                                            <ul>
                                                <li><AccessTimeIcon /> {trade.date}</li>
                                                <li><ChatIcon /> Chats {trade.chats}</li>
                                                <li><Star /> {trade.rating}</li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`Artisan_Dashbaord_Page_Right ${showClientDetails ? 'Show_Clit_Dlt' : ''} ${showChatSection ? 'Show_Client_Chat_Sec' : ''}`}>
                        <div className="Client_Dlts">
                            <div className="Chattt-Topp-3 jjhs-close">
                                <button className="active-togl-atti" onClick={handleCloseClick}><CloseIcon /></button>
                            </div>
                            <div className="Top_DltIm">
                                {selectedTrade ? (
                                    <>
                                        <div className="Top_DltIm_1"><span>{selectedTrade.initial}</span></div>
                                        <div className="Top_DltIm_2">
                                            <h3>{selectedTrade.name}</h3>
                                            <p><span><CallIcon /></span> <b>{'123-456-7890'}</b></p>
                                            <p><span><MyLocation /></span> <b>{localStorage.getItem('Address')}</b></p>
                                            <p><span><Handyman /></span> <b>{selectedTrade.service}</b></p>
                                        </div>
                                    </>
                                ) : (
                                    // <p>No trade selected</p>
                                <div className="Top_DltIm">
                                    <div className="Top_DltIm_1">
                                        <span>P</span>
                                    </div>
                                    <div className="Top_DltIm_2">
                                        <h3>Qwerty qwerty</h3>
                                        <p><span><CallIcon /></span> <b>0908765432</b></p>
                                        <p><span><MyLocation /></span> <b>Enugu Street Town PHC</b></p>
                                        <p><span><Handyman /></span> <b>Electrical Repairs</b></p>
                                    </div>
                                </div>

                                )}
                            </div>
                            <div className="Top_DltIm_Btns">
                                <button className="compley-bbTann"><CheckCircleIcon /> Complete</button>
                                <button onClick={handleChatClick}><ChatIcon /></button>
                                <button className="remove-Btnnna"><DeleteIcon /></button>
                            </div>
                        </div>
                        <div className="Client_Chat_Sec">
                            <div className="Chattt-Topp-3"><button className="active-togl-atti" onClick={CloseChatClick}><CloseIcon /></button></div>
                            <ChatWithClient />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ArtisanHomePage;
