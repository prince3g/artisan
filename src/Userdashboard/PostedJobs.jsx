import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Userdashbaord.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from '@mui/icons-material/Visibility';

const PostedJobs = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const user_unique_user_id = sessionStorage.getItem('unique_user_id');
  
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/user-jobs/?user_id=${user_unique_user_id}`);
        if (!response.ok) {
          // Handle errors appropriately
          const errorData = await response.json();
          throw new Error(errorData.detail || 'An error occurred while fetching jobs.');
        }
        const data = await response.json();
        setJobs(data);

        // console.log("data")
        // console.log(data)
        // console.log("data")

      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobs();
  }, [djangoHostname, user_unique_user_id]);

  // Function to handle job removal
  const handleRemoveJob = async (jobId) => {
    const confirmed = window.confirm("Are you sure you want to remove this job?");
    if (confirmed) {
      try {
        const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/${jobId}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Remove the job from the local state
          setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
          console.log('Job removed successfully');
        } else {
          console.error('Failed to remove job');
        }
      } catch (error) {
        console.error('Error removing job:', error);
      }
    } else {
      console.log('Job removal cancelled');
    }
  };

  return (
    <div className="ooUserdashbaord-Page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/"> Customer dashboard</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/jobs"> Posted Jobs </Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Posted Jobs</h2>
            </div>

            <div className="Habgb-sec">
              <div className="My-Artisan-Body">
                <div className="garoo-Gird-part2">
                  {error ? (
                    <div className="error-message">
                      <p>{error}</p>
                    </div>
                  ) : (
                    Array.isArray(jobs) && jobs.map(job => (
                      <div className='Carded-Box' key={job.id}>
                      <div className='Carded-Box-Gridd'>
                        <div className='Carded-Box-2'>
                          <div className='oo-dlsts'>
                            <h3>{job.service_details.name} <span><AccessTimeIcon /> {new Date(job.created_at).toLocaleDateString()}</span></h3>
                            <div className='oo-dlsts-110'>
                              <div className='oo-dlsts-OO1'>
                                <h5><CheckCircleIcon /> {job.status.charAt(0).toUpperCase() + job.status.slice(1)} Post</h5>
                              </div>
                              <div className='oo-dlsts-OO2'>
                                <h4><span> <Visibility /> 100.2k</span></h4>
                              </div>
                            </div>
                          </div>

                          <div className='GLnad-btns ggfa-btns'>
                            <div className='GLnad-btns-1'>
                              <span>Active</span>
                              <span>
                                {/* <BusinessCenterIcon /> 23 Applications */}
                                <BusinessCenterIcon /> {job?.num_appllications} {job?.num_appllications > 1 ? "Applications" : "Application" }
                                </span>
                            </div>
                            <div className='GLnad-btns-2'>

                              {/* <Link to="/user-dashboard/job-artisans">View Artisans</Link> */}

                              <Link 
                                  to={{
                                    pathname: "/user-dashboard/job-artisans",
                                  }} 
                                  state={{ job }}
                                >
                                  View Artisans
                                </Link>

                              <button 
                                className="rwmovooo-btn" 
                                onClick={() => handleRemoveJob(job.id)} 
                              >
                                <DeleteIcon /><span> Remove Job</span>
                              </button>
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
        </div>
      </div>
    </div>
  );
};

export default PostedJobs;



