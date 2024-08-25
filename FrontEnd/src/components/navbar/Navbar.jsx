import React, { useEffect, useState, useRef } from "react";  // Added useRef here
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import LoginPopUp from "../LoginPopUp/LoginPopUp";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate(); 

  const userDropdownRef = useRef(null);  // Initialized useRef

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = (userDetails) => {
    setCurrentUser(userDetails);  
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span>ProLancer</span>
          </Link>
        </div>

        <div className="links">
          <span>ProLancer Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Become a Seller</span>
          {!isLoggedIn ? (
            <button className="signinbutton" onClick={() => setShowLogin(true)}>
              Sign in
            </button>
          ) : (
            <div className="user" ref={userDropdownRef} onClick={() => setOpen(!open)}>
              <img src="/img/man.png" alt="" />
              <span>{currentUser?.name}</span>
              {open && (
                <div className="options">
                  <Link className="link" to="/dashboard">
                    Dashboard
                  </Link>
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <span className="link" onClick={handleLogout}>
                    Logout
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}

      {showLogin && <LoginPopUp setShowLogin={setShowLogin} handleLogin={handleLogin} />}
    </div>
  );
};

export default Navbar;
