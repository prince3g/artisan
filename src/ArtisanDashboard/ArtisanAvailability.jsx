import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ArtisanDashboard.css";

export default function ArtisanAvailability() {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const unique_user_id = sessionStorage.getItem("unique_user_id");

    const [availability, setAvailability] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch availability data on component mount
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await axios.get(`${djangoHostname}/api/profiles/auth/artisan-profile/?unique_id=${unique_user_id}`);
                if (response.data.availability) {
                    setAvailability(response.data.availability);
                }
            } catch (error) {
                console.error("Error fetching availability", error);
            }
        };

        fetchAvailability();
    }, [djangoHostname, unique_user_id]);

    const handleChange = (day, field, value) => {
        setAvailability((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value,
            },
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await axios.patch(`${djangoHostname}/api/profiles/auth/artisan-profile/?unique_id=${unique_user_id}`, { availability });

            alert("Availability updated successfully");
        } catch (error) {
            console.error("Error updating availability", error);
            alert("Failed to update availability");
        } finally {
            setLoading(false);
        }
    };

    // Check if "All Day" is selected
    const isAllDaySelected = availability["All Day"]?.enabled || false;

    return (
        <div className="Pricing_Sec">
            <div className="site-container">
                <div className="Pricing_top">
                    <h2>Availability</h2>
                </div>

                <div className="Table_Sec">
                    <table className="Upload_Table availability-table">
                        <tbody>
                            <tr>
                                <td>
                                    <span>
                                        <input 
                                            type="checkbox"
                                            onChange={(e) => handleChange("All Day", "enabled", e.target.checked)}
                                            checked={isAllDaySelected}
                                        />
                                        <p>All Day</p>
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p>From Time</p>
                                        <input 
                                            type="time"
                                            onChange={(e) => handleChange("All Day", "from", e.target.value)}
                                            value={availability["All Day"]?.from || ""}
                                        />
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <p>To Time</p>
                                        <input 
                                            type="time"
                                            onChange={(e) => handleChange("All Day", "to", e.target.value)}
                                            value={availability["All Day"]?.to || ""}
                                        />
                                    </span>
                                </td>
                            </tr>

                            {/* Hide individual day inputs when "All Day" is selected */}
                            {!isAllDaySelected && 
                                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                    <tr key={day}>
                                        <td>
                                            <span>
                                                <input 
                                                    type="checkbox"
                                                    onChange={(e) => handleChange(day, "enabled", e.target.checked)}
                                                    checked={availability[day]?.enabled || false}
                                                />
                                                <p>{day}</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                <p>From Time</p>
                                                <input 
                                                    type="time"
                                                    onChange={(e) => handleChange(day, "from", e.target.value)}
                                                    value={availability[day]?.from || ""}
                                                />
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                <p>To Time</p>
                                                <input 
                                                    type="time"
                                                    onChange={(e) => handleChange(day, "to", e.target.value)}
                                                    value={availability[day]?.to || ""}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="save-bbbna">
                    <button onClick={handleSave} disabled={loading}>
                        {loading ? "Updating availability..." : "Save Availability"}
                    </button>
                </div>
            </div>
        </div>
    );
}
