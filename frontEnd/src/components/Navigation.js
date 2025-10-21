import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navigation.css";

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlePropertiesClick = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("properties");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    setDropdownOpen(false);
  };

  // Simple logo click handler
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Mobile row: logo left, menu right */}
        <div className="nav-mobile-row">
          <span className="nav-logo" onClick={handleLogoClick}>
            🏠 BookingApp
          </span>
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className="nav-dropdown-toggle mobile-menu-toggle"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              type="button"
            >
              <span className="menu-icon" aria-label="Menu">
                ☰
              </span>
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <button
                  className="nav-dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/");
                    setTimeout(() => {
                      const heroElement = document.getElementById("hero");
                      if (heroElement) {
                        heroElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 200);
                  }}
                >
                  🏠 Home
                </button>
                <button
                  className="nav-dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/");
                    setTimeout(() => {
                      const heroElement = document.getElementById("hero");
                      if (heroElement) {
                        heroElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                      setTimeout(() => {
                        const searchInput =
                          document.getElementById("search-input");
                        if (searchInput) searchInput.focus();
                      }, 100);
                    }, 200);
                  }}
                >
                  🔍 Search
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/stays");
                    setDropdownOpen(false);
                  }}
                >
                  Stays
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/flights");
                    setDropdownOpen(false);
                  }}
                >
                  Flights
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/flight-stay");
                    setDropdownOpen(false);
                  }}
                >
                  Flight + Stay
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/car-rental");
                    setDropdownOpen(false);
                  }}
                >
                  Car Rental
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/attractions");
                    setDropdownOpen(false);
                  }}
                >
                  Attractions
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/taxis");
                    setDropdownOpen(false);
                  }}
                >
                  Taxis
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/list-property");
                    setDropdownOpen(false);
                  }}
                >
                  List Your Property
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/help");
                    setDropdownOpen(false);
                  }}
                >
                  Help
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={handlePropertiesClick}
                >
                  Properties
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    });
                  }}
                >
                  About Us
                </button>
                <a
                  className="nav-dropdown-item"
                  href="mailto:support@bookingapp.com"
                  onClick={() => setDropdownOpen(false)}
                >
                  Contact
                </a>
                {isAuthenticated && (
                  <button
                    className="nav-dropdown-item"
                    type="button"
                    onClick={() => {
                      navigate("/dashboard");
                      setDropdownOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                )}
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="nav-dropdown-item logout"
                    type="button"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="nav-dropdown-item login"
                    type="button"
                    onClick={() => {
                      navigate("/login");
                      setDropdownOpen(false);
                    }}
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Desktop links */}
        <div className="nav-links">
          <span
            className="nav-logo"
            onClick={handleLogoClick}
            style={{ cursor: "pointer", marginRight: "1.5rem" }}
          >
            🏠 BookingApp
          </span>
          <button
            className="nav-link-btn"
            type="button"
            onClick={() => navigate("/stays")}
          >
            Stays
          </button>
          <button
            className="nav-link-btn"
            type="button"
            onClick={() => navigate("/flights")}
          >
            Flights
          </button>
          <button
            className="nav-link-btn"
            type="button"
            onClick={() => navigate("/flight-stay")}
          >
            Flight + Stay
          </button>
          <button
            className="nav-link-btn"
            type="button"
            onClick={() => navigate("/car-rental")}
          >
            Car Rental
          </button>
          <button
            className="nav-link-btn"
            type="button"
            onClick={() => navigate("/attractions")}
          >
            Attractions
          </button>
          <button
            className="nav-link-btn"
            type="button"
            onClick={() => navigate("/taxis")}
          >
            Taxis
          </button>
          <div
            className="nav-dropdown"
            style={{ position: "relative", marginLeft: "auto" }}
          >
            <button
              className="nav-dropdown-toggle"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              type="button"
            >
              Menu ▾
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpen(false);
                    navigate("/");
                    setTimeout(() => {
                      const heroElement = document.getElementById("hero");
                      if (heroElement) {
                        heroElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 100);
                  }}
                >
                  🏠 Home
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpen(false);
                    navigate("/");
                    setTimeout(() => {
                      const heroElement = document.getElementById("hero");
                      if (heroElement) {
                        heroElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                      setTimeout(() => {
                        const searchInput =
                          document.getElementById("search-input");
                        if (searchInput) searchInput.focus();
                      }, 100);
                    }, 200);
                  }}
                >
                  🔍 Search
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/stays");
                    setDropdownOpen(false);
                  }}
                >
                  Stays
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/flights");
                    setDropdownOpen(false);
                  }}
                >
                  Flights
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/flight-stay");
                    setDropdownOpen(false);
                  }}
                >
                  Flight + Stay
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/car-rental");
                    setDropdownOpen(false);
                  }}
                >
                  Car Rental
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/attractions");
                    setDropdownOpen(false);
                  }}
                >
                  Attractions
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/taxis");
                    setDropdownOpen(false);
                  }}
                >
                  Taxis
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/list-property");
                    setDropdownOpen(false);
                  }}
                >
                  List Your Property
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    navigate("/help");
                    setDropdownOpen(false);
                  }}
                >
                  Help
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    handlePropertiesClick();
                    setDropdownOpen(false);
                  }}
                >
                  Properties
                </button>
                <button
                  className="nav-dropdown-item"
                  type="button"
                  onClick={() => {
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    });
                    setDropdownOpen(false);
                  }}
                >
                  About Us
                </button>
                <a
                  className="nav-dropdown-item"
                  href="mailto:support@bookingapp.com"
                  onClick={() => setDropdownOpen(false)}
                >
                  Contact
                </a>
                {isAuthenticated && (
                  <span
                    className="nav-user"
                    style={{ padding: "8px 12px", display: "block" }}
                  >
                    👤 {user?.name || "User"}
                  </span>
                )}
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="nav-dropdown-item logout"
                    type="button"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="nav-dropdown-item login"
                    type="button"
                    onClick={() => {
                      navigate("/login");
                      setDropdownOpen(false);
                    }}
                  >
                    Login
                  </button>
                )}
                {isAuthenticated && (
                  <button
                    className="nav-dropdown-item"
                    type="button"
                    onClick={() => {
                      navigate("/dashboard");
                      setDropdownOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
