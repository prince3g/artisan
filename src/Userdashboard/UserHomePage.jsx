// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import './Userdashbaord.css';
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { Link, useLocation } from "react-router-dom";

// import UserPlaceholder from './Img/user-placeholder.png';

// import PhoneIcon from '@mui/icons-material/Phone';
// import EditIcon from '@mui/icons-material/Edit';

// import PeopleIcon from '@mui/icons-material/People';
// import WorkIcon from '@mui/icons-material/Work';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// import MyArtisan from './MyArtisan';





// const UserHomePage = () => {

//   const user_last_name = localStorage.getItem('user_last_name');
//   const user_first_name = localStorage.getItem('user_first_name');

//   const user_unique_user_id= localStorage.getItem('unique_user_id');

//   const user_phone = localStorage.getItem('user_phone');

//   return (
//    <div className="ooUserdashbaord-Page">
//      <div className="navigating-ttarvs">
//                 <div className="site-container">
//                     <p>
//                         <Link to="/">Simservicehub</Link> <ChevronRightIcon />
//                         <Link to="/user-dashboard/"> Customer dashboardd</Link> <ChevronRightIcon />
//                         <Link to="/user-dashboard/">
//                         {user_last_name}   {user_first_name} </Link>
//                     </p>
//                 </div>
//             </div>

//             <div className="site-container">
//         <div className="Gradnded-main">
//           <div className="Gradnded-Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Welcome  {user_first_name} !</h2>
//             </div>

//             <div className="Habgb-sec">
//               <div className="Habgb-Top">
//               <div className="Habgb-Top-00">
//               <div className="Habgb-Top-1">
//               <div className="Habgb-Top-10">
//                 <img src={UserPlaceholder}></img>
//               </div>
//               <div className="Habgb-Top-11">
//                 <div>
//                 <h3> {user_first_name}   {user_last_name}</h3>
//                 <p>
//                     <PhoneIcon />  {user_phone}
//                 </p>
//               </div>
//               </div>
//                 </div>
//                 <Link to="/user-dashboard/edit-profile" className="edit-Bntnn">
//                     <EditIcon /> Edit Profile
//                 </Link>
//               </div>
//               <div className="Habgb-Top-2">
//                 <Link to="/user-dashboard/" className="my-artisan">
//                 <PeopleIcon /> My Artisan
//                 </Link>

//                 <Link to="/user-dashboard/jobs">
//                 <WorkIcon /> Jobs
//                 </Link>

//                 <Link to="/saved-trades">
//                 <FavoriteIcon /> Saved Trades
//                 </Link>

//               </div>
//               </div>

//               <MyArtisan />

//             </div>

//             </div>
//             </div>
//             </div>



//    </div>
//   );
// };

// export default UserHomePage;




import React from "react";
import { Link } from "react-router-dom";
import './Userdashbaord.css';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';

import UserPlaceholder from './Img/user-placeholder.png';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MyArtisan from './MyArtisan';

const UserHomePage = () => {

  const user_last_name = localStorage.getItem('user_last_name');
  const user_id= localStorage.getItem('user_id');
  const Address= localStorage.getItem('Address');
  const user_first_name = localStorage.getItem('user_first_name');
  const user_unique_user_id = localStorage.getItem('unique_user_id');
  const user_phone = localStorage.getItem('user_phone');

  
  // Create an object with the user data to pass through state
  const userData = {
    user_id,
    Address,
    user_last_name, 
    user_first_name,
    user_unique_user_id,
    user_phone
  };


  return (
    <div className="ooUserdashbaord-Page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/"> Customer dashboard</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/edit-profile" state={userData}> {/* Pass state to EditProfile */}
              {user_last_name} {user_first_name}
            </Link>
          </p>
        </div>
      </div>


      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Welcome {user_first_name}!</h2>
            </div>

            <div className="Habgb-sec">
              <div className="Habgb-Top">
                <div className="Habgb-Top-00">
                  <div className="Habgb-Top-1">
                    <div className="Habgb-Top-10">
                      <img src={UserPlaceholder} alt="User" />
                    </div>
                    <div className="Habgb-Top-11">
                      <div>
                        <h3>{user_first_name} {user_last_name}</h3>
                        <p>
                          <PhoneIcon /> {user_phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/user-dashboard/edit-profile"
                    state={userData}  // Pass the user data via state
                    className="edit-Bntnn"
                  >
                    <EditIcon /> Edit Profile
                  </Link>
                </div>
                <div className="Habgb-Top-2">
                  <Link to="/user-dashboard/" className="my-artisan">
                    <PeopleIcon /> My Artisan
                  </Link>

                  <Link to="/user-dashboard/jobs">
                    <WorkIcon /> Jobs
                  </Link>

                  <Link to="/saved-trades">
                    <FavoriteIcon /> Saved Trades
                  </Link>
                </div>
              </div>

              <MyArtisan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserHomePage;
