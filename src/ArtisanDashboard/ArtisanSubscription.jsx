import React, { useEffect, useState } from "react";
import "./ArtisanDashboard.css";

export default function ArtisanSubscription() {
    const [subscriptions, setSubscriptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

    useEffect(() => {
        const artisan_id = sessionStorage.getItem("unique_user_id");
        fetch(`${djangoHostname}/api/auth/subscriptions/api/user-subscription/${artisan_id}`)
            .then(async (response) => {
                if (!response.ok) {
                    const errorMessage = await response.json();
                    if (response.status === 404) {
                        throw new Error("You are not subscribed to any plan yet.");
                    }
                    throw new Error(errorMessage.detail || "An unexpected error occurred. Please try again later.");
                }
                return response.json();
            })
            .then((data) => {
                setSubscriptions(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading subscriptions...</p>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                {error.includes("not subscribed") && (
                    <a href="/subscription" className="subscribe-link">Go to the Subscription Page</a>
                )}
            </div>
        );
    }

    if (!subscriptions) {
        return (
            <div className="no-subscriptions">
                <p>You have not subscribed to any of our plans.</p>
                <a href="/subscribe" className="subscribe-link">Go to the Subscription Page</a>
            </div>
        );
    }

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
                                <td>{subscriptions.start_date}</td>
                                <td>{subscriptions.subscription_plan.name}</td>
                                <td>{subscriptions.subscribed_duration} month(s)</td>
                                <td>NGN {subscriptions.subscribed_amount}</td>
                                <td>NGN {subscriptions.subscription_plan.price}</td>
                                <td>{subscriptions.is_active ? "Active" : "Inactive"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
