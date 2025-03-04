import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";

const AdminNotification = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [notifications, setNotifications] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [count, setCount] = useState(0); // Total number of notifications
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(15); // Number of notifications per page

  const fetchNotifications = async (url) => {
    try {
      const response = await axios.get(url);
      setNotifications(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setCount(response.data.count); // Set the total count of notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(`${djangoHostname}/api/auth/notification/notification_request/`);
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchNotifications(nextPage);
      setCurrentPage((prev) => prev + 1); // Increment current page
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchNotifications(previousPage);
      setCurrentPage((prev) => prev - 1); // Decrement current page
    }
  };

  // Calculate the range of notifications being displayed
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, count);

  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec-main Gen_Admin_Header">
        <h3>Notifications</h3>
      </div>

      <div className="tran-card">
        <div className="tran-card-tableSec">
          <div className="sec-table">
            {notifications.map((notification, index) => (
              <div className="rev-card" key={index}>
                <div className="card-dltrr">
                  <div className="card-dltrr-flexed">
                    <div className="mmt">
                      <NotificationsIcon style={{ color: "#555" }} />
                    </div>
                    <div className="mlt">
                      <p>{notification.notification_message}</p>
                      <span>{new Date(notification.created_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={!previousPage}>
          Previous
        </button>
        <span>
          Showing {startIndex} to {endIndex} of {count} notifications
        </span>
        <button onClick={handleNextPage} disabled={!nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminNotification;