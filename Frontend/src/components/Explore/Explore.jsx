import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./explore.css";

function Explore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestStatus, setRequestStatus] = useState({}); // Track each NGO's join status
  const userId = localStorage.getItem("user_id");

  const navigate = useNavigate();

  

  useEffect(() => {
    // Fetch all NGOs
    axios
      .get(`http://localhost:3000/ngo/get-all-ngo${userId}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NGOs data", error);
        setError("Error fetching data");
        setLoading(false);
      });

    // Fetch join requests for this user
    axios
      .get(`http://localhost:3000/ngo/get-users-requests/${userId}`)
      .then((response) => {
        const statusMap = {};
        response.data.forEach((request) => {
          if (request.status === "Pending") {
            statusMap[request.ngoId] = "Pending"; // Status is "Pending" if request is not yet accepted
          }
        });
        setRequestStatus(statusMap);
      })
      .catch((error) => console.error("Failed to fetch join requests", error));
  }, []);

  const handleJoinToggle = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/ngo/join", {
        userId,
        ngoId: id,
      });

      if (response.data.request.status === "Withdrawn") {
        setRequestStatus((prevStatus) => {
          const newStatus = { ...prevStatus };
          delete newStatus[id];
          return newStatus;
        });
      } else if (response.data.request.status === "Pending") {
        setRequestStatus((prevStatus) => ({ ...prevStatus, [id]: "Pending" })); // Set status to "Pending" when joined
      }

      alert(response.data.message);
    } catch (error) {
      console.error("Failed to process join request", error);
      alert("Failed to process join request");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSearchTerm(category === "All" ? "" : category);
  };

  const filteredData = data.filter((item) =>
    item.ngoName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-main">
      <div className="explore-top">
        <input
          type="text"
          className="explore-search"
          placeholder="Search NGOs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="explore-buttons">
          {[
            "All",
            "Water",
            "Education",
            "Land",
            "Child and Women",
            "Animals",
            "Forest",
          ].map((category) => (
            <button
              key={category}
              className={`explore-btn ${
                searchTerm === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="explore-content">
        <div className="explore-card-grid">
          {filteredData.map((item) => (
            <div key={item._id} className="explore-card">
              <h3 className="card-title">{item.ngoName}</h3>
              <p className="card-detail">
                <strong>Type:</strong> {item.typeOfNGO}
              </p>
              <p className="card-detail">
                <strong>Founded:</strong>{" "}
                {new Date(item.yearOfEstablishment).toLocaleDateString()}
              </p>
              <p className="card-detail">
                <strong>Location:</strong> {item.city}, {item.state},{" "}
                {item.country}
              </p>
              <p className="card-detail">
                <strong>Contact:</strong> {item.contactNumber}
              </p>
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="ngo-website"
              >
                Visit Website
              </a>
              <button
                className={`join-btn ${
                  requestStatus[item._id] === "Pending" ? "withdraw" : "join"
                }`}
                onClick={() => handleJoinToggle(item._id)}
              >
                {requestStatus[item._id] === "Pending"
                  ? "Withdraw"
                  : "Join Request"}
              </button>
              <button
            className={`donate-now-button `}
            onClick={() => {
              navigate("/payment",{ state: { ngoId: item._id } });
            }}
          >
            Donate Now
          </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
