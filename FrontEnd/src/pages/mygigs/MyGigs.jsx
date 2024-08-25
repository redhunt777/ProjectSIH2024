import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gigs } from "../../data"; // Adjust the path to where your data.js file is located
import "./MyGigs.scss";

function MyGigs() {
  // Use the imported gigs data
  const [gigsList, setGigsList] = useState(gigs);

  // Function to handle the deletion of a gig
  const handleDelete = (id) => {
    setGigsList(gigsList.filter((gig) => gig.id !== id));
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {gigsList.map((gig) => (
              <tr key={gig.id}>
                <td>
                  <img className="image" src={gig.img} alt={gig.desc} />
                </td>
                <td>{gig.desc}</td>
                <td>${gig.price}</td>
                <td>{gig.star} ★</td>
                <td>{gig.username}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt="Delete"
                    onClick={() => handleDelete(gig.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
