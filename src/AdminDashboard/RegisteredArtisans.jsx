import React from "react";
import { Link, useLocation } from "react-router-dom";
import PlacHolderImg1 from './Img/hu/hu1.jpg';
import PlacHolderImg2 from './Img/hu/hu2.jpg';




const RegisteredArtisans = () => {
  const tabledatas = [
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
            {tabledatas.map((tabledata, index) => (
              <tr key={index}>
                <td className="slt-td">
                  <div className="td-grid">
                    <div className="td-grid-img">
                      <img src={tabledata.vendorImage} alt={tabledata.vendorName} />
                    </div>
                    <div className="td-grid-txt">
                      <p>{tabledata.vendorName}</p>
                    </div>
                  </div>
                </td>
                <td>{tabledata.email}</td>
                <td>{tabledata.phoneNumber}</td>
                <td><span>{tabledata.location}</span></td>
                <td>{tabledata.registrationDate}</td>
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
    </div>
  );
};

export default RegisteredArtisans;
