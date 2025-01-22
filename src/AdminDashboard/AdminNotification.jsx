import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminNotification = () => {

  const notifications = [
    {
      message:
        "Daniel Tsaker is quick to deliver and does a great job when it comes to developing brands.",
      time: "10 minutes ago",
    },
    {
      message:
        "Daniel Tsaker is quick to deliver and does a great job when it comes to developing brands.",
      time: "10 minutes ago",
    },
    {
      message:
        "Daniel Tsaker is quick to deliver and does a great job when it comes to developing brands.",
      time: "10 minutes ago",
    },
  ];

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
                  <p>{notification.message}</p>
                  <span>{notification.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
