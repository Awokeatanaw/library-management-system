import React from 'react';
import { useNavigate } from 'react-router-dom';
import libraryImage from '../image/libraryimage1.jpg'; // Adjust the path as necessary
import { Link, Route, Router, Routes } from "react-router-dom";
import Userlayout from '../component/userlayout';
const UserPage = () => {
    
    return (
        
        <Userlayout>
            <div>
                <h1 className=" font-bold text-2xl bg-teal-200">Welcome to our labrary</h1>
            </div>
        </Userlayout>
        
    );
};

export default UserPage;

{/*const User = () => {
    const navigate = useNavigate();

    const handleProfileNavigation = () => {
        navigate('/profile');
    };

    return (
        <div className="grid place-items-center">
            <h1>Welcome to User Page</h1>
            <button onClick={handleProfileNavigation}>Go to Profile</button>
        </div>
    );
}
export default User;*/}