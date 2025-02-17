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
    
    const [clients, setClients] = useState([]);
    const [groupedMessages, setGroupedMessages] = useState({}); // State for grouped messages
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

    useEffect(() => {
        const unique_user_id = sessionStorage.getItem("unique_user_id");
        
        const fetchArtisanDetail = async () => {
          if (!unique_user_id?.trim()) {
            console.error('Artisan Unique ID is missing');
            return;
          }
    
          try {
            const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/?unique_id=${unique_user_id}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
    
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const artisan = data.results[0]; // Access first item in the array
                sessionStorage.setItem("artisanCategory", artisan.service_details.unique_id);
                sessionStorage.setItem("artisanCategoryName", artisan.service_details.postName);
            } else {
                console.error("No artisan data found.");
            }
            
          } catch (error) {
            console.error('Error fetching artisan data:', error);
          }
        };
    
        fetchArtisanDetail();
      }, [djangoHostname]);


    useEffect(() => {
        const artisanUniqueID = sessionStorage.getItem('unique_user_id');

        const fetchMessages = async () => {
            try {
                const response = await fetch(`${djangoHostname}/api/messaging/auth/messages/messages_for_artisan/?artisan_id=${artisanUniqueID}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                setClients(data.senders);

                //console.log("data", data);  // Check the data received

                // Group messages by sender dynamically
                const grouped = {};

                for (const email in data) {
                    if (data[email].messages && Array.isArray(data[email].messages)) {
                        // Store customer details and group messages
                        grouped[email] = {
                            customer: {
                                unique_id: data[email].messages[0].sender.unique_id,
                                first_name: data[email].messages[0].sender.first_name,
                                address: data[email].messages[0].sender.address,
                                phone: data[email].messages[0].sender.phone,
                                last_name: data[email].messages[0].sender.last_name,
                                user_image: data[email].messages[0].sender.user_image,
                                email: email
                            },
                            messages: data[email].messages
                        };
                    } else {
                        console.error(`No messages or invalid format for sender: ${email}`);
                    }
                }

                setGroupedMessages(grouped);
                //console.log("Grouped Messages with Customer Info: ", grouped);

            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [djangoHostname]);

    const [selectedTrade, setSelectedTrade] = useState(null);
    const [showClientDetails, setShowClientDetails] = useState(false);
    const [showChatSection, setShowChatSection] = useState(false);

    const handleTradeClick = (email) => {
        setSelectedTrade(groupedMessages[email]);
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
                                    <h3>Recent Trades <span>{Object.keys(groupedMessages).length} </span></h3>
                                </div>
                                <div className="Trade_Secs">
                                    {Object.keys(groupedMessages).map((email, index) => (
                                        <div key={index} className="Trade_Box" onClick={() => handleTradeClick(email)}>
                                            <h4>{groupedMessages[email].customer.first_name} {groupedMessages[email].customer.last_name}</h4>
                                            <h3>{groupedMessages[email].messages.length} Messages</h3>
                                            <ul>
                                                <li><AccessTimeIcon /> {new Date(groupedMessages[email].messages[0].created_at).toLocaleDateString()}</li>
                                                <li><ChatIcon /> Chats {groupedMessages[email].messages.length}</li>
                                                <li><Star /> Rating TBD</li>
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
                                        <div className="Top_DltIm_1"><span>{selectedTrade.customer.first_name.charAt(0)}</span></div>
                                        <div className="Top_DltIm_2">
                                            <h3>{selectedTrade.customer.first_name} {selectedTrade.customer.last_name}</h3>
                                            <p><span><CallIcon /></span> <b>{selectedTrade.customer.phone}</b></p>
                                            <p><span><MyLocation /></span> <b>{selectedTrade.customer.address}</b></p>
                                            <p><span><Handyman /></span> <b>{'Service TBD'}</b></p>
                                        </div>
                                    </>
                                ) : (
                                    <p>No trade selected</p>
                                )}
                            </div>
                            <div className="Top_DltIm_Btns">
                                <button className="compley-bbTann"><CheckCircleIcon /> Complete</button>
                                <button onClick={handleChatClick}><ChatIcon /></button>
                                <button className="remove-Btnnna"><DeleteIcon /></button>
                            </div>
                        </div>
                        <div className="Client_Chat_Sec">
                        <div className="Chattt-Topp-3">
                            <button className="active-togl-atti" onClick={CloseChatClick}>
                                <CloseIcon />
                            </button>
                        </div>
                        {selectedTrade && (
                            <>
                            {/* <p> {selectedTrade.customer.unique_id} </p>
                            <p> {sessionStorage.getItem('unique_user_id')} </p> */}
                            <ChatWithClient 
                                receiverId = {selectedTrade.customer.unique_id} 
                                receiverEmail = {selectedTrade.customer.email} 
                                senderId = {sessionStorage.getItem('unique_user_id')} // Assuming artisan ID is stored in localStorage
                                senderIdEmail = {sessionStorage.getItem('user_email')} // Assuming artisan ID is stored in localStorage
                            />
                            </>
                        )}
                    </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanHomePage;
