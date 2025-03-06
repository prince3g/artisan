// import React from "react";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const CompletedTrades = () => {
//   const tabledatas = [
//     {
//       vendorName: "Prince Godson",
//       email: "prince@example.com",
//       phoneNumber: "123-456-7890",
//       artisan: "John Doe",
//       tradeTitle: "Woodworking",
//       date: "12/12/2022",
//     },
//     {
//       vendorName: "Jane Doe",
//       email: "jane@example.com",
//       phoneNumber: "987-654-3210",
//       artisan: "Mary Smith",
//       tradeTitle: "Plumbing",
//       date: "10/10/2022",
//     },
//   ];

//   return (
//     <div className="Gen_Admin_BBD">
//       <div className="top-sec-main Gen_Admin_Header">
//         <h3>Completed Trades</h3>
//       </div>

//       <div className="tran-card">
//         <div className="tran-card-tableSec">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Customer</th>
//                 <th>Email</th>
//                 <th>Phone number</th>
//                 <th>Artisan</th>
//                 <th>Trade Title</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tabledatas.map((tabledata, index) => (
//                 <tr key={index}>
//                   <td>
//                     <div className="td-grid">

//                       <div className="td-grid-txt">
//                         <p>{tabledata.vendorName}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{tabledata.email}</td>
//                   <td>{tabledata.phoneNumber}</td>
//                   <td>{tabledata.artisan}</td>
//                   <td>{tabledata.tradeTitle}</td>
//                   <td>{tabledata.date}</td>
//                   <td>
//                     <span className="status-icon">
//                       <CheckCircleIcon />
//                       <span>Completed</span>
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompletedTrades;
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
          (job) => job.artisan_done && job.customer_done
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
                  <td>{job.location || "N/A"}</td>
                  <td>{job.title}</td>
                  <td>{new Date(job.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="status-icon">
                      <CheckCircleIcon />
                      <span>Completed</span>
                    </span>
                  </td>

                  <td>
                    <span><b>Bank:</b> First bank</span>
                    <span><b>Acc Name:</b> Prince Godson</span>
                    <span><b>Acc Number:</b> 0000999871880w</span>
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
