import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import RegisteredArtisans from './RegisteredArtisans';

const AdminHomePage = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [artisanCount, setArtisanCount] = useState(0); // State to store artisan count
    const [customerCount, setCustomerCount] = useState(0); // State to store artisan count
    const [jobCount, setJobCount] = useState(0); // State to store job count
    const [postedJobCount, setPostedJobCount] = useState(0); // State to store job count
    const [pendingJobCount, setPendingdJobCount] = useState(0); // State to store job count
    const [completedJobCount, setCompletedJobCount] = useState(0); // State to store job count
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionStorage.getItem("hasReloaded")) {
          sessionStorage.setItem("hasReloaded", "true");
          window.location.reload();
        }
      }, []);
      
    // Fetch artisan count
    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'An error occurred while fetching artisans.');
                }
                const data = await response.json();
                setArtisanCount(data.count); // Use the length of the array to get the count

                //setPendingdJobCount(data.count); // Use the length of the array to get the count

            } catch (error) {
                setError(error.message);
            }
        };

        fetchArtisans();
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'An error occurred while fetching jobs.');
                }
                const data = await response.json();
    
                // console.log("data", data);
    
                setPostedJobCount(data.count); // Set total job count
    
                // Calculate completed and pending jobs
                const completedJobs = data.results.filter(job => job.customer_done).length;
                const pendingJobs = data.results.filter(job => !job.customer_done).length;

                //console.log(data.results.filter(job => !job.customer_done).length)
    
                setCompletedJobCount(completedJobs);
                setPendingdJobCount(pendingJobs);
    
            } catch (error) {
                setError(error.message);
            }
        };
    
        fetchJobs();
    }, []);
    

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(`${djangoHostname}/api/accounts/auth/api/users/`);
            if (!response.ok) {
              throw new Error("Failed to fetch users.");
            }
            const data = await response.json();
            // Filter users to include only customers
            const customers = data.results.filter((user) => user.user_type === "customer");
            setUsers(customers);

            // console.log("data")
            // console.log(data)
            // console.log("data")
    
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchUsers();
      }, []);

      

    return (
        <div className="AdminHomePage">
            <div className="top-sec">
                <div className="top-sec-main">
                    <h3>Welcome back Admin</h3>
                    <p>SimserviceHub admin dashboard</p>
                </div>
                <ul>
                    <li>
                        <Link to="/admin/registered-customers">
                            <PeopleIcon /> Customers
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/artisans">
                            <BuildIcon /> SimserviceHub Artisans
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="sub-topSec">
                <ul>
                    <li>
                        <h3>SimserviceHub Artisan</h3>
                        {/* Display artisan count */}
                        <h2>{artisanCount}</h2>
                        {/* {error && <p className="error">Error: {error}</p>} */}
                    </li>
                    <li>
                        <h3>Registered Customers</h3>
                        <h2>{users.length} <span>Users</span></h2>
                    </li>
                    <li>
                        <h3>Completed Trades</h3>
                        <h2>{completedJobCount}</h2>
                    </li>
                    <li>
                        <h3>Posted Jobs</h3>
                        {/* Display job count */}
                        <h2>{postedJobCount}</h2>
                    </li>

                    <li>
                        <h3>Pending Jobs</h3>
                        {/* Display job count */}
                        <h2>{pendingJobCount}</h2>
                    </li>


                </ul>
            </div>

            <div className="tran-card-header">
                <h2>SimserviceHub Artisan</h2>
                <a href="/admin/artisans">View more</a>
            </div>
            <RegisteredArtisans />
        </div>
    );
};

export default AdminHomePage;


