import React, { useEffect, useState } from "react"; 
import PlacHolderImg1 from './Img/hu/hu1.jpg';

const RegisteredUsers = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Function to fetch users data from a provided URL
  const fetchUsers = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }
      const data = await response.json();

      // Robust filtering: trim and compare user_type in lower case
      const customers = data.results.filter((user) => {
        return (
          typeof user.user_type === "string" &&
          user.user_type.trim().toLowerCase() === "customer"
        );
      });
      
      setUsers(customers);
      setNextPage(data.next);
      setPrevPage(data.previous);
      // setCount(data.count);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch initial user data
  useEffect(() => {
    fetchUsers(`${djangoHostname}/api/accounts/auth/api/users/`);
  }, [djangoHostname]);

  // Handlers for pagination buttons
  const handleNextPage = () => {
    if (nextPage) {
      fetchUsers(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchUsers(prevPage);
    }
  };

  // Handle deletion of a user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(
        `${djangoHostname}/api/profiles/auth/api/artisan-profile/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the user.");
      }

      // Update the users list after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="tran-card">
      <div className="tran-card-tableSec">
        <table className="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Registration Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="slt-td">
                  <div className="td-grid">
                    <div className="td-grid-img">
                      <img src={user.user_image} alt="Customer" />
                    </div>
                    <div className="td-grid-txt">
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span>{user.address}</span>
                </td>
                <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                <td>
                  <div className="action-btn">
                    <span
                      className="Remove-Btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      {deletingId === user.id ? "Deleting..." : "Remove"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="error">Error: {error}</p>}
      </div>
      
      {/* Pagination Buttons */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={!prevPage}>
          Previous
        </button>
        <span> Customers</span>
        <button onClick={handleNextPage} disabled={!nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisteredUsers;
