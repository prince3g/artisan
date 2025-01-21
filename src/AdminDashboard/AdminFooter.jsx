import React from "react";


const AdminFooter = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <div className="Admin_Footer">
        <p className="footer-copyright">
          © {currentYear} SimserviceHub - All rights reserved
        </p>
    </div>
  );
};

export default AdminFooter;
