import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete"; 
import MyLocation from '@mui/icons-material/MyLocation';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UserPlaceholder from './Img/user-placeholder.png';
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const JobDescription = () => {

    const [hasQuote, setHasQuote] = useState(false);
    const [quote, setQuote] = useState("");
    const [flash, setFlash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingJobId, setDeletingJobId] = useState(null); // Track job being deleted
    const showMessage = (message, type) => {
      setFlash({ message, type });
    };


  const navigate = useNavigate(); // Initialize useNavigate
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const job = location.state || {};

  // console.log("job.job")
  // console.log(job.job)
  // console.log("job.job")

  const jobId = job.job?.unique_id;
  const artisanId  = sessionStorage.getItem("unique_user_id");


  useEffect(() => {
      if (jobId && artisanId) {


      fetch(`${djangoHostname}/api/auth/quotes/quote_request/quote_for_a_job_by_an_artisan_job/?job_id=${jobId}&artisan_id=${artisanId}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    console.warn("Quote not found. Setting hasQuote to false.");
                    setHasQuote(false);
                    return null;
                }
                throw new Error("Failed to fetch quote");
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                setHasQuote(true);
                setQuote(data);
                // console.log("Fetched quote:", data);
            }
        })
        .catch(error => console.error("Error fetching quote:", error));

            }
  }, [jobId, artisanId]);
    
  const handleDelete = async (jobId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this job?");
      if (confirmDelete) {
        setDeletingJobId(jobId); // Set the job being deleted
        try {
          const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/${jobId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to delete the job. Please try again.");
          }
    
          // alert("Job deleted successfully!");
          showMessage("Job deleted successfully!", "success"); 
          navigate("/artisan-dashboard/job-description");

        } catch (error) {
          console.error("Failed to delete job:", error);
          showMessage(error.message || "An error occurred while deleting the job.", "failure");
         // alert(error.message || "An error occurred while deleting the job.");
        } finally {
          setDeletingJobId(null); // Clear the deleting state
        }
      }
    };
  


  return (
   <div className="ooUserdashbaord-Page">
    
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
          <Link to="/artisan-dashboard" className="back_Link">
            <ArrowBackIcon /> Back
          </Link>

          {flash && (
              <FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash(null)}
              />
            )}

            <div className="Gradnded-Box-header">
              <h2 className="big-text"> {job.job.service_details?.postName}{" "}</h2>
            </div>

            <div className="Habgb-sec">

            <div className="My-Artisan-Body">
             
             <div className='garoo-Gird-part2'>


           <div className='Carded-Box'>
           <div className='Carded-Box-Gridd'>
   
           <div className='Carded-Box-2'>
             <div className='oo-dlsts'>
             <h3>
                {job.job.service_details?.postName}{" "}
                <span>
                  <AccessTimeIcon />{" "}
                  {new Date(job.job?.created_at).toLocaleDateString()}
                </span>
              </h3>
             </div>

               <div className="ahhgs-sec">
                <h3>
                  {/* <img src={UserPlaceholder} alt="User" /> */}
                   {job.job?.customer}
                </h3>
                <p><CheckCircleIcon /> Active</p>
               </div>

               <div className="kklauis-seds">
                <h3>What to do</h3>
                <p>{job.job.service_details?.name} {" "}</p>
                {/* <p>Electrical fault repairs</p>
                <h3>Issues description</h3> */}
                <p>{job.job?.service_description} {" "}</p>
                <h3>More decription</h3>
                <p>{job.job?.description} {" "}</p>
               </div>


               <div className='GLnad-btns ggfa-btns'>
               <div className='GLnad-btns-1'>
               <span>{job.job?.job_type === "simple" ? "Simple Job" : "Complex Job"}</span>
                {/* <span><BusinessCenterIcon /> {job.job?.num_appllications} Applications</span> */}
                <span>
                  <BusinessCenterIcon /> {job.job?.num_appllications} {job.job?.num_appllications > 1 ? "Applications" : "Application" }
                  </span>
                 </div>
                 <div className='GLnad-btns-2'>

                   {/* <Link to="/artisan-dashboard/send-quote">Send Quote</Link> */}

                  {/* <Link 
                      to={{
                      pathname: "/artisan-dashboard/send-quote",}} 
                      state={{job}}>Send Quote
                  </Link> */}
                 <Link
                    to={{
                        pathname: "/artisan-dashboard/send-quote",
                    }}
                    {...(hasQuote ? { state: { quote } } : { state: { job } })} // Only pass quote if hasQuote is true
                >
                    {hasQuote ? "Resend Quote" : "Send Quote"}
                </Link>


                 </div>
               </div>
               
           </div>
           </div>
     
           </div>


         </div>
            
      </div>


    </div>

            </div>
            </div>
            </div>
   </div>
  );
};

export default JobDescription;



// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";

// import Visibility from '@mui/icons-material/Visibility';

// import DeleteIcon from "@mui/icons-material/Delete"; 

// import MyLocation from '@mui/icons-material/MyLocation';
// import AccessTimeIcon from "@mui/icons-material/AccessTime";

// import UserPlaceholder from './Img/user-placeholder.png';

// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

// import CheckCircleIcon from "@mui/icons-material/CheckCircle";



// const JobDescription = () => {


//   return (
//    <div className="ooUserdashbaord-Page">
    
//             <div className="site-container">
//         <div className="Gradnded-main">
//           <div className="Gradnded-Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Plumbering</h2>
//             </div>

//             <div className="Habgb-sec">

//             <div className="My-Artisan-Body">
             
//              <div className='garoo-Gird-part2'>


//            <div className='Carded-Box'>
//            <div className='Carded-Box-Gridd'>
   
//            <div className='Carded-Box-2'>
//              <div className='oo-dlsts'>
//                <h3>Plumbering <span><AccessTimeIcon /> 12/12/2024</span></h3>
//              </div>

//                <div className="ahhgs-sec">
//                 <h3><img src={UserPlaceholder} /> Prince Godson</h3>
//                 <p><CheckCircleIcon /> Active</p>
//                </div>

//                <div className="kklauis-seds">
//                 <h3>What to do</h3>
//                 <p>Electrical fault repairs</p>
//                 <h3>Issues description</h3>
//                 <p>Simple (Items which trips the electrics identified, issues with single appliance or a few sockets)</p>
//                 <h3>More decription</h3>
//                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae laboriosam omnis molestias, eius eos nam possimus dolorem beatae laborum voluptate culpa debitis in sit similique deleniti voluptatem modi necessitatibus? Fugiat.</p>
//                </div>


//                <div className='GLnad-btns ggfa-btns'>
//                <div className='GLnad-btns-1'>
//                 <span>Simple Job</span>
//                 <span><BusinessCenterIcon /> 20 Applications</span>
//                  </div>
//                  <div className='GLnad-btns-2'>
//                  <button className="apply-brnsns">Apply now</button>

//                  </div>
//                </div>
               
//            </div>
//            </div>
     
//            </div>


//          </div>
            
//              </div>


//             </div>

//             </div>
//             </div>
//             </div>
//    </div>
//   );
// };

// export default JobDescription;
