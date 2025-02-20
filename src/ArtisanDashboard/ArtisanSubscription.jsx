import React from "react";
import "./ArtisanDashboard.css";

export default function ArtisanSubscription() {
    return (
        <div className="Pricing_Sec">
            <div className="large-container">

            <div className="Pricing_top">
                <h2>Subscriptions</h2>
            </div>


            <div className="Table_Sec boook-Table-Sec">

                <table className="Upload_Table">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Date of Subscription</th>
                            <th>Plan</th>
                            <th>Duration</th>
                            <th>Amount</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>12/12/2025</td>
                            <td>Basic Plan</td>
                            <td>3 months</td>
                            <td>NGN3,000</td>
                            <td>NGN 4,000</td>
                            <td>Active</td>
                           
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>12/12/2025</td>
                            <td>Basic Plan</td>
                            <td>3 months</td>
                            <td>NGN3,000</td>
                            <td>NGN 4,000</td>
                            <td>Inactive</td>
                           
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}
