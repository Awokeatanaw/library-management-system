import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../nav';

const NLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', { username, password, role }); // Log the submitted data
        try {
            const response = await axios.post('http://localhost:8000/library/login/', {
                username,
                password,
                role, // Include the selected role in the request
            }, { withCredentials: true });// Include cookies in the request
            // Assuming the token is received in response.data.access
            const token = response.data.access; 
            
            localStorage.setItem('token', token); // Store the token in localStorage
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            
            alert('login successfully!');
            console.log('Login successful:', response.data);
            console.log('Login successful, token stored:', token);
            console.log('Extracted token:', token);
            // Store user info in local storage
            //localStorage.setItem('user', JSON.stringify(user));

            // Redirect based on the role
            if (role === 'USER') {
                navigate('/user'); // Redirect to user page
            } else if (role === 'LIBRARIAN') {
                navigate('/librarian'); // Redirect to librarian page
            } else if (role === 'ADMIN') {
                navigate('/admin'); // Redirect to admin page
            }
            // Store token or user info as needed (e.g., in localStorage or context)
        } catch (error) {
            alert('login not successfully!');
            console.error('There was an error logging in!', error.response.data);
            setError('Invalid credentials. Please try again.'); // Set error message
        }
    };

    return (
        <div>
            <p className='ml-96 text-green-800 font-bold text-2xl'>our school library</p>
            {/*<Nav />*/}
        <div className='ml-96 w-96 border-2 border-slate-300 mt-28 mb-5 grid place-items-center justify-center'>
            <h1 className='text-2xl font-bold'>Login</h1>
        <div className='w-80 grid place-items-center'>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <div className='mt-5'>
                <input className='w-80 h-10 border-2' 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required // Make input required
                />
                </div>
                <div className='mt-5'>
                <input className='w-80 h-10 border-2' 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required // Make input required
                />
                </div>
                <div className='mt-5'>
                <select className='w-80 h-10 border-2' value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="USER">User</option>
                    <option value="LIBRARIAN">Librarian</option>
                    <option value="ADMIN">Admin</option>
                </select>
                </div>
                <div className='mt-5'>
                <button className='bg-blue-800 text-white ml-20 w-40 h-10' type="submit">Login</button>
                </div>
            </form>
            {role && <p>Selected role: {role}</p>} {/* Display the selected role */}
        </div>
        </div>
        </div>
    );
};

export default NLogin;