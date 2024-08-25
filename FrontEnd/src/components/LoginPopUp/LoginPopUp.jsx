import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "./LoginPopUp.css";

const LoginPopUp = ({ setShowLogin, handleLogin }) => {
  const [currState, setCurrState] = useState("Log In");
  const [name, setName] = useState("");  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogin(false); // Close the popup if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currState === "Sign Up") {
      const userDetails = { name, email, password };
      handleLogin(userDetails);
    } else {
      const userDetails = { username, password };
      handleLogin(userDetails);
    }
    setShowLogin(false);  
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" ref={popupRef} onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src="./img/crossicon.png" alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder='Your name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}  
              />
              <input
                type="email"
                placeholder='Your email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
          <input
            type="text"
            placeholder={currState === "Sign Up" ? 'Create a username' : 'Username'}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          {currState === "Sign Up" && <input type="checkbox" required />}
          <p>
            {currState === "Sign Up" ? 
              "By continuing, I agree to the terms of use & privacy policy" :
              ""}
          </p>
        </div>
        {currState === "Log In" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Log In")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

LoginPopUp.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginPopUp;
