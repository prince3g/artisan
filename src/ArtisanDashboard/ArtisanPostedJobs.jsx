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
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  useEffect(() => {
    const artisanCategory = sessionStorage.getItem("artisanCategory");
    const artisanId = sessionStorage.getItem("unique_user_id");

    if (!artisanId) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      try {
        const response = await fetch(
          `https://api.cmvp.simu-l.com/api/auth/subscriptions/api/user-subscriptions/active/?user=${artisanId}`
        );
        if (!response.ok) {
          throw new Error("Failed to check subscription");
        }
        const subscriptionData = await response.json();

        if (subscriptionData && subscriptionData.is_active) {
          setHasActiveSubscription(true);
          fetchJobs();
        } else {
          setHasActiveSubscription(false);
        }
      } catch (error) {
        console.error("Subscription check error:", error);
        setHasActiveSubscription(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchJobs = async () => {
      if (!artisanCategory?.trim()) {
        console.error("Artisan Category is missing");
        return;
      }

      try {
        const response = await fetch(
          `${djangoHostname}/api/jobs/auth/api/jobs/by-service/?service_details=${artisanCategory}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        const sortedJobs = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const filteredJobs = sortedJobs.filter(
          (job) => job.customer_done === false || job.job_quote_accepted === false
        );

        setJobs(filteredJobs || []);
      } catch (error) {
        setError(error.message);
      }
    };

    checkSubscription();
  }, [djangoHostname]);

  if (loading) return <p>Loading...</p>;
  if (!hasActiveSubscription) return <p  className="no-artisans-message">Please Subscribe to see Posted jobs.</p>;
  if (error) return <p>{error}</p>;

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
                                {job.title}{" "}
                                <span>
                                  <AccessTimeIcon />{" "}
                                  {new Date(job.created_at).toLocaleDateString()}
                                </span>
                              </h3>
                              <div className="oo-dlsts-110">
                                <div className="oo-dlsts-OO1">
                                  <h5>
                                    <MyLocation /> {job.location}
                                  </h5>
                                </div>
                                <div className="oo-dlsts-OO2">
                                  <h4>
                                    <span>
                                      <Visibility /> 10.5k
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className="GLnad-btns">
                              <div className="GLnad-btns-1">
                                <span>{job.complexity}</span>
                                <BusinessCenterIcon /> {job?.num_appllications}{" "}
                                {job?.num_appllications > 1
                                  ? "Applications"
                                  : "Application"}
                              </div>
                              <div className="GLnad-btns-2">
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
                              <h3>
                                <img src={UserPlaceholder} alt="User" />{" "}
                                {job.customer}
                              </h3>
                              <p>
                                <CheckCircleIcon /> {job.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-artisans-message">No jobs available.</p>
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
