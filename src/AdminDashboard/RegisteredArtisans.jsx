// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import PlacHolderImg1 from './Img/hu/hu1.jpg';
// import PlacHolderImg2 from './Img/hu/hu2.jpg';




// const RegisteredArtisans = () => {
//   const tabledatas = [
//     {
//       vendorImage: PlacHolderImg1,
//       vendorName: "Prince Godson",
//       email: "prince@example.com",
//       phoneNumber: "123-456-7890",
//       location: "Umuahia",
//       registrationDate: "12/12/2022",
//     },
//     {
//       vendorImage: PlacHolderImg2,
//       vendorName: "Prince Godson",
//       email: "prince@example.com",
//       phoneNumber: "123-456-7890",
//       location: "Umuahia",
//       registrationDate: "12/12/2022",
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
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tabledatas.map((tabledata, index) => (
//               <tr key={index}>
//                 <td className="slt-td">
//                   <div className="td-grid">
//                     <div className="td-grid-img">
//                       <img src={tabledata.vendorImage} alt={tabledata.vendorName} />
//                     </div>
//                     <div className="td-grid-txt">
//                       <p>{tabledata.vendorName}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{tabledata.email}</td>
//                 <td>{tabledata.phoneNumber}</td>
//                 <td><span>{tabledata.location}</span></td>
//                 <td>{tabledata.registrationDate}</td>
//                 <td>
//                   <div className="action-btn">
//                   <a href="/artisan-profile" className="accept-Btn">Profile</a>
//                     <span className="suspend-Btn">Suspend</span>
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

// export default RegisteredArtisans;

import React, { useState, useEffect } from "react"; 
import PlacHolderImg1 from './Img/hu/hu1.jpg';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisteredArtisans = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const navigate = useNavigate(); // Initialize useNavigate
    const [artisanData, setArtisanData] = useState([]);
    const [deletingId, setDeletingId] = useState(null); // To track which item is being deleted
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'An error occurred while fetching artisans.');
                }
                const data = await response.json();
                setArtisanData(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchArtisans();
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


  const handleProfileClick = (artisanDatum) => {
        const queryParams = new URLSearchParams({
            service_details: artisanDatum.service_details.name,
            service: artisanDatum.service_details.name,
            artisan_location: artisanDatum.location,
            artisan_phone: artisanDatum.user.phone,
            artisan_unique_id: artisanDatum.user.unique_id,
            artisan_name: `${artisanDatum.user.first_name} ${artisanDatum.user.last_name}`,
        }).toString();

        navigate(`/artisan-profile?${queryParams}`);
    };


    return (
        <div className="tran-card">
            <div className="tran-card-tableSec">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Artisan Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Registration Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artisanData.map((artisanDatum) => (
                            <tr key={artisanDatum.id}>
                                <td className="slt-td">
                                    <div className="td-grid">
                                        <div className="td-grid-img">
                                            <img src={PlacHolderImg1} alt="Artisan" />
                                        </div>
                                        <div className="td-grid-txt">
                                            <p>{artisanDatum.user.first_name} {artisanDatum.user.last_name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{artisanDatum.user.email}</td>
                                <td>{artisanDatum.user.phone}</td>
                                <td><span>{artisanDatum.location}</span></td>
                                <td>{new Date(artisanDatum.user.date_joined).toLocaleDateString()}</td>
                                <td>
                                    <div className="action-btn">

                                        <a
                                            href="#!"
                                            className="accept-Btn"
                                            onClick={() => handleProfileClick(artisanDatum)}
                                        >
                                            Profile
                                        </a>


                                        <span className="suspend-Btn">Suspend</span>
                                        <span
                                            className="Remove-Btn"
                                            onClick={() => handleDelete(artisanDatum.id)}
                                        >
                                            {deletingId === artisanDatum.id ? "Deleting..." : "Remove"}
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

export default RegisteredArtisans;

