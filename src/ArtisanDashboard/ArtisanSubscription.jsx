import React, { useEffect, useState } from "react";
import "./ArtisanDashboard.css";

export default function ArtisanSubscription() {
    const [subscriptions, setSubscriptions] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

    useEffect(() => {
        const artisan_id = sessionStorage.getItem("unique_user_id");
        fetch(`${djangoHostname}/api/auth/subscriptions/api/user-multiple-subscriptions/${artisan_id}`)
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
                setSubscriptions(data); // Data is an array of subscription objects
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

    if (!subscriptions || subscriptions.length === 0) {
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
                                <th>End of Subscription</th>
                                <th>Plan</th>
                                <th>Duration</th>
                                <th>Amount</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((subscription, index) => {
                                // Calculate days left before expiration for each subscription
                                const endDate = new Date(subscription.end_date);
                                const today = new Date();
                                const timeDiff = endDate - today;
                                const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

                                return (
                                    <tr key={subscription.id}>
                                        <td>{index + 1}</td>
                                        <td>{subscription.start_date}</td>
                                        <td className={subscription.is_active && daysLeft < 7 ? "blinking" : ""}>
                                            {subscription.end_date}
                                        </td>
                                        <td>{subscription.subscriptionPlan_name}</td>
                                        <td>{subscription.subscribed_duration} month(s)</td>
                                        <td>NGN {subscription.subscribed_amount}</td>
                                        <td>NGN {subscription.subscribed_amount}</td>
                                        <td>
                                            {subscription.is_active  ? "Active" : "Inactive"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}