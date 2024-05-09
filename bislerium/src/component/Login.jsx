import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // If needed for notifications

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7279/api/Authentication/login', {
                username: username,
                password: password
            });
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            console.log('Login successful. Token:', token);
            if (response.data.isAdmin) {
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                navigate('/'); // Redirect regular user to home page
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p><Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link></p>
                    {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100" role="alert">{error}</div>}
                    <button type="submit" className="w-full bg-green-700 hover:bg-gray-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                        Login
                    </button>
                </form>
                <div className="mt-4 text-sm text-center">
                    <p>Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Signup</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;

