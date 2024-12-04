import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/SearchResult.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

import Star from '@mui/icons-material/Star'; 
import Favorite from '@mui/icons-material/Favorite'; 
import Share from '@mui/icons-material/Share';
import Handyman from '@mui/icons-material/Handyman';
import MyLocation from '@mui/icons-material/MyLocation';
import Visibility from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import HghImg1 from './Img/hghImgs/1.png';
import HghImg2 from './Img/hghImgs/2.png';
import HghImg3 from './Img/hghImgs/3.png';

import ServiceSlider from "../assets/ServiceSlider";



const SearchResult = () => {
  
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [artisanData, setArtisanData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const trade = searchParams.get('trade');
  const service = searchParams.get('service');
  const services = JSON.parse(decodeURIComponent(searchParams.get('services') || '[]'));

  const service_details_id = decodeURIComponent(searchParams.get('service_details_id'));

  
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/profiles/auth/artisans/by-service/${service_details_id}`);
        const data = await response.json();
        setArtisanData(data);
      } catch (error) {
        console.error('Error fetching artisan data:', error);
      }
    };

    fetchArtisans();
  }, [service_details_id]);


  const handleServiceClick = (clickedService) => {
    // Navigate to a new search results page for the clicked service
    navigate(`/search-results?trade=${trade}&service=${clickedService}&services=${encodeURIComponent(JSON.stringify(services))}`);
  };


  // to={`/search-results?trade=${selectedService.name}&service=${service}&service_details_id=${selectedService.unique_id}&services=${encodeURIComponent(
  //   JSON.stringify(selectedService.services)

  return (
    <div className='Search-Page'>
      <div className='Serahc-page-Box-Header'>
        <div className='site-container'>
          <h2>Tradesperson(s) for <span>{service}</span></h2>
          <div className='Ppa-bagdes'>
            <div className='Ppa-bagdes-ga'>
              <span>{trade}</span>
              <span>{service}</span>
            </div>
            <div className='Ppa-bagdes-ga'>
              <h6><SearchIcon /> Search result - {services.length}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className='navigating-ttarvs'>
        <div className='site-container'>
            <p>Simservicehub <ChevronRightIcon /> Trades <ChevronRightIcon />{trade} <ChevronRightIcon /> {service} <ChevronRightIcon /> Search result - {services.length}</p>
          </div>
          </div>

      <div className='garoo-Body-sec'>
        <div className='site-container'>
        <div className='garoo-Gird'>
        <div className='garoo-Gird-part1'>
        <div className='garoo-Gird-part1-main'>
          <h3>{trade}<ArrowForward /></h3>
          <ul>
  {services.map((srv, index) => (
    <li
      key={index}
      className={srv === service ? 'active-service' : ''}
      onClick={() => {
        handleServiceClick(srv); // Navigate to the new page
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
      }}
      style={{ cursor: 'pointer' }}
    >
      {srv}
    </li>
  ))}
</ul>


          <div className='Rev-FFaos'>
            <h6><span><Star /><Star /><Star /><Star /><Star /></span> <span>Reviews (150)</span></h6>
            <div className='Rev-FFaos-Btns'>
              <button><Favorite />Add to Favouriteqqqqqqqqqqqqqqqqq</button>
            
            </div>
          </div>
        </div>
        </div>
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


          <div className='Carded-Box'>
          <div className='Carded-Box-Grid'>
          <div className='Carded-Box-1'>
            <img src={HghImg3}></img>
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


        </div>
        </div>
        </div>
         
        </div>

        <div className='service-sec'>
  <div className='site-container'>
    <div className='service-header'>
      <h2 className='mid-text'>Browse Our Top Service Categories </h2>
    </div>

    <ServiceSlider />
  </div>
</div>

    </div>
  );
};

export default SearchResult;
