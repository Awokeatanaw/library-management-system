import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                console.error('No refresh token found. Redirecting to login.');
                localStorage.clear(); // Clear local storage if no refresh token
                navigate('/');
                return;
            }

            try {
                // Make request to the backend to blacklist the refresh token
                const response = await axios.post('http://localhost:8000/library/logout/', { refresh_token: refreshToken });
                if (response.status === 200) {
                    console.log('Logout successful:', response.data);
                    alert('Logout successful!');
                    // Clear localStorage after a successful logout
                    localStorage.clear();
                    // Redirect to login page after successful logout
                    navigate('/');
                } else {
                    console.error('Unexpected response status:', response.status);
                    alert('Logout failed! Please try again.');
                }
            } catch (error) {
                console.error('Logout failed:', error.response?.data || error.message);
                alert('Logout failed! Please try again.');
            }
        };

        handleLogout();
    }, [navigate]);

    return null; // This component does not render anything, it just performs the logout action
};

export default Logout;