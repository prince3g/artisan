
import React, { useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UserPlaceholder from "./Img/user-placeholder.png";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const JobDescription = () => {

  const navigate = useNavigate(); // Initialize useNavigate
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const job = location.state || {};


  const [deletingJobId, setDeletingJobId] = useState(null); // Track job being deleted

  
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
  
        alert("Job deleted successfully!");
        // Redirect to the job listing page or update the state
       navigate("/admin/posted-jobs");
      } catch (error) {
        console.error("Failed to delete job:", error);
        alert(error.message || "An error occurred while deleting the job.");
      } finally {
        setDeletingJobId(null); // Clear the deleting state
      }
    }
  };

// console.log("job.job")

// console.log(job.job)

// console.log("job.job")

  return (
    <div className="Gen_Admin_BBD">
      <div className="Gradnded-main">
        <div className="Gradnded-Box AA_hha">
          <Link to="/admin/posted-jobs" className="back_Link">
            <ArrowBackIcon /> Back
          </Link>
          <div className="Habgb-sec">
            <div className="My-Artisan-Body">
              <div className="garoo-Gird-part2">
                <div className="Carded-Box">
                  <div className="Carded-Box-Gridd">
                    <div className="Carded-Box-2">
                      <div className="oo-dlsts">
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
                          <img src={UserPlaceholder} alt="User" /> {job.job?.customer} {"Unknown"}
                        </h3>
                        <p>
                          <CheckCircleIcon /> Active
                        </p>
                      </div>

                      <div className="kklauis-seds">
                        <h3>What to do</h3>
                        <p>{job.job.service_details?.name} {" "}</p>
                        <h3>Issues description</h3>

                        <p>
                        {job.job?.service_description} {" "}
                        </p>
                        <h3>More description</h3>
                        <p> {job.job?.description} {" "}
                        </p>
                      </div>

                      <div className="GLnad-btns ggfa-btns">
                        <div className="GLnad-btns-1">
                        <span>{job.job?.job_type === "simple" ? "Simple Job" : "Complex Job"}</span>

                          <span>
                            <BusinessCenterIcon /> 20 Applications
                          </span>
                        </div>
                        <div className="GLnad-btns-2">
                          <button
                            className="rwmovooo-btn"
                            onClick={() => handleDelete(job.job.id)}
                            disabled={deletingJobId === job.job.id}
                          >
                            {deletingJobId === job.job.id ? "Deleting..." : "Remove Job"}
                          </button>
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

