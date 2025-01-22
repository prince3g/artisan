import React from "react";
import { Link } from "react-router-dom";

import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';

import RegisteredArtisans from './RegisteredArtisans';

const AdminHomePage = () => {
  return (
    <div className="AdminHomePage">
      <div className="top-sec">
        <div className="top-sec-main">
          <h3>Welcome back Admin</h3>
          <p>SimserviceHub admin dashboard</p>
        </div>
        <ul>
          <li>
            <Link to="/pending-r">
              <PeopleIcon /> Customers
            </Link>
          </li>
          <li>
            <Link to="/withdrawal">
              <BuildIcon /> SimserviceHub Artisans
            </Link>
          </li>
        </ul>
      </div>

      <div className="sub-topSec">
        <ul>
          <li>
            <h3>SimserviceHub Artisan</h3>
            <h2>70</h2>
          </li>
          <li>
            <h3>Registered Customers</h3>
            <h2>100 <span>Users</span></h2>
          </li>
          <li>
            <h3>Completed Trades</h3>
            <h2>20</h2>
          </li>
          <li>
            <h3>Posted Jobs</h3>
            <h2>5</h2>
          </li>
        </ul>
      </div>

      <div className="tran-card-header">
        <h2>SimserviceHub Artisan</h2>
        <a href="/pending-r.html">View more</a>
      </div>
      <RegisteredArtisans />
    </div>
  );
};

export default AdminHomePage;
