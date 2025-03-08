import './Css/Main.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Star from '@mui/icons-material/Star';
import Favorite from '@mui/icons-material/Favorite';
import Handyman from '@mui/icons-material/Handyman';
import MyLocation from '@mui/icons-material/MyLocation';
import Visibility from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import HghImg1 from './Img/hghImgs/1.png';

const SavedTrades = () => {
  const [favoriteArtisans, setFavoriteArtisans] = useState(new Set());
  const unique_user_id = sessionStorage.getItem('unique_user_id');
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [artisanData, setArtisanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favorites from the API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `${djangoHostname}/api/profiles/auth/api/favorites/?unique_user_id=${unique_user_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('fetchFavorites data:', data);

        // Ensure data is in the expected format
        if (data && Array.isArray(data.favorites)) {
          setArtisanData(data.favorites); // Set the artisan data
        } else {
          setArtisanData([]); // Set to empty array if data is invalid
        }

        // Update favoriteArtisans state
        const favoriteIds = new Set(data.favorites.map((artisan) => artisan.id));
        setFavoriteArtisans(favoriteIds);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to fetch favorite artisans. Please try again later.');
        setArtisanData([]); // Set to empty array to prevent .map() errors
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchFavorites();
  }, [djangoHostname, unique_user_id]);

  const handleFavoriteToggle = async (artisanId) => {
    try {
      const isFavorite = favoriteArtisans.has(artisanId);
      const method = isFavorite ? 'DELETE' : 'POST';
  
      const response = await fetch(`${djangoHostname}/api/add_favorite/${artisanId}/`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          unique_user_id, // Ensure this is correctly set
          artisan_unique_id: artisanId, // Sending both user ID and artisan ID in the payload
        }),
      });
  
      if (response.ok) {
        setFavoriteArtisans((prevFavorites) => {
          const updatedFavorites = new Set(prevFavorites);
          if (isFavorite) {
            updatedFavorites.delete(artisanId); // Remove from favorites
          } else {
            updatedFavorites.add(artisanId); // Add to favorites
          }
          return updatedFavorites;
        });
      } else {
        console.error(`Error ${isFavorite ? 'removing' : 'adding'} favorite:`, await response.json());
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  
  return (
    <div className="Gradnded-page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />{' '}
            <Link to="/saved-trades">Saved Trades</Link>
          </p>
        </div>
      </div>
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Saved Trades</h2>
            </div>
            <div className="Gradnded-Box-Body">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : Array.isArray(artisanData) && artisanData.length > 0 ? (
                <div className="garoo-Gird-part2">
                  {artisanData.map((artisan, index) => (
                    <div className="Carded-Box" key={index}>
                      <div className="Carded-Box-Grid">
                        <div className="Carded-Box-1">
                          <img
                            src={HghImg1 || 'default-image-path.png'}
                            alt={`${artisan.user.first_name}`}
                          />
                        </div>
                        <div className="Carded-Box-2">
                          <div className="oo-dlsts">
                            <h3>
                              {artisan.user.first_name} {artisan.user.last_name}
                              <span>
                                <Handyman /> {artisan.service_details.name}
                              </span>
                            </h3>
                            <div className="oo-dlsts-110">
                              <div className="oo-dlsts-OO1">
                                <h5>
                                  <MyLocation /> {artisan.location}
                                </h5>
                              </div>
                              <div className="oo-dlsts-OO2">
                                <h4>
                                  <span>
                                    <Visibility /> 16.2k
                                  </span>{' '}
                                  <span>
                                    <Star />16
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="GLnad-btns">
                            <div className="GLnad-btns-1">
                              <span>Actively Searching</span>
                              <span>
                                <Star /> Top Rated
                              </span>
                            </div>
                            <div className="GLnad-btns-2">
                              <button onClick={() => handleFavoriteToggle(artisan.user.unique_id)}>
                                <Favorite
                                  color={favoriteArtisans.has(artisan.unique) ? 'error' : 'inherit'}
                                />
                              </button>
                              <Link
                                to={`/artisan-profile?service_details=${encodeURIComponent(
                                  artisan.service_details.name
                                )}&artisan_location=${encodeURIComponent(
                                  artisan.location
                                )}&artisan_phone=${encodeURIComponent(
                                  artisan.user.phone
                                )}&artisan_unique_id=${encodeURIComponent(
                                  artisan.user.unique_id
                                )}&artisan_name=${encodeURIComponent(
                                  `${artisan.user.first_name} ${artisan.user.last_name}`
                                )}`}
                              >
                                View Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-artisans">
                  <p>You have not added any favorite artisan yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedTrades;