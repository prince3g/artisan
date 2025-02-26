import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Star from '@mui/icons-material/Star'; 
import Favorite from '@mui/icons-material/Favorite'; 
import Handyman from '@mui/icons-material/Handyman';
import MyLocation from '@mui/icons-material/MyLocation';
import Visibility from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HghImg1 from '../LandingPages/Img/hghImgs/1.png';
import HghImg2 from '../LandingPages/Img/hghImgs/2.png';
import HghImg3 from '../LandingPages/Img/hghImgs/3.png';


const Userdashbaord = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [artisanData, setArtisanData] = useState([]);
    const [numArtisanData, setNumArtisanData] = useState([]);
    
    useEffect(() => {
      const fetchArtisans = async () => {
        try {
          const user_unique_user_id = sessionStorage.getItem('unique_user_id');

          const response = await fetch(`${djangoHostname}/api/messaging/auth/messages/senders_to_user/?receiver_id=${user_unique_user_id}`, {
            
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // This should match the server-side CORS_ALLOW_CREDENTIALS setting
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();

          // console.log("data")
          // console.log(data)
          // console.log("data")

          // console.log(data.results);
          setArtisanData(data.results || []);
          setNumArtisanData(data.count || 0);

        } catch (error) {
          console.error('Error fetching artisan data:', error);
        }
      };
  
      fetchArtisans();
    }, []);  
  
  return (
   <div className="My-Artisan-Sec">
     <div className="My-Artisan-Head">
        <h3>My Artisan</h3>
     </div>

     <div className="Gradnded-Box-Body">
             
     <div className='garoo-Gird-part2'>
        <div className='garoo-Gird-part2'>
          {numArtisanData === 0 ? (
            <div className="no-artisans">
              <p>You have not chatted with any Artisan</p>
            </div>
          ) : (
            artisanData.map((artisan, index) => (
              <div className='Carded-Box' key={index}>
                <div className='Carded-Box-Grid'>
                  <div className='Carded-Box-1'>
                    <img
                      src={HghImg1 || 'default-image-path.png'}
                      alt={`${artisan.first_name}`}
                    />
                  </div>
                  <div className='Carded-Box-2'>
                    <div className='oo-dlsts'>
                      <h3>
                        {artisan.first_name} {artisan.last_name}
                        <span>
                          <Handyman /> 
                        </span>
                      </h3>
                      <div className='oo-dlsts-110'>
                        <div className='oo-dlsts-OO1'>
                         <Link to={`/chat-with-artisan?artisanUniqueID=${artisan.unique_id}&service=${artisan.unique_id}`} 
                          className='route-to-chat-btn'><span>{artisan.message_count}</span>Chat(s)</Link>
                        </div>
                        <div className='oo-dlsts-OO2'>
                          <h4>
                            <span>
                              <Visibility /> 16.2k
                            </span>{' '}
                            <span>
                              <Star />16
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className='GLnad-btns'>
                      <div className='GLnad-btns-1'>
                        <span>Actively Searching</span>
                        <span>
                          <Star /> Top Rated
                        </span>
                      </div>
                      <div className='GLnad-btns-2'>
                        <button>
                          <Favorite />
                        </button>
                        <Link
                          to={`/artisan-profile?artisan_location=${encodeURIComponent(
                            artisan.location?.trim() || ''
                          )}&artisan_phone=${encodeURIComponent(
                            artisan.phone?.trim() || ''
                          )}&artisan_unique_id=${encodeURIComponent(
                            artisan.unique_id?.trim() || ''
                          )}&artisan_name=${encodeURIComponent(
                            `${artisan.first_name.trim()} ${artisan.last_name.trim()}`
                          )}`}
                        >
                          View Profile
                        </Link>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        </div>
 
              
             </div>


   </div>
  );
};

export default Userdashbaord;
