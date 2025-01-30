// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Css/SearchResult.css';
// import SearchIcon from '@mui/icons-material/Search';
// import ArrowForward from '@mui/icons-material/ArrowForward';
// import { Link } from 'react-router-dom';
// import Star from '@mui/icons-material/Star';
// import Favorite from '@mui/icons-material/Favorite';
// import Handyman from '@mui/icons-material/Handyman';
// import MyLocation from '@mui/icons-material/MyLocation';
// import Visibility from '@mui/icons-material/Visibility';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import HghImg1 from './Img/hghImgs/1.png';
// import ServiceSlider from '../assets/ServiceSlider';

// const SearchResult = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [artisanData, setArtisanData] = useState([]);
//   const [filteredArtisanData, setFilteredArtisanData] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const trade = searchParams.get('trade');
//   const service = searchParams.get('service');
//   const services = JSON.parse(decodeURIComponent(searchParams.get('services') || '[]'));
//   const service_details_id = decodeURIComponent(searchParams.get('service_details_id'));
//   const postCode = searchParams.get('postCode'); // Extract postCode from the URL

//   useEffect(() => {
//     const fetchArtisans = async () => {
//       try {
//         const response = await fetch(
//           `${djangoHostname}/api/profiles/auth/artisans/by-service/${service_details_id}/`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setArtisanData(data);

//         // Filter artisans by postCode if provided
//         if (postCode) {
//           const filteredData = data.filter((artisan) => artisan.postcode === postCode);
//           setFilteredArtisanData(filteredData);
//         } else {
//           setFilteredArtisanData(data); // If no postCode, show all artisans
//         }
//       } catch (error) {
//         console.error('Error fetching artisan data:', error);
//       }
//     };

//     fetchArtisans();
//   }, [service_details_id, postCode]); // Add postCode as a dependency

//   const handleServiceClick = (clickedService) => {
//     navigate(
//       `/search-results?trade=${trade}&service=${clickedService}&services=${encodeURIComponent(
//         JSON.stringify(services)
//       )}&postCode=${postCode || ''}` // Preserve postCode in the URL
//     );
//   };

//   return (
//     <div className="Search-Page">
//       <div className="Serahc-page-Box-Header">
//         <div className="site-container">
//           <h2>
//             Artisan(s) for <span>{service}</span>
//           </h2>
//           <div className="Ppa-bagdes">
//             <div className="Ppa-bagdes-ga">
//               <span>{trade}</span>
//               <span>{service}</span>
//             </div>
//             <div className="Ppa-bagdes-ga">
//               <h6>
//                 <SearchIcon /> Search result - {filteredArtisanData.length}
//               </h6>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="navigating-ttarvs">
//         <div className="site-container">
//           <p>
//             <Link to="/">Simservicehub</Link> <ChevronRightIcon /> Search result -{' '}
//             {filteredArtisanData.length}
//           </p>
//         </div>
//       </div>

//       <div className="garoo-Body-sec">
//         <div className="site-container">
//           <div className="garoo-Gird">
//             <div className="garoo-Gird-part1">
//               <div className="garoo-Gird-part1-main">
//                 <h3>
//                   {trade}
//                   <ArrowForward />
//                 </h3>
//                 <ul>
//                   {services.map((srv, index) => (
//                     <li
//                       key={index}
//                       className={srv === service ? 'active-service' : ''}
//                       onClick={() => {
//                         handleServiceClick(srv);
//                         window.scrollTo({ top: 0, behavior: 'smooth' });
//                       }}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       {srv}
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="Rev-FFaos">
//                   <h6>
//                     <span>
//                       <Star />
//                       <Star />
//                       <Star />
//                       <Star />
//                       <Star />
//                     </span>{' '}
//                     <span>Reviews (150)</span>
//                   </h6>
//                   <div className="Rev-FFaos-Btns">
//                     <Link to="/leave-review">
//                       <button>
//                         <Star />
//                         Leave a Review
//                       </button>
//                     </Link>
//                     <button>
//                       <Favorite />
//                       Add to Favourite
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="garoo-Gird-part2">
//               {filteredArtisanData.length === 0 ? (
//                 <div className="no-artisans">
//                   <p>No artisan in this category{postCode ? ` with postcode ${postCode}` : ''}</p>
//                 </div>
//               ) : (
//                 filteredArtisanData.map((artisan, index) => (
//                   <div className="Carded-Box" key={index}>
//                     <div className="Carded-Box-Grid">
//                       <div className="Carded-Box-1">
//                         <img src={HghImg1 || 'default-image-path.png'} alt={`${artisan.user.first_name}`} />
//                       </div>
//                       <div className="Carded-Box-2">
//                         <div className="oo-dlsts">
//                           <h3>
//                             {artisan.user.first_name} {artisan.user.last_name}
//                             <span>
//                               <Handyman /> {artisan.service_details.name}
//                             </span>
//                           </h3>
//                           <div className="oo-dlsts-110">
//                             <div className="oo-dlsts-OO1">
//                               <h5>
//                                 <MyLocation /> {artisan.location}
//                               </h5>
//                             </div>
//                             <div className="oo-dlsts-OO2">
//                               <h4>
//                                 <span>
//                                   <Visibility /> 16.2k
//                                 </span>{' '}
//                                 <span>
//                                   <Star />
//                                   16
//                                 </span>
//                               </h4>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="GLnad-btns">
//                           <div className="GLnad-btns-1">
//                             <span>Actively Searching</span>
//                             <span>
//                               <Star /> Top Rated
//                             </span>
//                           </div>
//                           <div className="GLnad-btns-2">
//                             <button>
//                               <Favorite />
//                             </button>
//                             <Link
//                               to={`/artisan-profile?service_details=${encodeURIComponent(
//                                 artisan.service_details.name
//                               )}&service=${encodeURIComponent(
//                                 service
//                               )}&artisan_location=${encodeURIComponent(
//                                 artisan.location
//                               )}&artisan_phone=${encodeURIComponent(
//                                 artisan.user.phone
//                               )}&artisan_unique_id=${encodeURIComponent(
//                                 artisan.user.unique_id
//                               )}&artisan_name=${encodeURIComponent(
//                                 artisan.user.first_name + ' ' + artisan.user.last_name
//                               )}`}
//                             >
//                               View Profile
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="service-sec">
//         <div className="site-container">
//           <div className="service-header">
//             <h2 className="mid-text">Browse Our Top Service Categories</h2>
//           </div>
//           <ServiceSlider />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;



import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/SearchResult.css';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import Star from '@mui/icons-material/Star';
import Favorite from '@mui/icons-material/Favorite';
import Handyman from '@mui/icons-material/Handyman';
import MyLocation from '@mui/icons-material/MyLocation';
import Visibility from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HghImg1 from './Img/hghImgs/1.png';
import ServiceSlider from '../assets/ServiceSlider';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for the loader

const SearchResult = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [artisanData, setArtisanData] = useState([]);
  const [filteredArtisanData, setFilteredArtisanData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const trade = searchParams.get('trade');
  const service = searchParams.get('service');
  const services = JSON.parse(decodeURIComponent(searchParams.get('services') || '[]'));
  const service_details_id = decodeURIComponent(searchParams.get('service_details_id'));
  const postCode = searchParams.get('postCode'); // Extract postCode from the URL

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true); // Set loading to true when the request starts
        const response = await fetch(
          `${djangoHostname}/api/profiles/auth/artisans/by-service/${service_details_id}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArtisanData(data);

        // Filter artisans by postCode if provided
        if (postCode) {
          const filteredData = data.filter((artisan) => artisan.postcode === postCode);
          setFilteredArtisanData(filteredData);
        } else {
          setFilteredArtisanData(data); // If no postCode, show all artisans
        }
      } catch (error) {
        console.error('Error fetching artisan data:', error);
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    };

    fetchArtisans();
  }, [service_details_id, postCode]); // Add postCode as a dependency

  const handleServiceClick = (clickedService) => {
    navigate(
      `/search-results?trade=${trade}&service=${clickedService}&services=${encodeURIComponent(
        JSON.stringify(services)
      )}&postCode=${postCode || ''}` // Preserve postCode in the URL
    );
  };

  return (
    <div className="Search-Page">
      {/* Full-screen loader */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000, // Ensure it's on top of everything
          }}
        >
          <CircularProgress /> {/* Material-UI Circular Progress */}
        </div>
      )}

      <div className="Serahc-page-Box-Header">
        <div className="site-container">
          <h2>
            Artisan(s) for <span>{service}</span>
          </h2>
          <div className="Ppa-bagdes">
            <div className="Ppa-bagdes-ga">
              <span>{trade}</span>
              <span>{service}</span>
            </div>
            <div className="Ppa-bagdes-ga">
              <h6>
                <SearchIcon /> Search result - {filteredArtisanData.length}
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon /> Search result -{' '}
            {filteredArtisanData.length}
          </p>
        </div>
      </div>

      <div className="garoo-Body-sec">
        <div className="site-container">
          <div className="garoo-Gird">
            <div className="garoo-Gird-part1">
              <div className="garoo-Gird-part1-main">
                <h3>
                  {trade}
                  <ArrowForward />
                </h3>
                <ul>
                  {services.map((srv, index) => (
                    <li
                      key={index}
                      className={srv === service ? 'active-service' : ''}
                      onClick={() => {
                        handleServiceClick(srv);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {srv}
                    </li>
                  ))}
                </ul>

                <div className="Rev-FFaos">
                  <h6>
                    <span>
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </span>{' '}
                    <span>Reviews (150)</span>
                  </h6>
                  <div className="Rev-FFaos-Btns">
                    <Link to="/leave-review">
                      <button>
                        <Star />
                        Leave a Review
                      </button>
                    </Link>
                    <button>
                      <Favorite />
                      Add to Favourite
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="garoo-Gird-part2">
              {filteredArtisanData.length === 0 ? (
                <div className="no-artisans">
                  <p>No artisan in this category{postCode ? ` with postcode ${postCode}` : ''}</p>
                </div>
              ) : (
                filteredArtisanData.map((artisan, index) => (
                  <div className="Carded-Box" key={index}>
                    <div className="Carded-Box-Grid">
                      <div className="Carded-Box-1">
                        <img src={HghImg1 || 'default-image-path.png'} alt={`${artisan.user.first_name}`} />
                      </div>
                      <div className="Carded-Box-2">
                        <div className="oo-dlsts">
                          <h3>
                            {artisan.user.first_name} {artisan.user.last_name}
                            <span>
                              <Handyman /> {artisan.service_details.name}
                            </span>
                          </h3>
                          <div className="oo-dlsts-110">
                            <div className="oo-dlsts-OO1">
                              <h5>
                                <MyLocation /> {artisan.location}
                              </h5>
                            </div>
                            <div className="oo-dlsts-OO2">
                              <h4>
                                <span>
                                  <Visibility /> 16.2k
                                </span>{' '}
                                <span>
                                  <Star />
                                  16
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="GLnad-btns">
                          <div className="GLnad-btns-1">
                            <span>Actively Searching</span>
                            <span>
                              <Star /> Top Rated
                            </span>
                          </div>
                          <div className="GLnad-btns-2">
                            <button>
                              <Favorite />
                            </button>
                            <Link
                              to={`/artisan-profile?service_details=${encodeURIComponent(
                                artisan.service_details.name
                              )}&service=${encodeURIComponent(
                                service
                              )}&artisan_location=${encodeURIComponent(
                                artisan.location
                              )}&artisan_phone=${encodeURIComponent(
                                artisan.user.phone
                              )}&artisan_unique_id=${encodeURIComponent(
                                artisan.user.unique_id
                              )}&artisan_name=${encodeURIComponent(
                                artisan.user.first_name + ' ' + artisan.user.last_name
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

      <div className="service-sec">
        <div className="site-container">
          <div className="service-header">
            <h2 className="mid-text">Browse Our Top Service Categories</h2>
          </div>
          <ServiceSlider />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;