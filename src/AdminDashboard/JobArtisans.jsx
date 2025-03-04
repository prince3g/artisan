

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import './Userdashbaord.css';

import Star from '@mui/icons-material/Star'; 
import Handyman from '@mui/icons-material/Handyman';
import MyLocation from '@mui/icons-material/MyLocation';
import Visibility from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import HghImg1 from '../LandingPages/Img/hghImgs/1.png';
import HghImg2 from '../LandingPages/Img/hghImgs/2.png';
import HghImg3 from '../LandingPages/Img/hghImgs/3.png';


const JobArtisans = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [error, setError] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const [serviceDetailsName, setServiceDetailsName] = useState("");
  const [serviceDetailsProfession, setServiceDetailProfession] = useState("");
  const location = useLocation();
  const job = location.state || {};

  const  job_unique_id = job.job.unique_id

  useEffect(() => {
    if (job.job) {
      setServiceDetailsName(job.job.service_details.name);
    }
  }, [job.job]); // Runs only when job.job changes
  
 
  
    useEffect(() => {
      const fetchJobs = async () => {
        try {

           const response = await fetch(`${djangoHostname}/api/auth/quotes/quote_request/artisans-for-job/?job_id=${job_unique_id}`);
          
          if (!response.ok) {
            // Handle errors appropriately
            const errorData = await response.json();
            throw new Error(errorData.detail || 'An error occurred while fetching jobs.');
          }
          const data = await response.json();
          setArtisans(data);

          // console.log("data")
          // console.log(data)
          // console.log("data")
          
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchJobs();
    }, [djangoHostname, job_unique_id]);




  return (
    <div className="ooUserdashbaord-Page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/"> Customer dashboard</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/jobs">Posted Jobs </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/jobs">{serviceDetailsName} </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/job-artisans">Artisans </Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Artisans ({serviceDetailsName})</h2>
            </div>

            <div className="Habgb-sec">
              <div className="My-Artisan-Body">
                <div className='garoo-Gird-part2'>

                {artisans.map((artisan, index) => (
                    <div className='Carded-Box' key={artisan.artisan?.unique_id || `artisan-${index}`}>
                      <div className='Carded-Box-Grid'>
                        <div className='Carded-Box-1'>

                          <img src={HghImg1} alt={artisan.artisan.first_name} />
                        </div>

                        <div className='Carded-Box-2'>
                          <div className='oo-dlsts'>
                            <h3>{artisan.artisan.first_name} {artisan.artisan.last_name} <span><Handyman /> {serviceDetailsProfession}</span></h3>
                            <div className='oo-dlsts-110'>
                              <div className='oo-dlsts-OO1'>
                                <h5><MyLocation /> {artisan.artisan.business_location}</h5>
                                {/* <h5><MyLocation /> Umuahia Abia state</h5> */}
                              </div>
                              <div className='oo-dlsts-OO2'>
                                {/* <h4><span> <Visibility /> {artisan.views}</span> <span><Star /> {artisan.rating} qwerty</span></h4> */}
                                <h4><span> <Visibility /> 16.2k</span> <span><Star />16</span></h4>
                              </div>
                            </div>

                          </div>
                          <div className='GLnad-btns'>
                            <div className='GLnad-btns-1'>

                              {/* <span>{artisan.status}</span>
                              {artisan.topRated && <span><Star /> Top Rated</span>} */}

                              <span>Actively Searching</span>
                              <span><Star /> Top Rated</span>
                            </div>

                            <div className='GLnad-btns-2'>
                              {/* <Link to="/user-dashboard/view-quote" className="Vw-qquote-btnna">View Quote</Link> */}

                              {/* <Link  to={{pathname: "/user-dashboard/view-quote",}} state={{ artisan }}> View Quote </Link> */}

                              <Link
                                to={`/artisan-profile?service_details=${encodeURIComponent(
                                  artisan.artisan.service_details?.name || ""
                                )}&service=${encodeURIComponent(
                                  artisan.artisan.service_details?.postname || ""
                                )}&artisan_location=${encodeURIComponent(
                                  artisan.artisan.user?.location || "N/A"
                                )}&artisan_phone=${encodeURIComponent(
                                  artisan.artisan?.phone || ""
                                )}&artisan_unique_id=${encodeURIComponent(
                                  artisan.artisan?.unique_id || ""
                                )}&artisan_name=${encodeURIComponent(
                                  `${artisan.artisan?.first_name || ""} ${artisan.artisan?.last_name || ""}`
                                )}`}
                              >
                                Profile
                              </Link>

                              

                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobArtisans;