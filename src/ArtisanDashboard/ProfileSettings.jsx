
import React, { useState } from "react";
import "../LandingPages/Css/Main.css";
import { Link, useLocation } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ProfileSettings = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const location = useLocation();
  const { user_id, Address = '', first_name = '', last_name = '', user_phone = '' } = location.state || {};

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [phone, setPhone] = useState(user_phone);
  const [address, setAddress] = useState(Address);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      const data = await response.json();
      localStorage.setItem('user_phone', data.phone || '');
      localStorage.setItem('user_first_name', data.first_name || '');
      localStorage.setItem('user_last_name', data.last_name || '');
      localStorage.setItem('Address', data.address || '');

      alert("Profile updated successfully!");
    } catch (error) {
      console.log("An error occurred. Please try again.", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user_id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Gradnded-page">
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header uupoa">
              <h2 className="big-text">Profile Settings</h2>
              <p><Link to="/artisan-dashboard/">Go back</Link></p>
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

                <input type="text"  name="" placeholder="Post code" />

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
                    disabled={loading}
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

export default ProfileSettings;
