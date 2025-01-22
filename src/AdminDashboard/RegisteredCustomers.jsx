// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import PlacHolderImg1 from './Img/hu/hu1.jpg';
// import PlacHolderImg2 from './Img/hu/hu2.jpg';




// const RegisteredUsers = () => {
//   const tabledatas = [
//     {
//       vendorName: "Prince Godson",
//       email: "prince@example.com",
//       phoneNumber: "123-456-7890",
//       location: "Umuahia",
//       registrationDate: "12/12/2022",
//       trades: "20",
//     },
//     {
//       vendorImage: PlacHolderImg2,
//       vendorName: "Prince Godson",
//       email: "prince@example.com",
//       phoneNumber: "123-456-7890",
//       location: "Umuahia",
//       registrationDate: "12/12/2022",
//       trades: "100",
//     },
//   ];

//   return (
//     <div className="tran-card">
//       <div className="tran-card-tableSec">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Artisan Name</th>
//               <th>Email Address</th>
//               <th>Phone number</th>
//               <th>Location</th>
//               <th>Registration Date</th>
//               <th>Trades</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tabledatas.map((tabledata, index) => (
//               <tr key={index}>
//                 <td className="slt-td">
//                   <div className="td-grid">
//                     <div className="td-grid-txt">
//                       <p>{tabledata.vendorName}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{tabledata.email}</td>
//                 <td>{tabledata.phoneNumber}</td>
//                 <td><span>{tabledata.location}</span></td>
//                 <td>{tabledata.registrationDate}</td>
//                 <td>{tabledata.trades}</td>
//                 <td>
//                   <div className="action-btn">
//                     <span className="Remove-Btn">Remove</span>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RegisteredUsers;

import React, { useEffect, useState } from "react";
import PlacHolderImg1 from './Img/hu/hu1.jpg';

const RegisteredUsers = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // To track which item is being deleted

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/accounts/auth/api/users/`);
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        // Filter users to include only customers
        const customers = data.results.filter((user) => user.user_type === "customer");
        setUsers(customers);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artisan?")) {
        return; // Exit if the user cancels the confirmation dialog
    }

    setDeletingId(id); // Set the deleting state to show the loader

    try {
        const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/${id}/`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete the artisan.");
        }

        // Update the artisan list after successful deletion
        setArtisanData((prevData) => prevData.filter((artisan) => artisan.id !== id));
    } catch (error) {
        alert(error.message);
    } finally {
        setDeletingId(null); // Reset the deleting state
    }
};


  return (
    <div className="tran-card">
      <div className="tran-card-tableSec">
        <table className="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Registration Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="slt-td">
                  <div className="td-grid">
                    <div className="td-grid-img">
                      <img src={PlacHolderImg1} alt="Customer" />
                    </div>
                    <div className="td-grid-txt">
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><span>{user.address}</span></td>
                <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                <td>
                  <div className="action-btn">
                    <span
                        className="Remove-Btn"
                        onClick={() => handleDelete(user.id)}
                    >
                        {deletingId === user.id ? "Deleting..." : "Remove"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="error">Error: {error}</p>}
      </div>
    </div>
  );
};

export default RegisteredUsers;
