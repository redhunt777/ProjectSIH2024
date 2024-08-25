import React, { useState } from 'react';
import "./LoginPopUp.css";

const LoginPopUp = ({ setShowLogin, handleLogin }) => {
  const [currState, setCurrState] = useState("Log In");
  const [name, setName] = useState("");  

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = { name, email: "test@example.com" }; 
    handleLogin(userDetails); 
    setShowLogin(false);  
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src="./img/crossicon.png" alt="" />
        </div>
        <div className="login-popup-inputs">
          <input
            type="text"
            placeholder='Your name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}  
          />
          <input type="email" placeholder='Your email' required />
          <input type="password" placeholder='Password' required />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
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

export default LoginPopUp;
