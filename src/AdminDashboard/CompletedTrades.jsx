import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CompletedTrades = () => {
  const tabledatas = [
    {
      vendorName: "Prince Godson",
      email: "prince@example.com",
      phoneNumber: "123-456-7890",
      artisan: "John Doe",
      tradeTitle: "Woodworking",
      date: "12/12/2022",
    },
    {
      vendorName: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: "987-654-3210",
      artisan: "Mary Smith",
      tradeTitle: "Plumbing",
      date: "10/10/2022",
    },
  ];

  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec-main Gen_Admin_Header">
        <h3>Completed Trades</h3>
      </div>

      <div className="tran-card">
        <div className="tran-card-tableSec">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Artisan</th>
                <th>Trade Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tabledatas.map((tabledata, index) => (
                <tr key={index}>
                  <td>
                    <div className="td-grid">

                      <div className="td-grid-txt">
                        <p>{tabledata.vendorName}</p>
                      </div>
                    </div>
                  </td>
                  <td>{tabledata.email}</td>
                  <td>{tabledata.phoneNumber}</td>
                  <td>{tabledata.artisan}</td>
                  <td>{tabledata.tradeTitle}</td>
                  <td>{tabledata.date}</td>
                  <td>
                    <span className="status-icon">
                      <CheckCircleIcon />
                      <span>Completed</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedTrades;
