import React from "react";
import "./ArtisanDashboard.css";

import { Link, useLocation } from "react-router-dom";

export default function BookingList() {
    return (
        <div className="Pricing_Sec">
            <div className="large-container">

            <div className="Pricing_top">
                <h2>Booking List</h2>
            </div>


            <div className="Table_Sec boook-Table-Sec">

                <table className="Upload_Table oooa-tb">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Customer's Name</th>
                            <th>Phone number</th>
                            <th>Location</th>
                            <th>Job Title</th>
                            <th>Bid (NGN)</th>
                            <th>10% Freelancer Service Fee (NGN)</th>
                            <th>Total Amount (NGN)</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Prince Godson</td>
                            <td>09037494084</td>
                            <td>Umuahia, Abia state</td>
                            <td>Electrical Installation</td>
                            <td>300,000</td>
                            <td>30,000</td>
                            <td>270,000</td>
                            <td>6 months</td>
                            <td>2/20/2025</td>
                           <td className="active-td">Pending</td>
                           <td><Link to="/artisan-dashboard/view-job-description" className="gagf-dessdioa-btn">Job Description</Link></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Prince Godson</td>
                            <td>09037494084</td>
                            <td>Umuahia, Abia state</td>
                            <td>Electrical Installation</td>
                            <td>300,000</td>
                            <td>30,000</td>
                            <td>270,000</td>
                            <td>6 months</td>
                            <td>2/20/2025</td>
                           <td className="completed-td">Completed</td>
                           <td><Link to="/artisan-dashboard/view-job-description" className="gagf-dessdioa-btn">Job Description</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}
