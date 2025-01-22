import React from "react";

import RegisteredCustomers from './RegisteredCustomers';


const CustomersPage = () => {
  return (
    <div className="Gen_Admin_BBD">
            <div className="top-sec-main Gen_Admin_Header">
              <h3>Registered Customers</h3>
            </div>

        <RegisteredCustomers />
    </div>
  );
};

export default CustomersPage;
