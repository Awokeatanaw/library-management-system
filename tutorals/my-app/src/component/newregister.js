import React, { useState } from 'react';
import axios from 'axios';
import Adminlayout from './adminlayout';

const Adduser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
        try {
            const response = await axios.post('http://localhost:8000/library/register/', {
                username,
                email,
                password,
                role,
            }, {
                headers: {
                    'X-CSRFToken': csrftoken,  // Include CSRF token
                },
                withCredentials: true,  // Ensure cookies are sent with the request
            });
            alert('User added successfully!');
            console.log('Registration successful:', response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error details:', error.response.data);
                alert(`Failed to add user: ${error.response.data}`);
            } else {
                console.error('Error registering user:', error.message);
                alert('Failed to add user.');
            }
        }
    };

    return (
        <Adminlayout>
        <div className='mb-14 border-2 w-full bg-teal-200 items-center'>
            <div className='ml-16 items-center mr-16'>
                <h2 className='text-3xl font-bold ml-16'>Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mt-7'>
                        <input className=' w-96 h-10 border-2' 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                    </div>
                    <div className='mt-7'>
                        <input className='w-96 border-2 h-10' 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className='mt-7'>
                        <input className='w-96 border-2 h-10' 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <div className='mt-7'>
                        <select className='w-96 border-2 h-10' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="USER">User</option>
                            <option value="LIBRARIAN">Librarian</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <div className='mt-7'>
                        <button className='ml-10 w-52 bg-teal-950 text-white h-10' type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
        </Adminlayout>
    );
};

export default Adduser;