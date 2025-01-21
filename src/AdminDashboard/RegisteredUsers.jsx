import React from "react";
import { Link, useLocation } from "react-router-dom";
import PlacHolderImg1 from './Img/hu/hu1.jpg';
import PlacHolderImg2 from './Img/hu/hu2.jpg';




const RegisteredUsers = () => {
  const transactions = [
    {
      vendorImage: PlacHolderImg1,
      vendorName: "Prince Godson",
      email: "prince@example.com",
      phoneNumber: "123-456-7890",
      location: "Umuahia",
      registrationDate: "12/12/2022",
    },
    {
      vendorImage: PlacHolderImg2,
      vendorName: "Prince Godson",
      email: "prince@example.com",
      phoneNumber: "123-456-7890",
      location: "Umuahia",
      registrationDate: "12/12/2022",
    },
  ];

  return (
    <div className="tran-card">
      <div className="tran-card-header">
        <h2>SimserviceHub Artisan</h2>
      </div>
      <div className="tran-card-tableSec">
        <table className="table">
          <thead>
            <tr>
              <th>Artisan Name</th>
              <th>Email Address</th>
              <th>Phone number</th>
              <th>Location</th>
              <th>Registration Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="slt-td">
                  <a href="#" className="td-grid">
                    <div className="td-grid-img">
                      <img src={transaction.vendorImage} alt={transaction.vendorName} />
                    </div>
                    <div className="td-grid-txt">
                      <p>{transaction.vendorName}</p>
                    </div>
                  </a>
                </td>
                <td>{transaction.email}</td>
                <td>{transaction.phoneNumber}</td>
                <td><span>{transaction.location}</span></td>
                <td>{transaction.registrationDate}</td>
                <td>
                  <div className="action-btn">
                  <a href="/artisan-profile" className="accept-Btn">Profile</a>
                    <span className="suspend-Btn">Suspend</span>
                    <span className="Remove-Btn">Remove</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="more-sec">
        <a href="/pending-r.html">View more</a>
      </div>
    </div>
  );
};

export default RegisteredUsers;
