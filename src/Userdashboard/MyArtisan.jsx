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

    
    useEffect(() => {
      const fetchArtisans = async () => {
        try {
          const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`, {
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

          setArtisanData(data);
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
          {artisanData.length === 0 ? (
            <div className="no-artisans">
              <p>No artisan in this category</p>
            </div>
          ) : (
            artisanData.map((artisan, index) => (
              <div className='Carded-Box' key={index}>
                <div className='Carded-Box-Grid'>
                  <div className='Carded-Box-1'>
                    <img
                      src={HghImg1 || 'default-image-path.png'}
                      alt={`${artisan.user.first_name}`}
                    />
                  </div>
                  <div className='Carded-Box-2'>
                    <div className='oo-dlsts'>
                      <h3>
                        {artisan.user.first_name} {artisan.user.last_name}
                        <span>
                          <Handyman /> {artisan.service_details.name}
                        </span>
                      </h3>
                      <div className='oo-dlsts-110'>
                        <div className='oo-dlsts-OO1'>
                          <h5>
                            <MyLocation /> {artisan.location}
                          </h5>
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
                          to={`/artisan-profile?service_details=${encodeURIComponent(
                            artisan.service_details.name)}
                          &artisan_location=${encodeURIComponent(
                            artisan.location )}
                            &artisan_phone=${encodeURIComponent(
                            artisan.user.phone)}
                          &artisan_unique_id=${encodeURIComponent(
                            artisan.user.unique_id)}
                          &artisan_name=${encodeURIComponent(
                            artisan.user.first_name +
                              ' ' +
                              artisan.user.last_name
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
