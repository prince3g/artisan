
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import MyLocation from "@mui/icons-material/MyLocation";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import UserPlaceholder from "./Img/user-placeholder.png";

// const ArtisanPostedJobs = () => {
//   const [jobs, setJobs] = useState([
//     {
//       id: 1,
//       title: "Plumbering",
//       date: "12/12/2024",
//       location: "Rivers State",
//       views: "16.2k",
//       applications: 20,
//       complexity: "Complex Job",
//       postedBy: "Rivera Quera",
//       status: "Active",
//     },
//     {
//       id: 2,
//       title: "Carpentry",
//       date: "15/01/2025",
//       location: "Kano State, Nigeria",
//       views: "10.5k",
//       applications: 4,
//       complexity: "Moderate Job",
//       postedBy: "Johana Darius",
//       status: "Active",
//     },
//   ]);

//   return (
//     <div className="ooUserdashbaord-Page">
//       <div className="site-container">
//         <div className="Gradnded-main">
//           <div className="Gradnded-Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Jobs</h2>
//             </div>

//             <div className="Habgb-sec">
//               <div className="My-Artisan-Body">
//                 <div className="garoo-Gird-part2">
//                   {jobs.map((job) => (
//                     <div className="Carded-Box" key={job.id}>
//                       <div className="Carded-Box-Gridd">
//                         <div className="Carded-Box-2">
//                           <div className="oo-dlsts">
//                             <h3>
//                               {job.title} <span><AccessTimeIcon /> {job.date}</span>
//                             </h3>
//                             <div className="oo-dlsts-110">
//                               <div className="oo-dlsts-OO1">
//                                 <h5><MyLocation /> {job.location}</h5>
//                               </div>
//                               <div className="oo-dlsts-OO2">
//                                 <h4><span><Visibility /> {job.views}</span></h4>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="GLnad-btns">
//                             <div className="GLnad-btns-1">
//                               <span>{job.complexity}</span>
//                               <span><BusinessCenterIcon /> {job.applications} Applications</span>
//                             </div>
//                             <div className="GLnad-btns-2">
//                               <Link to="/artisan-dashboard/job-description">Job Description</Link>
//                             </div>
//                           </div>
//                           <div className="ahhgs-sec">
//                             <h3><img src={UserPlaceholder} alt="User" /> {job.postedBy}</h3>
//                             <p><CheckCircleIcon /> {job.status}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtisanPostedJobs;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import MyLocation from "@mui/icons-material/MyLocation";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import UserPlaceholder from "./Img/user-placeholder.png";

// const ArtisanPostedJobs = () => {
  

//   const [jobs, setJobs] = useState([
//     {
//       id: 1,
//       title: "Plumbering",
//       date: "12/12/2024",
//       location: "Rivers State",
//       views: "16.2k",
//       applications: 34,
//       complexity: "Complex Job",
//       postedBy: "Rivera Quera",
//       status: "Active",
//     },
//     {
//       id: 2,
//       title: "Carpentry",
//       date: "15/01/2025",
//       location: "Kano State, Nigeria",
//       views: "10.5k",
//       applications: 4,
//       complexity: "Moderate Job",
//       postedBy: "Johana Darius",
//       status: "Active",
//     },
//   ]);
  
//  const [error, setError] = useState(null); // State to track errors
//  const [loading, setLoading] = useState(true); // State to track loading state
//  const [jobs1, setJobs1] = useState([]); // State to hold job data

//   useEffect(() => {
//     // Fetch data from API
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch jobs");
//         }
//         const data = await response.json();
//         setJobs1(data.results); // Set jobs data
//         console.log("jobs1")
//         console.log(jobs1)
//         console.log("jobs1")
//       } catch (error) {
//         setError(error.message); // Set error message
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchJobs();
//   }, []);



//   return (
//     <div className="ooUserdashbaord-Page">
//       <div className="site-container">
//         <div className="Gradnded-main">
//           <div className="Gradnded-Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Jobs</h2>
//             </div>

//             <div className="Habgb-sec">
//               <div className="My-Artisan-Body">
//                 <div className="garoo-Gird-part2">
//                   {jobs.map((job) => (
//                     <div className="Carded-Box" key={job.id}>
//                       <div className="Carded-Box-Gridd">
//                         <div className="Carded-Box-2">
//                           <div className="oo-dlsts">
//                             <h3>
//                               {job.title} <span><AccessTimeIcon /> {job.date}</span>
//                             </h3>
//                             <div className="oo-dlsts-110">
//                               <div className="oo-dlsts-OO1">
//                                 <h5><MyLocation /> {job.location}</h5>
//                               </div>
//                               <div className="oo-dlsts-OO2">
//                                 <h4><span><Visibility /> {job.views}</span></h4>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="GLnad-btns">
//                             <div className="GLnad-btns-1">
//                               <span>{job.complexity}</span>
//                               <span><BusinessCenterIcon /> {job.applications} Applications</span>
//                             </div>
//                             <div className="GLnad-btns-2">
//                               <Link to="/artisan-dashboard/job-description">Job Description</Link>
//                             </div>
//                           </div>
//                           <div className="ahhgs-sec">
//                             <h3><img src={UserPlaceholder} alt="User" /> {job.postedBy}</h3>
//                             <p><CheckCircleIcon /> {job.status}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtisanPostedJobs;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import MyLocation from "@mui/icons-material/MyLocation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UserPlaceholder from "./Img/user-placeholder.png";

const ArtisanPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  useEffect(() => {
    const artisanCategory = sessionStorage.getItem("artisanCategory");

     
    const fetchArtisanDetail = async () => {
      if (!artisanCategory?.trim()) {
        console.error('Artisan Unique ID is missing');
        return;
      }}


    const fetchJobs = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/by-service/?service_details=${artisanCategory}`);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data || []); // Ensure data is an array
        // console.log("Fetched jobs:", data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    fetchArtisanDetail();
  }, [ djangoHostname]);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ooUserdashbaord-Page">
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Jobs</h2>
            </div>

            <div className="Habgb-sec">
              <div className="My-Artisan-Body">
                <div className="garoo-Gird-part2">
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div className="Carded-Box" key={job.id}>
                        <div className="Carded-Box-Gridd">
                          <div className="Carded-Box-2">
                            <div className="oo-dlsts">
                              <h3>
                                {job.title} <span><AccessTimeIcon /> {new Date(job.created_at).toLocaleDateString()}</span>
                              </h3>
                              <div className="oo-dlsts-110">
                                <div className="oo-dlsts-OO1">
                                  <h5><MyLocation /> {job.location}</h5>
                                </div>
                                <div className="oo-dlsts-OO2">
                                  {/* <h4><span><Visibility /> {job.views}</span></h4> */}
                                  <h4><span><Visibility /> 10.5k</span></h4>
                                </div>
                              </div>
                            </div>
                            <div className="GLnad-btns">
                              <div className="GLnad-btns-1">
                                <span>{job.complexity}</span>
                                {/* <span><BusinessCenterIcon />23 Applications</span> */}
                                <BusinessCenterIcon /> {job?.num_appllications} {job?.num_appllications > 1 ? "Applications" : "Application" }
                              </div>
                              <div className="GLnad-btns-2">
                                {/* <Link to="/artisan-dashboard/job-description">Job Description</Link> */}
                                <Link 
                                  to={{
                                    pathname: "/artisan-dashboard/job-description",
                                  }} 
                                  state={{ job }}
                                >
                                  Job Description
                                </Link>
                              </div>
                            </div>
                            <div className="ahhgs-sec">
                              <h3><img src={UserPlaceholder} alt="User" /> {job.customer}</h3>
                              <p><CheckCircleIcon /> {job.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No jobs available.</p>
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

export default ArtisanPostedJobs;
