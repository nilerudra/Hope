import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Notification.css";

const Notifications = ({ id, toggle }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/notification/get-notifications/${id}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
        setError("Error fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="notifications-container" ref={dropdownRef}>
      <h2 className="notification-header">Notifications</h2>
      <br />
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p>Error fetching notifications: {error}</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`notification-item ${
                notification.isRead ? "read" : "unread"
              }`}
            >
              <div className="notification-details">
                <span>{notification.message}</span>
                <span>{formatDate(notification.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
