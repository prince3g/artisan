import React, { useState } from "react";
import "../LandingPages/Css/Main.css";
import { Link, useLocation } from "react-router-dom";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const EditProfile = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  // Use location to access state passed from the previous page
  const location = useLocation();
  const { user_id, Address, user_last_name, user_first_name, user_unique_user_id, user_phone } = location.state || {};

  // State for form fields
  const [firstName, setFirstName] = useState(user_first_name);
  const [lastName, setLastName] = useState(user_last_name);
  const [phone, setPhone] = useState(user_phone);
  const [address, setAddress] = useState(Address);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);
    formData.append("address", address);
    if (profilePhoto) formData.append("profile_photo", profilePhoto);

    try {
      const response = await fetch(`${djangoHostname}/api/accounts/auth/api/users/${user_id}/`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error updating profile");
      }

      // Parse the response JSON
      const data = await response.json();
      
      // Log the response data to the console
      // console.log(data);

      // Optionally, save the data to localStorage
      localStorage.setItem('user_phone', data.phone);
      localStorage.setItem('user_first_name', data.first_name);
      localStorage.setItem('user_last_name', data.last_name);
      localStorage.setItem('Address', data.address);

      alert("Profile updated successfully!");
    } catch (error) {
      // Handle error
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };


  return (
    <div className="Gradnded-page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />{" "}
            <Link to="/user-dashboard/">Customer dashboard</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/edit-profile">Edit profile</Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header uupoa">
              <h2 className="big-text">Edit your profile</h2>
              <p><Link to="/user-dashboard/">Go back</Link></p>
            </div>

            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label>First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="Gland-Quest-data">
                  <label>Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="Gland-Quest-data">
                  <label>Phone number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="Gland-Quest-data">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="Gland-Quest-data all-prolFilw">
                  <label>Upload Profile Photo (Optional)</label>
                  <input
                    type="file"
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                </div>

                <div className="Gland-Cnt-Btn">
                  <button
                    type="submit"
                    className="post-job-btn"
                    onClick={handleSubmit}
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Uploading..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

