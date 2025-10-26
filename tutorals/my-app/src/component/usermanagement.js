import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminlayout from './adminlayout';


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch users from the public API endpoint
      axios
        .get("http://localhost:8000/library/public/")
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    const handleUpdate = (userId) => {
      const user = users.find((u) => u.user_id === userId);
      if (!user) {
        alert("User not found!");
        return;
      }
    
      const updatedUsername = prompt("Enter new username:", user.username);
      const updatedEmail = prompt("Enter new email:", user.email);
      const updatedRole = prompt("Enter new role (USER, LIBRARIAN, ADMIN):", user.role);
    
      if (!updatedUsername || !updatedEmail || !updatedRole) {
        alert("All fields are required!");
        return;
      }
    
      const updatedUser = {
        username: updatedUsername,
        email: updatedEmail,
        role: updatedRole.toUpperCase(),
      };
    
      axios
        .put(`http://localhost:8000/library/users/${userId}/`, updatedUser)
        .then((response) => {
          alert("User updated successfully!");
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === userId ? { ...user, ...response.data } : user
            )
          );
        })
        .catch((err) => {
          alert(`Failed to update user: ${err.response?.data || err.message}`);
        });
    };
  
    const handleDelete = (userId) => {
        console.log("Delete user with ID:", userId);
      if (!userId) {
        alert("User ID is missing!");
        return;
      }
      if (window.confirm("Are you sure you want to delete this user?")) {
        axios
          .delete(`http://localhost:8000/library/users/${userId}/`)
          .then(() => {
            alert("User deleted successfully!");
            setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
          })
          .catch((err) => alert(`Failed to delete user: ${err.response.data}`));
      }
    };
  
    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <Adminlayout>
      <div className='grid place-items-center mb-4'>
      <div className='grid place-items-center w-full border-solid border-green-700 border-2 bg-lime-400'>
        <h1 className='text-2xl text-green-900 font-bold'>All Users</h1>
        <table className="user-table" border="1">
          <thead>
            <tr>
              <th className='px-10 py-2 text-left'>ID</th>
              <th className='px-10 py-2 text-left'>Username</th>
              <th className='px-10 py-2 text-left'>Email</th>
              <th className='px-10 py-2 text-left'>Role</th>
              <th className='px-10 py-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td className='px-10 py-2'>{user.user_id}</td>
                <td className='px-10 py-2'>{user.username}</td>
                <td className='px-10 py-2'>{user.email}</td>
                <td className='px-10 py-2'>{user.role}</td>
                <td>
                  <button className='bg-blue-800 text-white' onClick={() => handleUpdate(user.user_id)}>Update</button>
                  <button className='bg-red-800 text-white ml-3' onClick={() => handleDelete(user.user_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </Adminlayout>
    );
  };
  
  export default UserManagement;