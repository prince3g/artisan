import React, { useState, useEffect } from "react"; 
import PlacHolderImg1 from './Img/hu/hu1.jpg';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisteredArtisans = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const navigate = useNavigate();

  const [artisanData, setArtisanData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Function to fetch artisan data from a given URL
  const fetchArtisans = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred while fetching artisans.');
      }
      const data = await response.json();
      setArtisanData(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setCount(data.count);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch the initial artisan profiles
  useEffect(() => {
    fetchArtisans(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`);
  }, [djangoHostname]);

  // Pagination handlers
  const handleNextPage = () => {
    if (nextPage) {
      fetchArtisans(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (prevPage) {
      fetchArtisans(prevPage);
    }
  };

  // Handle deletion of an artisan
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artisan?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the artisan.");
      }
      // Update the artisan list after deletion
      setArtisanData((prevData) => prevData.filter((artisan) => artisan.id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Navigate to the artisan profile details
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
                    <span className="active-Btn">Activate</span>

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

      {/* Pagination buttons */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={!prevPage}>
          Previous
        </button>
        {/* Optionally, display the total count or current page info */}
        <span>{count} {count !== 1 ? " " : ""}</span>
        <button onClick={handleNextPage} disabled={!nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisteredArtisans;
