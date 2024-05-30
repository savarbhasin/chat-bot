import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({setLoggedIn,loggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const data = await fetch('http://127.0.0.1:5000/login', {method:'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({username:email, password})});
            const response = await data.json();
            
            if(response.status == 'success'){
                setLoggedIn(response.username);
                navigate('/');
            }
            
            else{
                alert('Invalid credentials');
            }
        } catch(e){
            console.log(e);
        }
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
