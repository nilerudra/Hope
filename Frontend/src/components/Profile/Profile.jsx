import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Avatar from "@mui/material/Avatar";

function Profile() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://hope-v129.onrender.com/profile")
      .then((response) => {
        setData(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        // setError('Error fetching data');
        // setLoading(false);
      });
  }, []);

  const followers = 268;
  const projects = [
    { name: "Project A", date: "2024-01-15" },
    { name: "Project B", date: "2024-02-20" },
    { name: "Project C", date: "2024-03-30" },
  ];

  const teamMembers = [
    {
      name: "Shreyas Nivas",
      position: "CEO",
      image:
        "https://media.licdn.com/dms/image/D5603AQHcV2GEZsaVTQ/profile-displayphoto-shrink_200_200/0/1683102770630?e=2147483647&v=beta&t=hwkYy9DsazP87Dam4ZO4G4MVxVXoXX4U2yEuk8CYW4k",
    },
    {
      name: "Riccardo Grinover",
      position: "CTO",
      image:
        "https://media.licdn.com/dms/image/D5603AQHcV2GEZsaVTQ/profile-displayphoto-shrink_200_200/0/1683102770630?e=2147483647&v=beta&t=hwkYy9DsazP87Dam4ZO4G4MVxVXoXX4U2yEuk8CYW4k",
    },
    {
      name: "Keni Mardira",
      position: "Lead Engineer",
      image:
        "https://media.licdn.com/dms/image/D5603AQHcV2GEZsaVTQ/profile-displayphoto-shrink_200_200/0/1683102770630?e=2147483647&v=beta&t=hwkYy9DsazP87Dam4ZO4G4MVxVXoXX4U2yEuk8CYW4k",
    },
    {
      name: "Keni Mardira",
      position: "Lead Engineer",
      image:
        "https://media.licdn.com/dms/image/D5603AQHcV2GEZsaVTQ/profile-displayphoto-shrink_200_200/0/1683102770630?e=2147483647&v=beta&t=hwkYy9DsazP87Dam4ZO4G4MVxVXoXX4U2yEuk8CYW4k",
    },
    {
      name: "Keni Mardira",
      position: "Lead Engineer",
      image:
        "https://media.licdn.com/dms/image/D5603AQHcV2GEZsaVTQ/profile-displayphoto-shrink_200_200/0/1683102770630?e=2147483647&v=beta&t=hwkYy9DsazP87Dam4ZO4G4MVxVXoXX4U2yEuk8CYW4k",
    },
  ];

  const handleRemove = (name) => {
    alert(`Removing ${name}`);
    // Logic to remove the team member can be added here
  };

  return (
    <div className="profcontainer">
      <div className="sidebar">
        <div className="profile">
          <img
            src="https://media.licdn.com/dms/image/D5603AQHcV2GEZsaVTQ/profile-displayphoto-shrink_200_200/0/1683102770630?e=2147483647&v=beta&t=hwkYy9DsazP87Dam4ZO4G4MVxVXoXX4U2yEuk8CYW4k"
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="organization-name">
          <h2>Organization Name</h2>
        </div>
        <div className="volunteer-actions">
          <button className="btn add">Add Volunteer</button>
          <button className="btn remove">Remove Volunteer</button>
        </div>
      </div>
      <div className="main-content">
        <div className="upper-section">
          <div className="card followers-card">
            <h3>Followers</h3>
            <div className="followers-count">{followers}</div>
            <p>People are following</p>
          </div>
          <div className="card projects-card">
            <h3>Recent Projects</h3>
            <ul className="projects-list">
              {projects.map((project, index) => (
                <li key={index}>
                  <span className="project-name">{project.name}</span>{" "}
                  {"Stack "}
                  <span className="project-date">{project.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lower-section">
          <h2>Our Volunteer</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <Avatar>H</Avatar>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
                <button
                  className="btn remove-member"
                  onClick={() => handleRemove(member.name)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {data.map((item) => (
            <li key={item._id}>
              {item.amount} {item.email} {item.name} <br />
              <br />
              <br />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
