import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ArtisanDashboard.css";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const artisan_id = sessionStorage.getItem("unique_user_id");
                if (!artisan_id) {
                    throw new Error("No artisan ID found in session storage.");
                }

                const response = await axios.get(
                    `${djangoHostname}/api/auth/quotes/quote_request/artisan-bookings/?artisan_id=${artisan_id}`
                );

                setBookings(response.data);
                // console.log("response.data");
                // console.log(response.data[0]);
                // console.log("response.data");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>Error: {error}</p>;

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
                                <th>Artisan's Name</th>
                                <th>Phone Number</th>
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
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="12">No bookings available</td>
                                </tr>
                            ) : (
                                bookings.map((booking, index) => {
                                    const quote = booking.quote;
                                    return (
                                        <tr key={booking.unique_id}>
                                            <td>{index + 1}</td>
                                            <td>{quote.artisan.first_name} {quote.artisan.last_name}</td>
                                            <td>{quote.artisan.phone}</td>
                                            <td>{quote.job_request.location}</td>
                                            <td>{quote.job_request.title}</td>
                                            <td>{parseFloat(quote.bid_amount).toLocaleString()}</td>
                                            <td>{parseFloat(quote.freelancer_service_fee).toLocaleString()}</td>
                                            <td>{(parseFloat(quote.bid_amount) - parseFloat(quote.freelancer_service_fee)).toLocaleString()}</td>
                                            <td>{quote.job_duration}</td>
                                            <td>{new Date(quote.created_at).toLocaleDateString()}</td>
                                            <td className={booking.status === "completed" ? "completed-td" : "active-td"}>
                                                {booking.status}
                                            </td>
                                            <td>
                                                {/* <Link to={`/artisan-dashboard/view-job-description/${quote.job_request.unique_id}`} className="gagf-dessdioa-btn">
                                                    Job Description
                                                </Link> */}

                                                <Link 
                                                    to={{
                                                    pathname: "/artisan-dashboard/job-description1" ,
                                                    }} 
                                                    state={{ quote }}
                                                    className="gagf-dessdioa-btn"
                                                >
                                                    Job Description
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
