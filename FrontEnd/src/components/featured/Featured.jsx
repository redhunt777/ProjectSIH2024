import React from "react";
import "./Featured.scss";
import { Link } from "react-router-dom";

function Featured() {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Try "Web Design"' />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button><Link className="link" to={"/gigs"}>Web Design</Link></button>
            <button><Link className="link" to={"/gigs"}>WordPress</Link></button>
            <button><Link className="link" to={"/gigs"}>Logo Design</Link></button>
            <button><Link className="link" to={"/gigs"}>AI Services</Link></button>
          </div>
        </div>
        <div className="right">
          <img src="/img/z.png" alt="Man" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
