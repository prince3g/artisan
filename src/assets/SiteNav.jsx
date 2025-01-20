import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import SiteLogo from './Img/site-logo.png';
import DropIcon1 from './Img/DropIcon/1.png';
import DropIcon2 from './Img/DropIcon/2.png';
import DropIcon3 from './Img/DropIcon/3.png';

function SiteNav() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
      navContent && !navContent.contains(e.target) &&
      dropdown && !dropdown.contains(e.target)
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
              <li><Link to="/artisan-overview" onClick={handleNavLinkClick}>Artisan Sign-Up</Link></li>
            </ul>
            <ul className="Ul-Last">
              <li><Link to="/customer-signup" className="home-login" onClick={handleNavLinkClick}>Customer Signup</Link></li>
              <li><Link to="/login" className="trade-login" onClick={handleNavLinkClick}>Login</Link></li>
            </ul>
          </div>
          <div
            className="Nav-Toggler this-mobile"
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className={`All-DropDown ${isDropdownVisible ? "show-All-DropDown" : ""}`}>
        <div className="large-container">
          <ul>
            <li>
              <h3><img src={DropIcon1} alt="Icon 1" />Review a Trade</h3>
              <p>Have you completed a project recently? Let your Artisan know how they did.</p>
              <Link to="/leave-review" onClick={handleNavLinkClick}>Leave a review</Link>
            </li>

            <li>
              <h3><img src={DropIcon3} alt="Icon 3" />Saved Trades</h3>
              <p>Easily access your saved Artisan and keep track of those you may want to hire in the future.</p>
              <Link to="/saved-trades" onClick={handleNavLinkClick}>View saved trades</Link>
            </li>

            <li>
              <h3><img src={DropIcon2} alt="Icon 2" />Advice Centre</h3>
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
