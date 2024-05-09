import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch('https://localhost:7279/api/Authentication/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered successfully!');
                navigate('/login'); // Redirect to login page
            } else {
                console.log('Error:', data.message);
                // Optionally display error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Optionally handle network or other errors
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="">
                    <div className="mb-4">
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-700 hover:bg-gray-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                        Sign up
                    </button>
                </form>
                <div className="mt-4 text-sm text-center">
                    <p>Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login Now</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
