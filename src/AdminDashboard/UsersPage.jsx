import React from "react";

import RegisteredUsers from './RegisteredUsers';


const UsersPage = () => {
  return (
    <div className="Gen_Admin_BBD">
            <div className="top-sec-main Gen_Admin_Header">
              <h3>Registered Users</h3>
            </div>

        <RegisteredUsers />
    </div>
  );
};

export default UsersPage;
