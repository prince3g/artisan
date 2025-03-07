import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ArtisanDashboard.css";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

export default function BookingList() {

    const [flash, setFlash] = useState(null);    
    const showMessage = (message, type) => {
      setFlash({ message, type });
    };
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

    // const handleCompleteJob = async (uniqueId, currentStatus) => {
    //     try {
    //         const newStatus = !currentStatus; // Toggle the artisan_done value

    //         const response = await axios.patch(
    //             `${djangoHostname}/api/jobs/auth/api/jobs/edit-by-unique-id/?unique_id=${uniqueId}`,
    //             { artisan_done: newStatus },
    //             { headers: { "Content-Type": "application/json" } }
    //         );

    //         // Update the state after successful update
    //         setBookings((prevBookings) =>
    //             prevBookings.map((booking) =>
    //                 booking.quote.job_request.unique_id === uniqueId
    //                     ? { ...booking, artisan_done: newStatus }
    //                     : booking
    //             )
    //         );

    //         showMessage("Job status updated successfully!", "success");
    //     } catch (err) {
    //         console.error("Error updating job status:", err);
    //         showMessage("Failed to update job status.", "failure");
    //     }
    // };

    const [loadingJob, setLoadingJob] = useState(null);

const handleCompleteJob = async (uniqueId, currentStatus) => {
    setLoadingJob(uniqueId); // Set loading state for the current job

    try {
        const newStatus = !currentStatus; // Toggle the artisan_done value

        const artisan_unique_id = sessionStorage.getItem('unique_user_id');

       // console.log("artisan_unique_id", artisan_unique_id);

        const response = await axios.patch(
            `${djangoHostname}/api/jobs/auth/api/jobs/edit-by-unique-id/?unique_id=${uniqueId}`,
            { artisan_done: newStatus, artisan: artisan_unique_id },
            // { artisan_done: newStatus },
            { headers: { "Content-Type": "application/json" } }
        );

        // Update the state after successful update
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.quote.job_request.unique_id === uniqueId
                    ? { ...booking, quote: { ...booking.quote, job_request: { ...booking.quote.job_request, artisan_done: newStatus } } }
                    : booking
            )
        );

        showMessage("Job status updated successfully!", "success");
    } catch (err) {
        console.error("Error updating job status:", err);
        showMessage("Failed to update job status.", "failure");
    } finally {
        setLoadingJob(null); // Reset loading state
    }
};

    useEffect(() => {
        // const fetchBookings = async () => {
        //     try {
        //         const artisan_id = sessionStorage.getItem("unique_user_id");
        //         if (!artisan_id) {
        //             throw new Error("No artisan ID found in session storage.");
        //         }

        //         const response = await axios.get(
        //             `${djangoHostname}/api/auth/quotes/quote_request/artisan-bookings/?artisan_id=${artisan_id}`
        //         );

        //         setBookings(response.data);
                
        //         console.log("response.data");
        //         console.log(response.data[0]);
        //         console.log("response.data");
        //     } catch (err) {
        //         setError(err.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
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

                // console.log(response.data)
            } catch (err) {
                if (err.response) {
                    // Extract meaningful error message from API response
                    setError(err.response.data.error || "An error occurred while fetching bookings.");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchBookings();
    }, []);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="Pricing_Sec">
            <div className="large-container">
                <div className="Pricing_top">
                    <h2>Booking List</h2>
                </div>
                {flash && (
                <FlashMessage
                    message={flash.message}
                    type={flash.type}
                    onClose={() => setFlash(null)}
                />
                )}

                <div className="Table_Sec boook-Table-Sec">
                    <table className="Upload_Table oooa-tb">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Customer</th>
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
                                            <td>{booking.customer.first_name} {booking.customer.last_name}</td>
                                            <td>{booking.customer.phone}</td>
                                            <td>{quote.job_request.location}</td>
                                            <td>{quote.job_request.title}</td>
                                            <td>{parseFloat(quote.bid_amount).toLocaleString()}</td>
                                            <td>{parseFloat(quote.freelancer_service_fee).toLocaleString()}</td>
                                            <td>{(parseFloat(quote.bid_amount) - parseFloat(quote.freelancer_service_fee)).toLocaleString()}</td>
                                            <td>{quote.job_duration}</td>
                                            <td>{new Date(quote.created_at).toLocaleDateString()}</td>
                                            <td className={quote.job_request.artisan_done ? "completed-td" : "active-td"}>
                                                {quote.job_request.customer_done ? "Done" : "Pending"}
                                            </td>
                                            <td>

                                                <div className="OOO-PP-Btnss">

                                                <Link 
                                                    to={{
                                                    pathname: "/artisan-dashboard/job-description1" ,
                                                    }} 
                                                    state={{ quote }}
                                                    className="gagf-dessdioa-btn"
                                                >
                                                 Description
                                                </Link>
                                                <button 
                                                    className="AA_Job_CMPT_BTN"
                                                    onClick={() => handleCompleteJob(quote.job_request.unique_id, quote.job_request.artisan_done)}
                                                    disabled={loadingJob === quote.job_request.unique_id || quote.job_request.artisan_done} // Disable if loading or already completed
                                                >
                                                    {loadingJob === quote.job_request.unique_id ? "Marking..." : (quote.job_request.artisan_done ? "Completed" : "Mark Completed")}
                                                </button>

                                                </div>

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
