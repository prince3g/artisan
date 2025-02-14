import React, { useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import SiteLogo from "./Img/site-logo.png";
import DropIcon1 from "./Img/DropIcon/1.png";
import DropIcon2 from "./Img/DropIcon/2.png";
import DropIcon3 from "./Img/DropIcon/3.png";


import ProfilePlaceholder from './Img/user-placeholder.png';



import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


import BookIcon from "@mui/icons-material/Book"; 
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions"; 
import EventAvailableIcon from "@mui/icons-material/EventAvailable"; 
import StarRateIcon from "@mui/icons-material/StarRate"; 
import PaymentIcon from "@mui/icons-material/Payment"; 




function SiteNav() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setILoggedIn] = useState("");
  const [user_first_name, setUserFirstName] = useState("");
  const [user_last_name, setUserLastName] = useState("");
  const [user_date_joined, setUserUserDateJoined] = useState("");


  useEffect(() => {
    setILoggedIn(sessionStorage.getItem("access_token"));
    setUserType(sessionStorage.getItem("user_type"));
    setUserFirstName(sessionStorage.getItem("user_first_name"));
    setUserLastName(sessionStorage.getItem("user_last_name"));
    setUserUserDateJoined(sessionStorage.getItem("user_date_joined"));

}, [userType, isLoggedIn]);

// console.log("isLoggedIn")
// console.log(userType)
// console.log("isLoggedIn")

  const toggleNav = (e) => {
    e.stopPropagation();
    setIsNavActive((prev) => !prev);
    setIsDropdownVisible(false);
  };

  const closeNav = () => {
    setIsNavActive(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleOutsideClick = (e) => {
    const navContent = document.querySelector(".MainNav-Content");
    const dropdown = document.querySelector(".All-DropDown");
    if (
      navContent &&
      !navContent.contains(e.target) &&
      dropdown &&
      !dropdown.contains(e.target)
    ) {
      closeNav();
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isNavActive || isDropdownVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isNavActive, isDropdownVisible]);

  const handleNavLinkClick = () => {
    closeNav();
    closeDropdown();
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all sessionStorage storage
    setILoggedIn(""); // Update the login state
    setUserType(""); // Clear user type
    window.location.href = "/";
  };

  const handleVisitProfile = () => {
  if(userType === "customer"){
    window.location.href = "/user-dashboard";
    }
    else if(userType === "artisan"){
      window.location.href = "/artisan-dashboard";
    }
    else if(userType === "super_admin"){
      window.location.href = "/admin";
    }
  }

  // Determine links based on user_type
  const getAccountLink = () => {
    if (userType === "customer") return "/user-dashboard";
    if (userType === "artisan") return "/artisan-dashboard";
    if (userType === "super_admin") return "/admin";
    return "#";
  };




  // State and ref for Users dropdown
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  // State and ref for Artisan dropdown
  const [isArtisanDropdownOpen, setIsArtisanDropdownOpen] = useState(false);
  const artisanDropdownRef = useRef(null);

  // Toggle Users Profile Dropdown
  const ProfileMenuForUsers = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsArtisanDropdownOpen(false); // Close Artisan menu if open
  };

  // Toggle Artisan Profile Dropdown
  const ArtisanProfileMenu = () => {
    setIsArtisanDropdownOpen(!isArtisanDropdownOpen);
    setIsUserDropdownOpen(false); // Close Users menu if open
  };

  // Close Users dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close Artisan dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        artisanDropdownRef.current &&
        !artisanDropdownRef.current.contains(event.target)
      ) {
        setIsArtisanDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking any link or button
  const CloseProfileMenuForUsers = () => {
    setIsUserDropdownOpen(false);
  };

  const CloseArtisanProfileMenu = () => {
    setIsArtisanDropdownOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle case where date is missing
  
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <nav className={`SiteNav ${isNavActive ? "active-NavMbl" : ""}`}>
      <div className="large-container">
        <div className="Nav-Content">
          <Link to="/" className="Nav-logo this-mobile" onClick={handleNavLinkClick}>
            <img src={SiteLogo} alt="Site Logo" />
          </Link>
          <div className="MainNav-Content">
            <Link to="/" className="Nav-logo" onClick={handleNavLinkClick}>
              <img src={SiteLogo} alt="Site Logo" />
            </Link>
            <ul>
              <li><Link to="/post-job" onClick={handleNavLinkClick}>Post a Job</Link></li>
              <li>
                <Link
                  to="#"
                  onClick={(e) => {
                    toggleDropdown(e);
                  }}
                  className={isDropdownVisible ? "active" : ""}
                >
                  Customer
                </Link>
              </li>
              <li><Link to="/about" onClick={handleNavLinkClick}>About Us</Link></li>
            </ul>


            {/* <ul className="Ul-Last">
              {isLoggedIn && userType === "artisan" ? (
                <li>
                  <Link to={getAccountLink()} onClick={handleNavLinkClick}>Account</Link>
                </li>
              ) : (
                <li>
                  <Link to="/artisan-overview" className="trade-login" onClick={handleNavLinkClick}>Artisan Sign-Up</Link>
                </li>
              )}

              {isLoggedIn && (userType === "customer" || userType === "super_admin") ? (
                <li>
                  <Link to={getAccountLink()} onClick={handleNavLinkClick}>Account</Link>
                </li>
              ) : (
                <li>
                  <Link to="/customer-signup" className="home-login" onClick={handleNavLinkClick}>
                    Customer Signup
                  </Link>
                </li>
              )}

              {isLoggedIn ? (
                <li>
                  <Link
                    to="/"
                    className="trade-login"
                    onClick={() => {
                      handleLogout();
                      handleNavLinkClick();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="trade-login" onClick={handleNavLinkClick}>
                    Login
                  </Link>
                </li>
              )}

            </ul> */}


            <ul className="Ul-Last">

            {isLoggedIn && userType === "artisan" ? (
                <li>
                  <Link to={getAccountLink()} onClick={handleNavLinkClick}>Account</Link>
                </li>
              ) : (
                <li>
                  <Link to="/artisan-overview" className="trade-login" onClick={handleNavLinkClick}>Artisan Sign-Up</Link>
                </li>
              )}

              {isLoggedIn && (userType === "customer" || userType === "super_admin") ? (
                <li>
                  <Link to={getAccountLink()} onClick={handleNavLinkClick} className="home-login">Account</Link>
                </li>
              ) : (
                <li>
                  <Link to="/customer-signup" className="home-login" onClick={handleNavLinkClick}>
                    Customer Sign-Up
                  </Link>
                </li>
              )}

            </ul>
          </div>
           <div className="Mobioll-pos"> 
           
           {/* Main Login Link */}

           {!isLoggedIn? (
          <Link to="/account">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37.5"
              height="30"
              viewBox="0 0 20 16"
              fill="#B1BD3B"
            >
              <path d="M10 0C5.58 0 2 3.58 2 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.4c1.33 0 2.4 1.07 2.4 2.4S11.33 7.2 10 7.2 7.6 6.13 7.6 4.8 8.67 2.4 10 2.4zm0 11.36c-2 0-3.77-1.02-4.8-2.58.02-1.59 3.2-2.46 4.8-2.46 1.59 0 4.78.87 4.8 2.46a5.742 5.742 0 0 1-4.8 2.58z"></path>
            </svg>
          </Link>
        ) : null}

         {/* Customer Profile drop down Button  isLoggedIn && (userType === "customer"*/}               
          {/* <Link to="/account">
          <svg xmlns="http://www.w3.org/2000/svg" width="37.5" height="30" viewBox="0 0 20 16" fill="#B1BD3B"><path d="M10 0C5.58 0 2 3.58 2 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.4c1.33 0 2.4 1.07 2.4 2.4S11.33 7.2 10 7.2 7.6 6.13 7.6 4.8 8.67 2.4 10 2.4zm0 11.36c-2 0-3.77-1.02-4.8-2.58.02-1.59 3.2-2.46 4.8-2.46 1.59 0 4.78.87 4.8 2.46a5.742 5.742 0 0 1-4.8 2.58z"></path></svg>
          </Link> */}



        {/* Customer Profile drop down Button */}
        {isLoggedIn && (userType === "customer") ? (

        <button onClick={ProfileMenuForUsers}>
        <svg xmlns="http://www.w3.org/2000/svg" width="37.5" height="30" viewBox="0 0 20 16" fill="#B1BD3B"><path d="M10 0C5.58 0 2 3.58 2 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.4c1.33 0 2.4 1.07 2.4 2.4S11.33 7.2 10 7.2 7.6 6.13 7.6 4.8 8.67 2.4 10 2.4zm0 11.36c-2 0-3.77-1.02-4.8-2.58.02-1.59 3.2-2.46 4.8-2.46 1.59 0 4.78.87 4.8 2.46a5.742 5.742 0 0 1-4.8 2.58z"></path></svg>
        </button>
          ) : null}

        {isUserDropdownOpen && (
        <div className="Main-Gen-DropDwn" ref={userDropdownRef}>
          <div className="Genns-Top">
            <div className="Genns-Top-1">
              <img src={ProfilePlaceholder} alt="Profile" />
            </div>
            <div className="Genns-Top-2">
              <div>
                <h3>{user_first_name} {user_last_name}</h3>
                {/* <p>Member Since Jan 22, 2025</p> */}
                <p>Member Since {formatDate(user_date_joined)}</p>
              </div>
            </div>
          </div>

          <ul className="Glandy-Ul">
            <li>
              <Link to="/user-dashboard/" onClick={() => {
                      CloseProfileMenuForUsers();
                      handleVisitProfile();
                    }}>
                <DashboardIcon /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/user-dashboard/edit-profile" onClick={() => {
                      CloseProfileMenuForUsers();
                      handleVisitProfile();
                    }}>
                <SettingsIcon /> Profile Setting
              </Link>
            </li>
            <li>
              <Link to="/saved-trades" onClick={CloseProfileMenuForUsers}>
                <FavoriteIcon /> Saved Trades
              </Link>
            </li>
            <li>
              <button className="logout-btnn" 
              onClick={() => {
                      CloseProfileMenuForUsers();
                      handleLogout();
                    }}>
                <ExitToAppIcon /> Log Out
              </button>
            </li>
            <li>
              <button className="deletAcc-btnn" onClick={CloseProfileMenuForUsers}>
                <DeleteIcon /> Delete Account
              </button>
            </li>
          </ul>
        </div>
      )}




        {/* Artisan Profile drop down Button */}

        {isLoggedIn && (userType === "artisan") ? (
        <button onClick={ArtisanProfileMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="37.5" height="30" viewBox="0 0 20 16" fill="#B1BD3B"><path d="M10 0C5.58 0 2 3.58 2 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.4c1.33 0 2.4 1.07 2.4 2.4S11.33 7.2 10 7.2 7.6 6.13 7.6 4.8 8.67 2.4 10 2.4zm0 11.36c-2 0-3.77-1.02-4.8-2.58.02-1.59 3.2-2.46 4.8-2.46 1.59 0 4.78.87 4.8 2.46a5.742 5.742 0 0 1-4.8 2.58z"></path></svg>
        </button>
          ) : null}


        {isArtisanDropdownOpen && (
        <div className="Main-Gen-DropDwn"  ref={artisanDropdownRef}>
            <div className="Genns-Top">
            <div className="Genns-Top-1">
              <img src={ProfilePlaceholder} alt="Profile" />
            </div>
            <div className="Genns-Top-2">
              <div>
              <h3>{user_first_name} {user_last_name}</h3>
                {/* <p>Member Since Jan 22, 2025</p> */}
                <p>Member Since {formatDate(user_date_joined)}</p>
              </div>
            </div>
          </div>
          <ul className="Glandy-Ul">
            <li>
              <Link to="/artisan-dashboard/" onClick={() => {
                      CloseProfileMenuForUsers();
                      handleVisitProfile();
                    }}>
                <DashboardIcon /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/artisan-dashboard/booking-list" onClick={CloseArtisanProfileMenu}>
                <BookIcon /> Booking List
              </Link>
            </li>
            <li>
              <Link to="/artisan-dashboard/profile-settings" onClick={() => {
                      CloseProfileMenuForUsers();
                      handleVisitProfile();
                    }}>
                <SettingsIcon /> Profile Setting
              </Link>
            </li>
            <li>
              <Link to="/artisan-dashboard/payout-setting" onClick={CloseArtisanProfileMenu}>
                <MonetizationOnIcon /> Payout Setting
              </Link>
            </li>
            <li>
              <Link to="/artisan-dashboard/artisan-subscription" onClick={CloseArtisanProfileMenu}>
                <SubscriptionsIcon /> Subscription
              </Link>
            </li>
            <li>
              <Link to="/artisan-dashboard/availability" onClick={CloseArtisanProfileMenu}>
                <EventAvailableIcon /> Availability
              </Link>
            </li>
            <li>
              <Link to="/artisan-dashboard/reviews" onClick={CloseArtisanProfileMenu}>
                <StarRateIcon /> Reviews
              </Link>
            </li>
            <li>
              <Link to="/artisan-dashboard/payment" onClick={CloseArtisanProfileMenu}>
                <PaymentIcon /> Payment
              </Link>
            </li>
            <li>
              <button className="logout-btnn" onClick={() => {
                      CloseProfileMenuForUsers();
                      handleLogout();
                    }}>
                <ExitToAppIcon /> Log Out
              </button>
            </li>
            <li>
              <button className="deletAcc-btnn" onClick={CloseArtisanProfileMenu}>
                <DeleteIcon /> Delete Account
              </button>
            </li>
          </ul>
        </div>
      )}

                  


          <div className="Nav-Toggler this-mobile" onClick={toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          </div>  
        </div>
      </div>

      <div className={`All-DropDown ${isDropdownVisible ? "show-All-DropDown" : ""}`}>
        <div className="large-container">
          <ul>
            <li>
              <h3>
                <img src={DropIcon1} alt="Icon 1" />
                Review a Trade
              </h3>
              <p>Have you completed a project recently? Let your Artisan know how they did.</p>
              <Link to="/leave-review" onClick={handleNavLinkClick}>Leave a review</Link>
            </li>

            <li>
              <h3>
                <img src={DropIcon3} alt="Icon 3" />
                Saved Trades
              </h3>
              <p>Easily access your saved Artisan and keep track of those you may want to hire in the future.</p>
              <Link to="/saved-trades" onClick={handleNavLinkClick}>View saved trades</Link>
            </li>

            <li>
              <h3>
                <img src={DropIcon2} alt="Icon 2" />
                Advice Centre
              </h3>
              <p>Get Inspired! Check the latest industry expertise and read insider tips from our vetted tradespeople.</p>
              <Link to="/advice-centre" onClick={handleNavLinkClick}>Visit Advice Centre</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SiteNav;
