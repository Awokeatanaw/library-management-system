import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by verifying access token
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login'); // Redirect to login if no token is found
            return;
        }

        // Fetch the user profile data from the backend
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/library/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Send the token in the header for authentication
                    },
                });

                setUserData(response.data); // Set the user data if request is successful
            } catch (error) {
                setError('Failed to fetch profile. Please try again.');
                console.error('Error fetching profile:', error);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData ? (
                <div>
                    <h2>your Information</h2>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    {/* Add any other user information here */}
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default Profile;