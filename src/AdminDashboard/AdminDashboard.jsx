// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import './AdminDashboard.css';
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { Link } from "react-router-dom";

// import AdminNav from './AdminNav';
// import AdminLeftNav from './AdminLeftNav';

// import AdminHomePage from './AdminHomePage';

// import AdminFooter from './AdminFooter';

// import ArtisansPage from './ArtisansPage';

// import CustomersPage from './CustomersPage';

// import CompletedTrades from './CompletedTrades';

// import AdminNotification from './AdminNotification';

// import ProfileSettings from './ProfileSettings';

// import PostedJobs from './PostedJobs';

// import JobDescription from './JobDescription';

// import Subscriptions from './Subscriptions';

// import AddSubscription from './AddSubscription';

// import EditSubscriptionPlan from './EditSubscriptionPlan';

// import ArtisanCridentials from './ArtisanCridentials';

// import ArtisanReviews from './ArtisanReviews';





// const AdminDashboard = () => {
//   const [showNavBar, setShowNavBar] = useState(false);

//   const toggleNav = () => {
//     setShowNavBar(prevState => !prevState);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.AdminLeftNav') && !event.target.closest('.AA_Toggle_NAV')) {
//         setShowNavBar(false);
//       }
//     };
//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className={`AdminDashboard-Page ${showNavBar ? 'Show_Nav_Bar' : ''}`}>

//       <AdminNav toggleNav={toggleNav} />

//       <div className="large-container">
//         <div className="Admin_Main">
//           <div className="Admin_Main_Left">
//             <div className="Admin_Main_Left_Nav">
//               <AdminLeftNav />
//             </div>
//           </div>
//           <div className="Admin_Main_Right">
//             <Routes>
//               <Route path="/" element={<AdminHomePage />} />
//               <Route path="/artisans" element={<ArtisansPage />} />
//               <Route path="/registered-customers" element={<CustomersPage />} />
//               <Route path="/completed-trades" element={<CompletedTrades />} />
//               <Route path="/notification" element={<AdminNotification />} />
//               <Route path="/profile-settings" element={<ProfileSettings />} />
//               <Route path="/posted-jobs" element={<PostedJobs />} />
//               <Route path="/job-description" element={<JobDescription />} />
//               <Route path="/subscriptions" element={<Subscriptions />} />
//               <Route path="/add-subscription" element={<AddSubscription />} />
//               <Route path="/edit-plan" element={<EditSubscriptionPlan />} />
//               <Route path="/artisan-cridentials" element={<ArtisanCridentials />} />

//               <Route path="/artisan-reviews" element={<ArtisanReviews />} />

//             </Routes>

//             <AdminFooter />
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './AdminDashboard.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

import AdminNav from './AdminNav';
import AdminLeftNav from './AdminLeftNav';
import AdminHomePage from './AdminHomePage';
import AdminFooter from './AdminFooter';
import ArtisansPage from './ArtisansPage';
import CustomersPage from './CustomersPage';
import CompletedTrades from './CompletedTrades';
import AdminNotification from './AdminNotification';
import ProfileSettings from './ProfileSettings';
import PostedJobs from './PostedJobs';
import JobDescription from './JobDescription';
import Subscriptions from './Subscriptions';
import AddSubscription from './AddSubscription';
import EditSubscriptionPlan from './EditSubscriptionPlan';
import ArtisanCridentials from './ArtisanCridentials';
import ArtisanReviews from './ArtisanReviews';

const AdminDashboard = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // State to store the user's email
  const navigate = useNavigate();

  const toggleNav = () => {
    setShowNavBar(prevState => !prevState);
  };

  useEffect(() => {
    // Fetch the user's email from your authentication system or local storage
    const email = sessionStorage.getItem("user_email"); // Example: Fetching from local storage
    setUserEmail(email);

    // Check if the email is authorized
    if (email !== "ekehanson@gmail.com" && email !== "ekenehanson@gmail.com") {
      navigate("/login"); // Redirect to an unauthorized page or login page
    }
  }, [navigate]);

  // If the email is not authorized, do not render the dashboard
  if (userEmail !== "support@simservicehub.com" && userEmail !== "ekenehanson@gmail.com") {
    return null; // or return a loading spinner or redirect component
  }

  return (
    <div className={`AdminDashboard-Page ${showNavBar ? 'Show_Nav_Bar' : ''}`}>
      <AdminNav toggleNav={toggleNav} />

      <div className="large-container">
        <div className="Admin_Main">
          <div className="Admin_Main_Left">
            <div className="Admin_Main_Left_Nav">
              <AdminLeftNav />
            </div>
          </div>
          <div className="Admin_Main_Right">
            <Routes>
              <Route path="/" element={<AdminHomePage />} />
              <Route path="/artisans" element={<ArtisansPage />} />
              <Route path="/registered-customers" element={<CustomersPage />} />
              <Route path="/completed-trades" element={<CompletedTrades />} />
              <Route path="/notification" element={<AdminNotification />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/posted-jobs" element={<PostedJobs />} />
              <Route path="/job-description" element={<JobDescription />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/add-subscription" element={<AddSubscription />} />
              <Route path="/edit-plan" element={<EditSubscriptionPlan />} />
              <Route path="/artisan-cridentials" element={<ArtisanCridentials />} />
              <Route path="/artisan-reviews" element={<ArtisanReviews />} />
            </Routes>

            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;