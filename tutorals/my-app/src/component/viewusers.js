import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/");
      setUsers(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}/`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Error deleting user");
    }
  };

  // Update user role
  const updateUserRole = async (id, newRole) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/users/${id}/`, { role: newRole });
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, role: response.data.role } : user
        )
      );
    } catch (err) {
      alert("Error updating user role");
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="w-full max-w-4xl border-2 border-green-700 bg-lime-400 rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl text-green-700 text-center py-4">Registered Users</h1>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="px-2 py-2 text-left">Username</th>
                <th className="px-2 py-2 text-left">Email</th>
                <th className="px-2 py-2 text-left">Role</th>
                <th className="px-2 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="px-2 py-2">{user.username}</td>
                  <td className="px-2 py-2">{user.email}</td>
                  <td className="px-2 py-2">{user.role}</td>
                  <td className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      className="bg-green-700 text-white px-2 py-1 rounded"
                      onClick={() => {
                        const newRole = prompt(
                          `Enter new role for ${user.username} (Admin, Librarian, User):`,
                          user.role
                        );
                        if (newRole) updateUserRole(user.id, newRole);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-700 text-white px-2 py-1 rounded"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
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

export default UsersList;