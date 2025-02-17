import React from "react";
import "./ArtisanDashboard.css";

export default function ArtisanAvailability() {
    return (
        <div className="Pricing_Sec">
            <div className="site-container">

            <div className="Pricing_top">
                <h2>Availability</h2>
            </div>


            <div className="Table_Sec">

            <table className="Upload_Table avilability-table">
                    <tbody>
                        <tr>
                            <td>
                                <span>
                                    <input type="checkbox" />
                                    <p>All Day</p>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <p>From Time</p>
                                    <input type="time" />
                                </span>
                            </td>
                            <td>
                                <span>
                                    <p>To Time</p>
                                    <input type="time" />
                                </span>
                            </td>
                        </tr>

                        {[
                            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                        ].map((day) => (
                            <tr key={day}>
                                <td>
                                    <span>
                                        <input type="checkbox" />
                                        <p>{day}</p>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p>From Time</p>
                                        <input type="time" />
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p>To Time</p>
                                        <input type="time" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        <div className="save-bbbna">
            <button>Save Availability</button>
        </div>
        </div>
        </div>
    );
}
