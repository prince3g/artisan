import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CompletedTrades = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/jobs/auth/api/jobs/`);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        // Filter only completed jobs

        // console.log("data")
        // console.log(data)
        // console.log("data")

        const completedJobs = data.results.filter(
          //(job) => job.artisan_done
          (job) => job.customer_done
         // (job) => job.artisan_done && job.customer_done
          // (job) => job.artisan_done && job.customer_done && job.admin_done
        );
        setJobs(completedJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [djangoHostname]);

//   useEffect(() => {
//   const fetchPayoutDetails = async () => {

//     const artisan_unique_id = artisan.artisan?.quote?.artisan?.unique_id
//     try {
//       const response = await axios.get(
//         `${djangoHostname}/api/auth/payouts/payouts/${artisan_unique_id}/`
        
//       );
//       setPayoutDetails(response.data);

//       // console.log("response.data")
//       // console.log(response.data)
//       // console.log("response.data")
      
//     } catch (error) {
//       console.error("Error fetching payout details:", error);
//     }
//   };
//   fetchPayoutDetails();
// }, [djangoHostname, user_unique_user_id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec-main Gen_Admin_Header">
        <h3>Completed Trades</h3>
      </div>

      <div className="tran-card">
        <div className="tran-card-tableSec">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Artisan</th>
                <th>Artisan Email</th>
                {/* <th>Address</th> */}
                <th>Trade Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payout Details</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="td-grid">
                      <div className="td-grid-txt">
                        <p>{job.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {job.artisan
                      ? `${job.artisan.first_name} ${job.artisan.last_name} `
                      : "No Artisan Assigned"}
                  </td>
                  <td>
                    {job.artisan
                      ? `${job.artisan.email}, ${job.artisan.phone}`
                      : "No Artisan Assigned"}
                  </td>
                  {/* <td>{job.location || "N/A"}</td> */}
                  <td>{job.title}</td>
                  <td>{new Date(job.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="status-icon">
                      <CheckCircleIcon />
                      <span>Completed</span>
                    </span>
                  </td>

                  <td>
                    <span><b>Bank: </b>{job.artisan.bank_name}</span><br></br>
                    <span><b>Acc Name: </b>{job.artisan.account_name}</span><br></br>
                    <span><b>Acc Number: </b>{job.artisan.account_number}</span><br></br>
                    <span><b>Acc Type: </b>{job.artisan.account_type}</span><br></br>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedTrades;
