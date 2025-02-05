import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (!sessionStorage.getItem("hasReloaded")) {
          sessionStorage.setItem("hasReloaded", "true");
          window.location.reload();
        }
      }, []);
      
    const tradesData = [
        { name: 'Felix John', initial: 'O', service: 'Electrical Repairs', status: 'Pending', date: '05 May 2024', chats: 200, rating: 0 },
        { name: 'Ucee Dany', initial: 'U', service: 'Electrical Repairs', status: 'Completed', date: '20 May 2022', chats: 200, rating: 0 },
        { name: 'Felix John', initial: 'F', service: 'Electrical Repairs', status: 'Pending', date: '05 Feb 2024', chats: 200, rating: 0 },
        { name: 'Daniel Okechukwu', initial: 'D', service: 'Electrical Repairs', status: 'Completed', date: '12 Jun 2023', chats: 200, rating: 0 },
        
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
