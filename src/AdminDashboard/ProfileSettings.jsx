import React, { useEffect, useState } from "react";
import "../LandingPages/Css/Main.css";
import axios from "axios";

const ProfileSettings = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [userId, setUserId] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    user_image: null, // For the profile photo
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = {
      email: localStorage.getItem("email") || "",
      firstName: localStorage.getItem("user_first_name") || "",
      lastName: localStorage.getItem("user_last_name") || "",
      phoneNumber: localStorage.getItem("user_phone") || "",
      address: localStorage.getItem("Address") || "",
      userId: localStorage.getItem("user_id") || "",
    };
    setFormData(storedData);
    setUserId(storedData.userId);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      user_image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader

    try {
      const data = new FormData();
      data.append("first_name", formData.firstName);
      data.append("last_name", formData.lastName);
      data.append("phone", formData.phoneNumber);
      data.append("address", formData.address);

      if (formData.user_image) {
        data.append("user_image", formData.user_image); // Add the file only if selected
      }

      const response = await axios.patch(
        `${djangoHostname}/api/accounts/auth/api/users/${userId}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      alert("Profile updated successfully!");

      // Update localStorage with the latest data
      localStorage.setItem("user_first_name", formData.firstName);
      localStorage.setItem("user_last_name", formData.lastName);
      localStorage.setItem("user_phone", formData.phoneNumber);
      localStorage.setItem("Address", formData.address);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec-main Gen_Admin_Header">
        <h3>Profile Settings</h3>
      </div>

      <div className="tran-card">
        <form className="tran-card-tableSec" onSubmit={handleSubmit}>
          <div className="Gland-Quest-data">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="Gland-Quest-data">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="Gland-Quest-data">
            <label>Phone number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="Gland-Quest-data">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="Gland-Quest-data all-prolFilw">
            <label>Upload Profile Photo (Optional)</label>
            <input type="file" name="user_image" onChange={handleFileChange} />
          </div>

          <div className="Gland-Cnt-Btn">
            <button type="submit" className="post-job-btn" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
