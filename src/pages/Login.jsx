import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({setLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = ()=>{
        setLoggedIn(true);
        navigate('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                       
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
