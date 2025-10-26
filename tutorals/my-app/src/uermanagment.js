import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'User' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/users/', newUser);
      setNewUser({ username: '', email: '', password: '', role: 'User' });
      fetchUsers();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', loginData);
      // Store the user data in the application state or local storage
      console.log('Logged in user:', response.data);
      setLoginData({ username: '', password: '' });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/users/${userId}/set_role/`, { role });
      fetchUsers();
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <h3>Register</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="User">User</option>
        <option value="Librarian">Librarian</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>

      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={loginData.username}
        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>

      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Librarian">Librarian</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>
                {/* Add any other user management actions here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;