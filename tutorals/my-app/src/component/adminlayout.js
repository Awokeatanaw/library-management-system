import React from 'react';
import { Link } from 'react-router-dom';
import libraryImage from '../image/libraryimage1.jpg'; // Adjust the path as necessary
const Adminlayout = ({ children }) => {
    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${libraryImage})` }}>
            <div className="bg-teal-600 text-white w-full h-14 fixed flex items-center justify-between">
                
                    <div className='flex'>
                        <p className='font-bold ml-3'>LIBRARY</p>
                    
                    </div>
                    <ul className="flex">
                        <li className="ml-8 hover:bg-teal-900"><Link to="/admin">Home</Link></li>
                        <li className="ml-8 hover:bg-teal-900"><Link to="/newregister">Adduser</Link></li> 
                        <li className="ml-8 hover:bg-teal-900"><Link to="/usermanagement">Allusers</Link></li>
                        <li className="ml-8 mr-4 hover:bg-teal-900"><Link to="/profile">Profile</Link></li>
                        <li className="ml-8 mr-4 hover:bg-teal-900"><Link to="/logout">Logout</Link></li>
                    </ul>
                
            </div>
            <div className="grid place-items-center">
               <p className='mt-20'> {children}</p>
            </div>
        </div>
    );
};

export default Adminlayout;
