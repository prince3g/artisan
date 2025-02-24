import React, { useState, useEffect } from "react";
import PlacHolderImg1 from './Img/hu/hu1.jpg';
import { Link, useLocation, useNavigate } from "react-router-dom";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const RegisteredArtisans = () => {
  const [flash, setFlash] = useState(null);    
  const showMessage = (message, type) => {
    setFlash({ message, type });
  };
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const navigate = useNavigate();

  const [artisanData, setArtisanData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({});

  const fetchArtisans = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred while fetching artisans.');
      }
      const data = await response.json();
      setArtisanData(data.results);

      // console.log("data.results")
      // console.log(data.results)
      // console.log("data.results")
      
      setNextPage(data.next);
      setPrevPage(data.previous);
      setCount(data.count);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchArtisans(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`);
  }, [djangoHostname]);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artisan?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/auth/api/users/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        showMessage("YFailed to delete the artisan", "failure");
        throw new Error("Failed to delete the artisan.");
      }
      setArtisanData((prevData) => prevData.filter((artisan) => artisan.id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (uniqueId, isApproved, type) => {
    setLoadingStatus((prev) => ({ ...prev, [`${uniqueId}-${type}`]: true }));
    const url =  `${djangoHostname}/api/accounts/auth/api/users/${uniqueId}/`
    const body = type === "approve" ? { is_approved: !isApproved } : { is_suspended: !isApproved };
    
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to update status.");
      }
      setArtisanData((prevData) =>
        prevData.map((artisan) =>
          artisan.user.unique_id === uniqueId ? { ...artisan, user: { ...artisan.user, ...body } } : artisan
        )
      );

      // console.log("Success")
      showMessage("Artisan status changed successfully", "Success");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [`${uniqueId}-${type}`]: false }));
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
        {flash && (
          <FlashMessage
              message={flash.message}
              type={flash.type}
              onClose={() => setFlash(null)}
          />
        )}
        
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
                  <a href="#!" to="/artisan-profile" className="td-grid" onClick={() => handleProfileClick(artisanDatum)}>

                    <div className="td-grid-img">
                      <img src={artisanDatum.user_image || PlacHolderImg1} alt="Artisan" />
                    </div>
                    <div className="td-grid-txt">
                      <p>{artisanDatum.user.first_name} {artisanDatum.user.last_name}</p>
                    </div>
                  </a>
                </td>

                <td>{artisanDatum.user.email}</td>
                <td>{artisanDatum.user.phone}</td>
                <td><span>{artisanDatum.location}</span></td>
                <td>{new Date(artisanDatum.user.date_joined).toLocaleDateString()}</td>
                <td>
                  <div className="action-btn">

                    {/* <a href="#" className="accept-Btn" onClick={() => handleProfileClick(artisanDatum)}>Profile</a> */}


                    <span className="active-Btn" onClick={() => toggleStatus(artisanDatum.user.unique_id, artisanDatum.user.is_approved, "approve")}>
                      {loadingStatus[`${artisanDatum.user.unique_id}-approve`] ? (artisanDatum.user.is_approved ? "Deactivating..." : "Activating...") : (artisanDatum.user.is_approved ? "Deactivate" : "Activate")}
                    </span>
                    <span className="suspend-Btn" onClick={() => toggleStatus(artisanDatum.user.unique_id, artisanDatum.user.is_suspended, "suspend")}>
                      {loadingStatus[`${artisanDatum.user.unique_id}-suspend`] ? (artisanDatum.user.is_suspended ? "Unsuspending..." : "Suspending...") : (artisanDatum.user.is_suspended ? "Unsuspend" : "Suspend")}
                    </span>

                    <span
                      className="Remove-Btn"
                      onClick={() => handleDelete(artisanDatum.user.unique_id)}
                    >
                      {deletingId === artisanDatum.id ? "Deleting..." : "Remove"}
                    </span>
                  </div>
                  <div className="action-btn secc-bagbs-asa">
                    
                  <Link to="/admin/artisan-cridentials" className="accept-Btn">Cridentials
                  </Link>
                  
                  <Link to={{
                    pathname: "/admin/artisan-reviews", }}  state={{ artisanDatum }} className="reviews-Btn">Reviews
                  </Link>
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

